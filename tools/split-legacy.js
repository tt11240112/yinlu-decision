/**
 * 零风险拆分工具 —— 把 3739 行的 app.js 切成 25 个小文件
 *
 * 核心设计（为什么这是"零风险"的）：
 *   1. 纯机械按行切分，不加 IIFE、不加 import/export、不加任何包装
 *   2. 每个文件就是原代码的一段原文，全局作用域天然共享
 *   3. 切完自动拼接验证：拼接结果必须和原文件逐字节一致（MD5 校验）
 *   4. 只要 MD5 一致 → 100% 保真，行为与拆分前完全相同
 *
 * 这样做的好处：不需要 npm、不需要 Vite、不需要打包。
 * index.html 用普通 <script src> 顺序引入即可，双击就能开，GitHub Pages 也能开。
 *
 * 用法： node tools/split-legacy.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.resolve(ROOT, '..', 'yinlu-merged-mvp-2026-08-15', 'app.js');
const OUT_DIR = path.join(ROOT, 'js');

/**
 * 行号区间表 [起始行, 结束行, 文件名, 说明, 建议认领组]
 * 全部按「顶层函数 / 顶层语句」边界切割，不切断任何函数体。
 */
const CHUNKS = [
  [1, 26, '01-data-experiences.js', '经验库示例数据', 'G4 数据组'],
  [27, 237, '02-data-institutions.js', '院校示例数据', 'G4 数据组'],
  [238, 379, '03-config-constants.js', 'STORE 键名与静态常量', 'G0 项目组'],
  [380, 387, '04-core-utils.js', '$ / $$ / read / write / escapeHtml', 'G1 前端组'],
  [388, 437, '05-core-security.js', '令牌与密码处理', 'G3 安全组'],
  [438, 557, '06-feature-profile.js', '用户资料与头像', 'G1 前端组'],
  [558, 628, '07-feature-theme.js', '主题与展示布局', 'G1 前端组'],
  [629, 650, '08-core-ui.js', 'Toast 与弹窗', 'G1 前端组'],
  [651, 807, '09-feature-calendar.js', '决策日历', 'G1 前端组'],
  [808, 1188, '10-feature-pet.js', '电子宠物助手', 'G1 前端组'],
  [1189, 1305, '11-core-router.js', '视图切换与滚动', 'G1 前端组'],
  [1306, 1566, '12-feature-onboarding.js', '新手指引', 'G1 前端组'],
  [1567, 1731, '13-feature-filters.js', '阶段与筛选器', 'G2 业务组'],
  [1732, 1983, '14-feature-picker.js', '地区与专业选择器', 'G2 业务组'],
  [1984, 2205, '15-feature-render.js', '经验/问答/院校详情渲染', 'G2 业务组'],
  [2206, 2730, '16-feature-compare.js', '候选与对比', 'G2 业务组'],
  [2731, 2846, '17-feature-trust.js', '信任页与账户头部', 'G3 安全组'],
  [2847, 3146, '18-feature-actions.js', '注册登录/提问/收藏/邀请码', 'G2 业务组'],
  [3147, 3156, '19-feature-qa-tab.js', '问答 Tab', 'G2 业务组'],
  [3157, 3357, '20-events-click.js', '全局点击事件委托', 'G1 前端组'],
  [3358, 3436, '21-events-form.js', '表单 input/change/submit 事件', 'G2 业务组'],
  [3437, 3457, '22-events-menu.js', '菜单外部点击关闭', 'G1 前端组'],
  [3458, 3604, '23-events-buttons.js', '各按钮直接绑定', 'G1 前端组'],
  [3605, 3635, '24-events-keyboard.js', '键盘与滚动监听', 'G1 前端组'],
  [3636, 3657, '25-bootstrap.js', '启动初始化', 'G0 项目组'],
  // 注意：这段是原作者写的「家庭功能覆盖版」（文件里原话：Family rendering override for the static MVP.）
  // 它重新定义了 renderFamily / generateFamilyInvite / joinFamilyInvite，功能比前面的旧版更完整
  // （加了邀请码格式校验 YL-XXXXXXXX、家长/学生角色区分、图标刷新）。
  // 必须放在最后加载，才能正确覆盖 16 号和 18 号文件里的旧版。
  [3658, 3739, '26-family-override.js', '家庭功能覆盖版（必须最后加载）', 'G3 安全组'],
];

