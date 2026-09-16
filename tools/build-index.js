/**
 * 生成新版 index.html
 * 把旧版的单个 <script src="./app.js"> 换成拆分后的 25 个 <script src="./js/xx.js">
 *
 * 用法： node tools/build-index.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 模板优先级：v3 自己的 template/（推荐） > 旧备份目录（兼容首次迁移）
const LOCAL_TPL = path.join(ROOT, 'template', 'index.html');
const LEGACY_TPL = path.resolve(ROOT, '..', 'yinlu-merged-mvp-2026-08-15', 'index.html');
const SRC_HTML = fs.existsSync(LOCAL_TPL) ? LOCAL_TPL : LEGACY_TPL;
const OUT_HTML = path.join(ROOT, 'index.html');

console.log('[模板] ' + path.relative(ROOT, SRC_HTML));

let html = fs.readFileSync(SRC_HTML, 'utf8');

/**
 * 【重要】统一换行符为 LF
 *
 * Windows 上 Git 默认 core.autocrlf=true：签出时把 LF 转成 CRLF。
 * 下面所有正则都是以 \n 结尾匹配的，一旦文件是 CRLF 就会全部失配 ——
 * 后果是 CSS 一个都没引进去、多余的 favicon 没删掉，页面直接花掉。
 * 所以读取后先归一化；写入时也统一用 LF，保证结果可复现。
 */
html = html.replace(/\r\n/g, '\n');

// 列出 js/ 下的所有切分文件，按文件名排序
const jsFiles = fs
  .readdirSync(path.join(ROOT, 'js'))
  .filter((f) => /^\d\d-.*\.js$/.test(f))
  .sort();

const tags = jsFiles
  .map((f) => `    <script src="./js/${f}" defer></script>`)
  .join('\n');

// CSS：按文件名顺序引入拆分后的样式文件
const cssFiles = fs.existsSync(path.join(ROOT, 'css'))
  ? fs.readdirSync(path.join(ROOT, 'css')).filter((f) => /^\d\d-.*\.css$/.test(f)).sort()
  : [];
const cssTags = cssFiles.map((f) => `    <link rel="stylesheet" href="./css/${f}">`).join('\n');

// 替换 app.js 引用
const appTagRe = /[ \t]*<script[^>]*src=["'][^"']*app\.js[^"']*["'][^>]*>\s*<\/script>/gi;
if (!appTagRe.test(html)) {
  console.error('在 index.html 里没找到 app.js 引用，请检查');
  process.exit(1);
}
html = html.replace(appTagRe, () => `    <!-- ↓ 拆分后的 25 个模块，按顺序加载（顺序不能乱） -->\n${tags}`);

// 把单个 styles.css 换成拆分后的 css 文件
if (cssTags) {
  const cssRe = /[ \t]*<link[^>]*rel=["']?stylesheet["']?[^>]*>\r?\n/gi;
  html = html.replace(
    cssRe,
    () => `    <!-- ↓ 拆分后的 ${cssFiles.length} 个样式文件，按顺序加载（顺序不能乱） -->\n${cssTags}\n`
  );
}

// 移除不存在的 favicon png 引用（旧版遗留的 404）
html = html.replace(/[ \t]*<link[^>]*favicon-(32|180)\.png[^>]*>\r?\n/gi, '');

fs.writeFileSync(OUT_HTML, html, 'utf8');

console.log('[OK] 已生成：' + OUT_HTML);
console.log('     引入模块数：' + jsFiles.length);
console.log('     剩余外部资源：');
const refs = html.match(/(?:src|href)="\.\/[^"]+"/g) || [];
[...new Set(refs)].forEach((r) => console.log('       - ' + r));
