# 引路 · API 接口清单（纸上设计）

编写：P9
日期：2026-10-02
状态：设计稿，本次不写后端代码
存放：`docs/API设计.md`，或随《数据库设计说明书》一起放 `docs/数据库设计/`
约定：所有接口前缀为 `/api`，请求与响应都是 JSON（`Content-Type: application/json`）

---

## 一、通用约定

| 项 | 约定 |
|---|---|
| 编码 | UTF-8 |
| 鉴权 | `Authorization: Bearer <token>`，登录后签发；第一阶段只读接口可以免鉴权 |
| 分页 | 请求 `?page=1&pageSize=20`，响应含 `{ page, pageSize, total, items }` |
| 时间格式 | ISO 8601，如 `2026-10-02T10:00:00+08:00` |
| 错误格式 | `{ "error": { "code": "NOT_FOUND", "message": "院校不存在" } }` |
| 状态码 | 200 成功 / 201 已创建 / 400 参数错 / 401 未登录 / 403 无权限 / 404 不存在 / 409 冲突 / 500 服务端错误 |
| 绝不返回 | `password_hash`、`password_salt`、真实姓名、学号 |

### 1.1 认证流程

整体上采用无状态签名令牌（HMAC-SHA256），服务端不保存 session。这样选主要是部署简单，SQLite 单文件就够，不需要 Redis，实现量也小，二十行左右，后续维护和讲解都方便。

注册与登录，取得令牌：

```
POST /api/auth/register   { email, password, nickname }        → 201 { token, user }
POST /api/auth/login      { email, password }                  → 200 { token, user }
```

令牌结构：

```
<base64url(payload)>.<base64url(HMAC-SHA256(payload, 服务端密钥))>
payload = { "uid": 1, "role": "student", "exp": 1790000000 }
```

payload 里只放 `uid` 和 `role`，不放邮箱和昵称，因为令牌有可能被前端 Console 打印出来，不该夹带隐私。`exp` 是过期时间（Unix 秒），默认 7 天。密钥来自环境变量 `YINLU_SECRET`，未设置时进程启动时随机生成，重启后旧令牌全部失效，只适合本地演示，生产必须固定。

令牌的传递方式是 `Authorization: Bearer <token>`。服务端校验分四步，每一步都不能省：

| 步骤 | 做法 | 不做会怎样 |
|---|---|---|
| 1. 取 token | 从 `Authorization` 头里取 `Bearer ` 之后的部分 | 无令牌直接 401 |
| 2. 验签名 | 用同一密钥重算 HMAC，并用 `timingSafeEqual` 定长时间比较 | 攻击者可以伪造任意 `uid` |
| 3. 验过期 | 比较 `exp` 与当前时间 | 令牌永久有效 |
| 4. 查用户 | `SELECT ... WHERE id=? AND status='active'` | 账号被停用后令牌仍然可用 |

哪些接口需要令牌：

| 类别 | 接口 | 是否需登录 |
|---|---|---|
| 只读公开 | `/api/health`、院校、录取、经验、问答列表、信息源 | 不需要，第一阶段只读免鉴权 |
| 需登录（读自己的） | `/api/me`、`/api/favorites` | 需要 |
| 需登录（写） | 发布经验、提问、回答、采纳、增删收藏、改资料 | 需要 |
| 需本人身份 | 采纳答案（仅提问者）、删收藏（仅本人） | 需要，并且要做归属校验，不只是登录态 |

关于登出与令牌吊销：无状态令牌无法在服务端主动吊销，`POST /api/auth/logout` 只返回 `{ok:true}`，由客户端删除本地令牌。如果将来需要"强制下线"，例如改密码后让旧令牌失效，可以再加令牌黑名单表，或者加一个用户级的 `token_version` 字段，签发时把它写进 payload，校验时和用户表当前值比对，不一致就拒绝。这是已知的扩展点，本期不实现。

账号安全策略：

| 项 | 做法 |
|---|---|
| 密码存储 | scrypt(N=16384) 加每用户 16 字节随机盐，格式 `scrypt$N$r$p$salt$hash` |
| 口令明文 | 不落库、不回传、不写日志 |
| 账号枚举 | 登录失败时"密码错"和"账号不存在"返回完全相同的 401 响应 |
| 密码强度 | 最少 8 位，服务端校验，前端也同步提示 |
| 时序攻击 | 哈希比对用 `timingSafeEqual` 定长时间比较 |

### 1.2 错误码清单

统一响应体为 `{ "error": { "code": "...", "message": "给人看的中文说明" } }`。`message` 可能随版本调整，`code` 保持稳定，前端判断逻辑只依赖 `code`。

