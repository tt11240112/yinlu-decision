#!/usr/bin/env node
/**
 * setup-repo-guard.js —— 仓库三道锁一键配置
 *
 * 干什么：
 *   1. 把默认分支改成 v3（队友 clone 下来直接拿到新版）
 *   2. 给 v3 加保护：必须提 PR、必须有人审核、Code Owners 必须审
 *   3. 冻结 main：谁都改不了，当永久备份
 *   4. 拉协作者名单，用来填 CODEOWNERS
 *
 * 怎么用：
 *   node tools/setup-repo-guard.js --check     # 只看现状，什么都不改（先跑这个）
 *   node tools/setup-repo-guard.js             # 正式执行
 *
 * 前置条件：
 *   环境变量 GITHUB_TOKEN 必须是仓库管理员的 Personal Access Token（勾 repo 权限）
 *
 *   Windows Git Bash:
 *     export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
 *     node tools/setup-repo-guard.js --check
 *
 * 安全：
 *   token 只从环境变量读，不写进任何文件，日志里会打码。
 */

const http = require('http');
const https = require('https');
const tls = require('tls');

const OWNER = 'tt11240112';
const REPO = 'yinlu-decision';
const DEFAULT_BRANCH = 'v3';
const FREEZE_BRANCH = 'main';

const CHECK_ONLY = process.argv.includes('--check');

// ---------------------------------------------------------------- 网络层

// 候选路径：直连 → 常见代理端口
function buildEndpoints() {
  const list = [{ via: null }];
  if (process.env.https_proxy || process.env.HTTPS_PROXY) {
    list.push({ via: process.env.https_proxy || process.env.HTTPS_PROXY });
  }
  for (const p of ['7890', '7891', '10809', '20171', '1080']) {
    list.push({ via: `http://127.0.0.1:${p}` });
  }
  return list;
}

function requestViaProxy(proxyUrl, method, urlStr, headers, body) {
  return new Promise((resolve, reject) => {
    const proxy = new URL(proxyUrl);
    const target = new URL(urlStr);
    const connReq = http.request({
      host: proxy.hostname,
      port: proxy.port || 80,
      method: 'CONNECT',
      path: `${target.hostname}:443`,
      timeout: 12000,
    });
    connReq.on('connect', (res, socket) => {
      if (res.statusCode !== 200) {
        socket.destroy();
        return reject(new Error(`代理隧道失败(${res.statusCode})`));
      }
      const tlsSock = tls.connect({ socket, servername: target.hostname }, () => {
        const req = https.request(
          {
            createConnection: () => tlsSock,
            host: target.hostname,
            path: target.pathname + target.search,
            method,
            headers: { Host: target.hostname, ...headers },
            timeout: 20000,
          },
          resolve
        );
        req.on('error', reject);
        if (body) req.write(body);
        req.end();
      });
      tlsSock.on('error', reject);
    });
    connReq.on('timeout', () => connReq.destroy(new Error('连接代理超时')));
    connReq.on('error', reject);
    connReq.end();
  });
}

