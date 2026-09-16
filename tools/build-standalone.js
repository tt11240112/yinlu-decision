/**
 * 打包成「双击就能打开」的单文件 HTML
 *
 * 把 index.html + styles.css + lib/lucide-lite.js + js/*.js(26个) 全部内联进一个 HTML。
 * 产物可以：双击打开 / 微信发给别人 / 拷进 U 盘 / 直接传 GitHub Pages。
 *
 * 用法： node tools/build-standalone.js
 * 产物： ../引路网站_单文件版.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(ROOT, '..', '引路网站_单文件版.html');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const lucide = fs.readFileSync(path.join(ROOT, 'lib', 'lucide-lite.js'), 'utf8');

// 合并拆分后的 CSS（按文件名顺序）
const cssFiles = fs
  .readdirSync(path.join(ROOT, 'css'))
  .filter((f) => /^\d\d-.*\.css$/.test(f))
  .sort();
const css = cssFiles
  .map((f) => `/* ===== ${f} ===== */\n` + fs.readFileSync(path.join(ROOT, 'css', f), 'utf8'))
  .join('\n');

// 按文件名顺序读取所有模块（顺序 = 执行顺序，不能乱）
const jsFiles = fs
  .readdirSync(path.join(ROOT, 'js'))
  .filter((f) => /^\d\d-.*\.js$/.test(f))
  .sort();

const appjs = jsFiles
  .map((f) => `/* ===== ${f} ===== */\n` + fs.readFileSync(path.join(ROOT, 'js', f), 'utf8'))
  .join('\n');

let out = html;

// 1) 内联 CSS（替换整段拆分后的 link 标签）
const cssTagRe = /(?:[ \t]*<link[^>]*rel=["']?stylesheet["']?[^>]*>\s*)+/gi;
if (!cssTagRe.test(out)) {
  console.error('没找到 css 的 link 标签');
  process.exit(1);
}
// 注意：必须用函数形式的 replace。
// 字符串形式里 $$ 会被当成"字面量 $"的特殊变量，把源码中的 $$ 吞成一个 $，导致语法错误。
out = out.replace(cssTagRe, () => `<style>\n${css}\n</style>\n`);

// 2) 内联 lucide
out = out.replace(
  /<script[^>]*src=["'][^"']*lucide-lite\.js[^"']*["'][^>]*>\s*<\/script>/gi,
  () => `<script>\n${lucide}\n</script>`
);

// 3) 内联 26 个模块（替换整段 script 标签）
const moduleTagRe =
  /(?:[ \t]*<script[^>]*src=["']\.\/js\/[^"']+["'][^>]*>\s*<\/script>\s*)+/gi;
if (!moduleTagRe.test(out)) {
  console.error('没找到 js 模块的 script 标签，请确认 index.html 是由 tools/build-index.js 生成的');
  process.exit(1);
}
out = out.replace(moduleTagRe, '');
out = out.replace('</body>', () => `<script>\n${appjs}\n</script>\n</body>`);

// 4) 把引用的 .svg 图片转成 base64 内联（否则双击打开时图标会 404）
const svgRefs = [...out.matchAll(/(src|href)="(\.\/[^"?]+\.svg)(?:\?[^"]*)?"/gi)];
let inlined = 0;
for (const m of svgRefs) {
  const rel = m[2].replace(/^\.\//, '');
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  const b64 = fs.readFileSync(file).toString('base64');
  out = out.split(m[0]).join(`${m[1]}="data:image/svg+xml;base64,${b64}"`);
  inlined++;
}

// 5) 去掉 favicon 的 link（已内联或不需要）
out = out.replace(/[ \t]*<link[^>]*favicon[^>]*>\n/gi, '');

out = out.replace(
  '<head>',
  `<head>\n<!-- 单文件版：由 tools/build-standalone.js 自动生成，所有 CSS/JS 已内联，双击即可打开 -->\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
);

fs.writeFileSync(OUT, out, 'utf8');

const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(1);
console.log('[OK] 单文件版已生成：' + OUT);
console.log('     大小：' + kb + ' KB');
console.log('     内联模块：' + jsFiles.length + ' 个');
// 统计真实的外部文件引用（排除 data: 内联 URI）
const allRefs = [...out.matchAll(/<(script|link)[^>]*\s(?:src|href)="([^"]*)"/gi)];
const external = allRefs.filter((m) => !m[2].startsWith('data:'));
console.log(
  '     剩余外部引用：' +
    external.length +
    ' 处（应为 0；另有 ' +
    (allRefs.length - external.length) +
    ' 处 data: 内联 URI，属正常）'
);
if (external.length > 0) {
  console.log('     ⚠️ 以下文件未内联，双击打开会 404：');
  external.forEach((m) => console.log('        - ' + m[2]));
}