| HTTP | code | 何时出现 | 前端建议动作 |
|---|---|---|---|
| 400 | `VALIDATION_ERROR` | 参数缺失、格式错或超范围，如 `myRank=abc`、邮箱格式错、密码不足 8 位、请求体不是合法 JSON | 就地提示，标红对应输入框 |
| 401 | `UNAUTHORIZED` | 未带 token、token 过期、签名不合法 | 清本地 token，跳登录 |
| 401 | `INVALID_CREDENTIALS` | 登录时邮箱或密码不正确，故意不区分二者 | 统一提示"邮箱或密码不正确" |
| 403 | `FORBIDDEN` | 已登录但无权限，如删他人收藏、非提问者采纳答案、账号被停用 | 提示无权限，不跳登录 |
| 404 | `NOT_FOUND` | 路径不存在，或资源不存在，如院校、经验、问题的 id 查不到 | 显示"内容不存在"并可返回列表 |
| 405 | `METHOD_NOT_ALLOWED` | 路径存在但方法不对，如 `DELETE /api/institutions` | 开发期错误，正常不应出现 |
| 409 | `CONFLICT` | 唯一性冲突，如重复注册邮箱、重复收藏同一院校或专业 | 提示"已存在"，并把已存在的那条高亮 |
| 413 | `PAYLOAD_TOO_LARGE` | 请求体超过 256 KB | 提示内容过长 |
| 500 | `INTERNAL` | 服务端未捕获异常，不返回堆栈 | 提示稍后重试，同时上报 |

按业务场景速查：

| 用户做什么 | 预期错误 |
|---|---|
| 用已注册邮箱注册 | 409 `CONFLICT` |
| 用错密码登录 | 401 `INVALID_CREDENTIALS` |
| 未登录就收藏 | 401 `UNAUTHORIZED` |
| 收藏一所不存在的院校 | 400 `VALIDATION_ERROR`（"院校不存在：xxx"） |
| 重复收藏同一院校 | 409 `CONFLICT` |
| 删别人的收藏 | 403 `FORBIDDEN` |
| 采纳别人问题下的答案（自己不是提问者） | 403 `FORBIDDEN` |
| 查不存在的院校 id | 404 `NOT_FOUND` |
| 位次传成 `abc` | 400 `VALIDATION_ERROR` |

---

## 二、接口清单（共 31 个）

### 2.1 健康检查

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/health` | 健康检查 | 无 | `{ "ok": true, "version": "v1", "db": "sqlite" }` |

### 2.2 院校（只读，第一阶段优先做）

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/institutions` | 院校列表 | `province`, `city`, `level`, `keyword`, `page`, `pageSize` | 院校数组（分页） |
| GET | `/api/institutions/:id` | 院校详情 | `id` | 院校对象，含 majorPrograms 等明细 |
| GET | `/api/institutions/:id/majors` | 该校专业列表 | `id` | 专业数组 |
| GET | `/api/institutions/filters` | 筛选器可选值 | 无 | `{ provinces: [...], levels: [...] }` |
| GET | `/api/institutions/compare` | 多校对比 | `ids=fjnu,fzu,fafu`（不超过 4 个） | 对比数组 |