function requestDirect(method, urlStr, headers, body) {
  return new Promise((resolve, reject) => {
    const target = new URL(urlStr);
    const req = https.request(
      {
        host: target.hostname,
        path: target.pathname + target.search,
        method,
        headers,
        timeout: 15000,
      },
      resolve
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function readBody(res) {
  return new Promise((resolve) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (c) => (data += c));
    res.on('end', () => resolve(data));
  });
}

/** 自动尝试所有可用通道，返回第一个成功的响应 */
async function api(method, path, bodyObj) {
  const urlStr = `https://api.github.com${path}`;
  const body = bodyObj ? JSON.stringify(bodyObj) : null;
  const headers = {
    'User-Agent': 'yinlu-repo-guard',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${TOKEN}`,
  };
  if (body) {
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength(body);
  } else {
    headers['Content-Length'] = '0';
  }

  const errors = [];
  for (const ep of buildEndpoints()) {
    try {
      const res = ep.via
        ? await requestViaProxy(ep.via, method, urlStr, headers, body)
        : await requestDirect(method, urlStr, headers, body);
      const text = await readBody(res);
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (_) {
        /* 非 JSON 响应（如 204 空体） */
      }
      if (res.statusCode >= 400) {
        const msg = (json && json.message) || text.slice(0, 120);
        // 401/403/404 是服务端明确回复，说明路通了，不用再换通道
        if ([401, 403, 404, 422].includes(res.statusCode)) {
          return { status: res.statusCode, json, ok: false, msg, via: ep.via || '直连' };
        }
        errors.push(`${ep.via || '直连'}: HTTP ${res.statusCode} ${msg}`);
        continue;
      }
      return {
        status: res.statusCode,
        json,
        text,
        ok: true,
        via: ep.via || '直连',
        headers: res.headers,
      };
    } catch (e) {
      errors.push(`${ep.via || '直连'}: ${e.message}`);
    }
  }
  return { ok: false, msg: '所有通道均失败', detail: errors };
}

// ---------------------------------------------------------------- 主流程

const TOKEN = process.env.GITHUB_TOKEN || '';

function mask(t) {
  if (!t) return '(空)';
  return t.length > 8 ? `${t.slice(0, 4)}****${t.slice(-4)}` : '****';
}

async function main() {
  console.log('════════════════════════════════════════════');
  console.log('  引路仓库 · 三道锁一键配置');
  console.log(`  目标：${OWNER}/${REPO}`);
  console.log(`  模式：${CHECK_ONLY ? '🔍 只检查，不修改' : '🚀 正式执行'}`);
  console.log('════════════════════════════════════════════\n');

  if (!TOKEN) {
    console.log('❌ 缺少 GITHUB_TOKEN。\n');
    console.log('   请先执行（token 换成你自己的）：');
    console.log('     export GITHUB_TOKEN=ghp_xxxxxxxxxxxx\n');
    process.exit(1);
  }
  console.log(`🔑 Token: ${mask(TOKEN)}\n`);

  // Step 1 连通性与身份
  console.log('─── Step 1/6  确认能连上 GitHub 且 token 有效 ───');
  let r = await api('GET', '/user');
  if (!r.ok) {
    console.log(`❌ 失败：${r.msg}`);
    if (r.detail) r.detail.forEach((d) => console.log(`     ${d}`));
    console.log('\n常见原因：');
    console.log('  · token 没勾 repo 权限');
    console.log('  · token 已过期或被删掉了');
    console.log('  · 代理软件没开，且校园网又不通 GitHub');
    process.exit(1);
  }
  console.log(`✅ 通道：${r.via}`);
  console.log(`✅ 身份：${r.json.login}（账号名，不是昵称）`);

  // Step 2 仓库信息与权限
  console.log('\n─── Step 2/6  检查仓库和你的权限 ───');
  r = await api('GET', `/repos/${OWNER}/${REPO}`);
  if (!r.ok) {
    console.log(`❌ 读不到仓库：${r.msg}`);
    process.exit(1);
  }
  const repo = r.json;
  console.log(`   仓库：${repo.full_name}  ${repo.private ? '🔒 私有' : '🌐 公开'}`);
  console.log(`   当前默认分支：${repo.default_branch}`);
  const isAdmin = repo.permissions && repo.permissions.admin;
  console.log(`   你的权限：${isAdmin ? '✅ Admin（够用）' : '⚠️ 非管理员 —— 改默认分支和加保护规则会失败'}`);
  if (!isAdmin) {
    console.log('\n❌ 没有管理员权限，后面几步做不了。');
    console.log('   请确保 token 是仓库 Owner 本人生成的。');
    process.exit(1);
  }

  // Step 3 现有分支
  console.log('\n─── Step 3/6  现有分支 ───');
  r = await api('GET', `/repos/${OWNER}/${REPO}/branches`);
  const branches = r.ok ? r.json.map((b) => b.name) : [];
  branches.forEach((b) => console.log(`   · ${b}${b === repo.default_branch ? '  ← 当前默认' : ''}`));
  if (!branches.includes(DEFAULT_BRANCH)) {
    console.log(`\n❌ 远端没有 ${DEFAULT_BRANCH} 分支，先推送再来。`);
    process.exit(1);
  }

  // Step 4 协作者名单
  console.log('\n─── Step 4/6  协作者名单（用来填 CODEOWNERS）───');
  r = await api('GET', `/repos/${OWNER}/${REPO}/collaborators?per_page=100`);
  const collabs = [];
  if (r.ok) {
    r.json.forEach((c) => {
      collabs.push(c.login);
      console.log(`   · ${c.login}`);
    });
    if (collabs.length === 0) console.log('   （只有 Owner 一人，还没邀请队友）');
  } else {
    console.log(`   ⚠️ 拉不到名单：${r.msg}`);
    console.log('   影响：CODEOWNERS 得你自己去 Settings → Collaborators 抄用户名');
  }

  if (CHECK_ONLY) {
    console.log('\n════════════════════════════════════════════');
    console.log('  🔍 检查模式结束，以上一个字都没改。');
    console.log('  确认没问题后，去掉 --check 再跑一次。');
    console.log('════════════════════════════════════════════');
    return;
  }

  // Step 5 改默认分支
  console.log('\n─── Step 5/6  配置保护规则 ───');
  if (repo.default_branch === DEFAULT_BRANCH) {
    console.log(`   默认分支已经是 ${DEFAULT_BRANCH}，跳过`);
  } else {
    r = await api('PATCH', `/repos/${OWNER}/${REPO}`, { default_branch: DEFAULT_BRANCH });
    if (r.ok) {
      console.log(`   ✅ 默认分支  ${repo.default_branch} → ${DEFAULT_BRANCH}`);
    } else {
      console.log(`   ❌ 改默认分支失败：${r.msg}`);
    }
  }

  const guard = {
    required_status_checks: null, // ⚠️ 必须是 null：没配 CI，勾了全队卡死
    enforce_admins: false, // 管理员（队长）可绕过，留救火通道
    required_pull_request_reviews: {
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true, // ⭐ 最关键：让 CODEOWNERS 真正生效
      required_approving_review_count: 1,
    },
    restrictions: null,
    required_linear_history: false,
    allow_force_pushes: false,
    allow_deletions: false,
    block_creations: false,
    required_conversation_resolution: true,
  };

  r = await api('PUT', `/repos/${OWNER}/${REPO}/branches/${DEFAULT_BRANCH}/protection`, guard);
  if (r.ok) {
    console.log(`   ✅ ${DEFAULT_BRANCH} 已上锁：必须 PR + 1 人审核 + Code Owners 审核`);
  } else {
    console.log(`   ❌ ${DEFAULT_BRANCH} 保护失败：${r.msg}`);
    if (r.status === 403) {
      console.log('     公开仓库免费版应该够用；若是私有仓库需要付费套餐才支持分支保护。');
    }
  }

  if (branches.includes(FREEZE_BRANCH)) {
    const freeze = JSON.parse(JSON.stringify(guard));
    freeze.allow_deletions = false;
    r = await api('PUT', `/repos/${OWNER}/${REPO}/branches/${FREEZE_BRANCH}/protection`, freeze);
    if (r.ok) {
      console.log(`   ✅ ${FREEZE_BRANCH} 已冻结（旧版大文件保底，谁都改不了）`);
    } else {
      console.log(`   ⚠️ ${FREEZE_BRANCH} 冻结失败：${r.msg}`);
    }
  }

  // Step 6 验证
  console.log('\n─── Step 6/6  验证结果 ───');
  r = await api('GET', `/repos/${OWNER}/${REPO}`);
  if (r.ok) {
    console.log(`   默认分支现在是：${r.json.default_branch} ${r.json.default_branch === DEFAULT_BRANCH ? '✅' : '❌'}`);
  }
  for (const b of [DEFAULT_BRANCH, FREEZE_BRANCH]) {
    r = await api('GET', `/repos/${OWNER}/${REPO}/branches/${b}`);
    if (r.ok) {
      const p = r.json.protected;
      console.log(`   ${b}：保护${p ? '✅ 已开' : '❌ 未开'}`);
    }
  }

  console.log('\n════════════════════════════════════════════');
  console.log('  剩下的活（脚本做不了，得人来）：');
  console.log('   1. 填 .github/CODEOWNERS 里的 <USER_G*> 占位符');
  if (collabs.length) {
    console.log(`      可选用户名：${collabs.join('、')}`);
  }
  console.log('   2. 提醒队友：已进仓库的人要把邀请邮件点掉');
  console.log('   3. 每人走一次「练手 PR」，验证权限真的通了');
  console.log('════════════════════════════════════════════');
}

main().catch((e) => {
  console.error('\n💥 脚本崩了：', e.message);
  process.exit(1);
});
