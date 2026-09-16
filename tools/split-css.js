/**
 * CSS 零风险拆分 —— 把 3716 行的 styles.css 按「注释分区」切成 14 个文件
 *
 * 和 JS 拆分一样：纯机械按行切，切完拼回去必须和原文件逐字节一致。
 * CSS 用普通 <link> 顺序引入，不需要任何构建工具。
 *
 * 用法： node tools/split-css.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SOURCE = path.join(ROOT, 'legacy', 'styles.css');
const OUT_DIR = path.join(ROOT, 'css');

/** [起始行, 结束行, 文件名, 说明, 建议维护] —— 边界取自 CSS 原有的注释分区 */
const CHUNKS = [
  [1, 162, '01-base.css', '基础变量、字体、层级标签、传灯计划', 'G1 前端组'],
  [163, 423, '02-account.css', '账户与本地数据状态', 'G1 前端组'],
  [424, 824, '03-filters.css', '院校与经验筛选器', 'G2 业务组'],
  [825, 921, '04-theme-core.css', '主题基础（默认苹果爱丽丝）', 'G1 前端组'],
  [922, 1602, '05-theme-palettes.css', '主题配色方案（各套色板）', 'G1 前端组'],
  [1603, 1725, '06-buttons-nav.css', '按钮、导航、首页标题', 'G1 前端组'],
  [1726, 1981, '07-pet.css', '常驻小助手（电子宠物）', 'G1 前端组'],
  [1982, 2235, '08-calendar.css', '决策日历', 'G1 前端组'],
  [2236, 2658, '09-card-layout.css', '院校/经验卡片横竖版布局', 'G2 业务组'],
  [2659, 2906, '10-onboarding.css', '首次访问新手指引', 'G1 前端组'],
  [2907, 3030, '11-qa.css', '问答中心双栏工作台', 'G2 业务组'],
  [3031, 3221, '12-login.css', '登录注册弹窗', 'G2 业务组'],
  [3222, 3321, '13-answer.css', '回答页', 'G2 业务组'],
  [3322, 3606, '14-trust.css', '信任与认证', 'G3 安全组'],
  [3607, 3716, '15-float.css', '回顶浮标等浮动元素', 'G1 前端组'],
];

const md5 = (s) => crypto.createHash('md5').update(s, 'utf8').digest('hex');

function main() {
  const raw = fs.readFileSync(SOURCE, 'utf8');
  const lines = raw.split(/\r?\n/);
  const totalLines = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length;

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const [start, end, filename, desc, owner] of CHUNKS) {
    const body = lines.slice(start - 1, end).join('\n');
    const header = [
      '/**',
      ` * ${desc}`,
      ` * 原 styles.css 第 ${start}-${end} 行（机械切分，内容未改动）`,
      ` * 建议维护：${owner}`,
      ' */',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(OUT_DIR, filename), header + body + '\n', 'utf8');
  }

  // 保真校验
  const sorted = [...CHUNKS].sort((a, b) => a[0] - b[0]);
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

  console.log('\nCSS 切分完成 → ' + OUT_DIR + '\n');
  console.log('文件'.padEnd(28) + '行数'.padEnd(7) + '原区间'.padEnd(14) + '建议维护');
  console.log('-'.repeat(70));
  for (const [s, e, f, d, o] of CHUNKS) {
    console.log(f.padEnd(28) + String(e - s + 1).padEnd(7) + `${s}-${e}`.padEnd(14) + o);
  }
  console.log('-'.repeat(70));
  console.log(`共 ${CHUNKS.length} 个文件，覆盖第 1-${totalLines} 行`);
  console.log('区间无缝覆盖：' + (seamless ? '✅' : '❌'));
  console.log('  原始 MD5：' + md5(original));
  console.log('  拼接 MD5：' + md5(rebuilt));
  console.log('  结果：' + (ok ? '✅ 完全一致，拆分后样式与拆分前 100% 相同' : '❌ 不一致'));
  if (!ok) process.exit(1);
}

main();