### 2.3 录取数据（本项目的主要数据接口）

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/admission` | 录取位次查询（兼容别名） | `province`（必填）, `year`, `schoolId`, `subjectType`, `batch`, `majorGroup` | 录取记录数组 |
| GET | `/api/admissions` | 录取数据查询（推荐路径，复数形式） | `schoolId`（必填）, `year`, `province`, `subjectType`, `batch`, `majorGroup`, `majorName`, `maxPerGroup`, `lineOnly` | 录取记录数组 |
| GET | `/api/admissions/summary` | 分专业组汇总（一校一行加每组各一行） | `schoolId`（必填）, `province`, `subjectType`, `year` | `{ overall, groups[], groupCount }` |
| GET | `/api/admissions/trend` | 某校历年趋势（逐年一行，分值与位次同源） | `schoolId`, `province`, `subjectType` | `[{ year, minScore, minRank, majorGroup, groupCount }]` |
| GET | `/api/admissions/estimate` | 位次匹配"冲稳保"（一校一行，多专业组已去重） | `province`, `subjectType`, `myRank`（正整数）, `rushRatio` | `{ rush[], stable[], safe[], thresholds, disclaimer }` |
| POST | `/api/admissions` | 单条录入（需令牌）。手机上补一条录取记录，服务端立即校验 | 请求体见 2.3.1；`schoolId`、`year`、`province`、`subjectType`、`batch`、`sourceName` 必填，`minScore` 与 `minRank` 至少填一个 | `201 { id, ok }`；重复 `409 CONFLICT`；格式错 `400 VALIDATION_ERROR` |
| POST | `/api/admissions/bulk` | 批量录入（需令牌）。一次贴多行，逐行返回成、败和原因 | 请求体为数组或 `{ rows: [...] }`，一次最多 500 行 | `{ total, inserted, duplicate, rejected, results[] }` |
| GET | `/api/admissions/fields` | 录入字段说明（只读，不需令牌）。手机端照着填，不必回翻文档 | 无 | `{ fields[], schools[], enums, limits }` |

#### 2.3.1 数据录入接口（为手机上补数据设计）

数据文件有 20 多 KB，在手机上改 JS 文件不现实。这三个接口的作用是不用改代码、不用走 Git，直接用手机浏览器往库里补录取记录，并且当场知道哪一项不合格，而不是等提交 PR 之后才发现格式问题。

手机上的典型流程是：第一步打开 `GET /api/admissions/fields`，照着返回的字段说明准备数据，每项都带中文名和填写提示；第二步调 `POST /api/auth/login` 拿令牌，录入需要登录，避免任何人写库；第三步一条一条发，或攒成一批发 `POST /api/admissions/bulk`，请求体如下：

```json
{ "rows": [
  { "schoolId": "fafu", "year": 2024, "province": "福建", "subjectType": "物理类",
    "batch": "本科批", "minScore": 521, "minRank": 46000, "planCount": 2000,
    "sourceName": "福建省教育考试院", "sourceUrl": "https://www.eeafj.cn/" }
] }
```

第四步看逐行结果，`inserted` 是写入，`duplicate` 是已存在未重复写，`rejected` 会附上具体原因。

设计上考虑了这几点：

| 要点 | 说明 |
|---|---|
| 逐行校验 | 任一行不合格只拒该行，其余照常写入；错误信息逐行返回，指明是哪个字段、错在哪 |
| 院校必须已存在 | `schoolId` 不在 `institutions` 表内会拒收并提示"请先在院校表里建立该院校"，避免产生挂空的外键 |
| 重复靠唯一约束识别 | 复用 `idx_adm_unique`，`COALESCE` 归一化后 NULL 也算一个值，重复行返回 `duplicate` 而不是报错 |
| 一次最多 500 行 | 超过返回 `413 PAYLOAD_TOO_LARGE`，防止手机上一次贴过多把库写坏 |
| 与 CHECK 约束一致 | 校验规则与数据库设计的 CHECK 约束一致（年份 2000-2100、分数 0-750、位次为正整数），文档与设计不会两套标准 |
| 不替代批量导入 | 数据量上百条时仍应用 `tools/` 下的导入脚本，接口是给"临时补几条"用的 |

#### 2.3.2 majorGroup 参数的语义（用错会把一个学校显示成多个）

录取表按专业组细分存储，因此同一院校、同年、同省、同科类、同批次可能存在多行，例如 `999组` 与 `500组` 各一条。查询时必须明确要哪个粒度：

| `majorGroup` 取值 | 含义 | 适用场景 |
|---|---|---|
| 不传（默认） | 只看 `major_group IS NULL` 的行，即院校级口径 | 列表页"院校最低线"，默认就该用这个 |
| 具体组名，如 `999组` | 只看该专业组 | 详情页展示"这个组招多少分" |
| `*` | 所有专业组（含未分组的）都返回 | 需要按组逐条展示时；前端要自己按组区分，不能直接铺开当多所学校 |

两个附加参数：

| 附加参数 | 作用 |
|---|---|
| `maxPerGroup=1` | 每个专业组只保留位次最优的一行（窗口函数），避免一组多行 |
| `lineOnly=1` | 与 `maxPerGroup` 配合，进一步限定只保留组线。不加它时，如果某条具体专业线的位次优于组线，会把组线挤掉 |

`/api/admissions/summary` 是给"院校最低线"场景准备的快捷接口，它直接返回 `overall`（该校该维度所有专业组中位次最优的一条，一校一行）和 `groups`（每个专业组各自的最优线，含 `groupLabel`）。前端展示"院校最低线"请用 `overall`，不要把 `groups` 直接铺开当多所学校。

关于 `estimate` 接口，它只做位次区间匹配，不做录取概率预测。目前数据量不足以支撑概率模型，对外表述不要写成"预测录取概率"。

### 2.4 经验分享

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/experiences` | 经验列表 | `schoolId`, `major`, `source`, `tag`, `page` | 经验数组（含 `source`/`sourceName`/`sourceUrl` 溯源字段） |
| GET | `/api/experiences/:id` | 经验详情 | `id` | 经验对象 |
| POST | `/api/experiences` | 发布经验 | `schoolId, major, text, tags[], dimensions[]` | 创建结果 |
| GET | `/api/experiences/sources` | 信息源说明 | 无 | 四类信息源的名称与含义（学生/官方/数据/专家） |