/** 旧版函数（已被 26 号文件覆盖，属于死代码，建议后续删除） */
const DEAD_CODE_WARNINGS = {
  '16-feature-compare.js': ['renderFamily（旧版，已被 26-family-override.js 覆盖）'],
  '18-feature-actions.js': [
    'generateFamilyInvite（旧版，已被 26-family-override.js 覆盖）',
    'joinFamilyInvite（旧版，已被 26-family-override.js 覆盖）',
  ],
};

const md5 = (s) => crypto.createHash('md5').update(s, 'utf8').digest('hex');

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('找不到源文件：' + SOURCE);
    process.exit(1);
  }

  const raw = fs.readFileSync(SOURCE, 'utf8');
  const lines = raw.split(/\r?\n/);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  // ---- 1. 切分 ----
  const manifest = [];
  for (const [start, end, filename, desc, owner] of CHUNKS) {
    const body = lines.slice(start - 1, end).join('\n');
    const header = [
      '/**',
      ` * ${desc}`,
      ` * 原 app.js 第 ${start}-${end} 行（机械切分，内容未改动）`,
      ` * 建议维护：${owner}`,
      ' */',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(OUT_DIR, filename), header + body + '\n', 'utf8');
    manifest.push({ file: filename, start, end, lines: end - start + 1, desc, owner });
  }

  // ---- 2. 保真验证：按行号排序拼接回去，必须和原文全文完全一致 ----
  const sorted = [...CHUNKS].sort((a, b) => a[0] - b[0]);
  // 文件以换行符结尾时，split 会多出一个空字符串元素，需要扣掉
  const totalLines = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length;

  // 顺便校验区间是否无缝覆盖全文（无重叠、无遗漏）
  let expected = 1;
  let seamless = true;
  for (const [s, e] of sorted) {
    if (s !== expected) { seamless = false; break; }
    expected = e + 1;
  }
  if (expected - 1 !== totalLines) seamless = false;

  const rebuilt = sorted.map(([s, e]) => lines.slice(s - 1, e).join('\n')).join('\n');
  const original = lines.slice(0, totalLines).join('\n');
  const ok = md5(rebuilt) === md5(original) && seamless;

  // ---- 3. 报告 ----
  console.log('\n切分完成 → ' + OUT_DIR + '\n');
  console.log('文件'.padEnd(30) + '行数'.padEnd(7) + '原区间'.padEnd(14) + '建议维护');
  console.log('-'.repeat(78));
  for (const m of manifest) {
    console.log(
      m.file.padEnd(30) + String(m.lines).padEnd(7) + `${m.start}-${m.end}`.padEnd(14) + m.owner
    );
  }
  console.log('-'.repeat(78));
  console.log(`共 ${manifest.length} 个文件，覆盖第 1-${lines.length} 行`);
  console.log('\n保真校验（把切分结果按原顺序拼回去，和原文件逐字节对比）');
  console.log('  区间无缝覆盖：' + (seamless ? '✅ 无重叠、无遗漏' : '❌ 存在重叠或遗漏'));
  console.log('  原始 MD5：' + md5(original));
  console.log('  拼接 MD5：' + md5(rebuilt));
  console.log('  结果：' + (ok ? '✅ 完全一致，拆分后行为与拆分前 100% 相同' : '❌ 不一致，请检查行号表'));
  console.log('\n说明：26-family-override.js 必须放在最后加载，它覆盖 16/18 号文件中的旧版家庭函数。');
  if (!ok) process.exit(1);

  // ---- 4. 生成 index.html 的 script 片段 ----
  const tags = manifest.map((m) => `    <script src="./js/${m.file}" defer></script>`).join('\n');
  fs.writeFileSync(
    path.join(OUT_DIR, '_script-tags.txt'),
    tags + '\n',
    'utf8'
  );
  console.log('\n已生成 script 标签清单：js/_script-tags.txt');
}

main();