### 2.5 账号

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| POST | `/api/auth/register` | 注册 | `email, password, nickname` | `{ token, user }` |
| POST | `/api/auth/login` | 登录 | `email, password` | `{ token, user }` |
| POST | `/api/auth/logout` | 退出 | — | `{ ok: true }` |
| GET | `/api/me` | 当前用户资料 | — | 用户对象，不含密码字段 |
| PATCH | `/api/me` | 修改资料 | `nickname, stage, schoolId, major` | 更新后的用户对象 |

### 2.6 问答

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/questions` | 问题列表 | `topic`, `status`, `schoolId`, `page` | 问题数组 |
| POST | `/api/questions` | 提问 | `title, body, topic, isAnonymous` | 创建结果 |
| GET | `/api/questions/:id/answers` | 某问题的回答 | `id`, `page` | 回答数组 |
| POST | `/api/questions/:id/answers` | 回答 | `body` | 创建结果 |
| POST | `/api/answers/:id/accept` | 采纳最佳答案 | `id` | `{ ok: true }`，仅提问者可操作 |

### 2.7 收藏

| 方法 | 路径 | 说明 | 请求参数 | 返回 |
|---|---|---|---|---|
| GET | `/api/favorites` | 我的收藏 | `page` | 收藏数组 |
| POST | `/api/favorites` | 添加收藏 | `schoolId, majorName, note` | 创建结果（重复收藏返回 409） |
| DELETE | `/api/favorites/:id` | 取消收藏 | `id` | `{ ok: true }` |

---

## 三、请求 / 响应示例

### 3.1 GET `/api/admissions?schoolId=fjnu&year=2024&province=福建&subjectType=物理类`

```json
{
  "page": 1,
  "pageSize": 20,
  "total": 3,
  "items": [
    { "schoolId": "fjnu", "year": 2024, "province": "福建", "subjectType": "物理类",
      "batch": "本科批", "majorName": null, "minScore": 552, "minRank": 31000,
      "sourceName": "福建省教育考试院", "sourceUrl": "https://www.eeafj.cn/", "verifiedAt": "2026-09-29" },
    { "schoolId": "fjnu", "year": 2024, "province": "福建", "subjectType": "物理类",
      "batch": "本科批", "majorName": "计算机科学与技术", "minScore": 565, "minRank": 23000,
      "sourceName": "福建省教育考试院", "sourceUrl": "https://www.eeafj.cn/", "verifiedAt": "2026-09-29" }
  ]
}
```

### 3.2 POST `/api/auth/register`

请求：

```json
{ "email": "a@fjnu.edu.cn", "password": "用户输入的明文口令", "nickname": "小明" }
```

响应 201：

```json
{ "token": "<payload>.<hmac>", "user": { "id": 1, "email": "a@fjnu.edu.cn", "nickname": "小明", "role": "student" } }
```

服务端只把 `password` 用于计算 `password_hash` 和 `password_salt` 后入库，明文不落库、不进日志、不回传。

### 3.3 错误响应

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "subjectType 必须是 物理类/历史类/综合/不限 之一" } }
```

---

## 四、设计原则

1. 查询优先。第一阶段优先实现 2.1 到 2.3（健康检查、院校、录取），这几条能支撑答辩演示。
2. 数据必须可溯源。所有涉及录取数据的接口，响应里都要带 `sourceName`、`sourceUrl`、`verifiedAt`。
3. 不用假数据兜底。查不到就返回空数组加 `total: 0`，不要返回编造的示例数据。
4. 分页强制。列表接口一律分页，默认 `pageSize=20`，上限 100。
5. 字段命名与数据库保持一致。前端 camelCase 与数据库 snake_case 在服务层做一次映射，不要两边各起一套名字。
6. 纯静态版必须保留。后端接口是增量，`js/` 里的本地数据与 localStorage 逻辑不删除，保证"双击就能演示"。

---

## 五、与前端字段的对应关系

避免联调时对不上：

| 前端字段（`js/02-data-institutions.js`） | 数据库列 | API 字段 |
|---|---|---|
| `id` | `institutions.id` | `id` |
| `school` | `school` | `school` |
| `englishName` | `english_name` | `englishName` |
| `identityTags` | `identity_tags` | `identityTags` |
| `admissionReference.note` | `admission_reference_note` | `admissionReferenceNote` |
| `majorPrograms` | `major_programs` | `majorPrograms` |
| `officialUrl` | `official_url` | `officialUrl` |
| `updatedAtISO` | `updated_at_iso` | `updatedAtISO` |

| 录取数据（新表） | 数据库列 | API 字段 |
|---|---|---|
| — | `min_score` | `minScore` |
| — | `min_rank` | `minRank` |
| — | `subject_type` | `subjectType` |
| — | `source_url` | `sourceUrl` |