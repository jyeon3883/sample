# next-tanstack-monorepo

단일 Next.js 앱 + 공유 패키지 monorepo (React **19.2.1**, Next **16.1.0**)

## 주요 라이브러리 버전

| 분류                | 라이브러리                   | 버전        |
| ------------------- | ---------------------------- | ----------- |
| **런타임**          | Node.js                      | `>=20`      |
| **패키지 매니저**   | pnpm                         | `10.26.1`   |
| **빌드**            | Turbo                        | `^2.8.0`    |
| **프레임워크**      | Next.js                      | `16.1.0`    |
| **UI**              | React                        | `19.2.1`    |
| **UI**              | React DOM                    | `19.2.1`    |
| **UI 컴포넌트**     | MUI (Material UI)            | `^7.3.11`   |
| **UI 컴포넌트**     | MUI Icons                    | `^7.3.11`   |
| **스타일**          | Emotion React                | `^11.14.0`  |
| **스타일**          | Emotion Styled               | `^11.14.1`  |
| **서버 상태**       | TanStack Query (React Query) | `^5.100.14` |
| **HTTP 클라이언트** | Axios                        | `^1.16.1`   |
| **코드 생성**       | Orval                        | `^8.12.3`   |
| **스키마 검증**     | Zod                          | `^4.4.3`    |
| **폼**              | React Hook Form              | `^7.77.0`   |
| **폼**              | @hookform/resolvers          | `^5.4.0`    |
| **차트**            | ECharts                      | `^6.1.0`    |
| **차트**            | echarts-for-react            | `^3.0.6`    |
| **스토리북**        | Storybook                    | `10.4.1`    |
| **언어**            | TypeScript                   | `^5.8.3`    |
| **린터**            | ESLint                       | `^9.28.0`   |
| **포매터**          | Prettier                     | `^3.8.3`    |

---

## md 파일 뷰어

MarkMaid View

## pnpm 설치

npm install -g pnpm@latest-11

pnpm 설치후
pnpm i or pnpm install

---

## 권장 VSCode 확장 프로그램

VSCode 확장 프로그램 탭에서 아래 항목들을 검색하여 설치합니다.

| 확장 ID                  | 이름       | 설명                                             |
| ------------------------ | ---------- | ------------------------------------------------ |
| `dbaeumer.vscode-eslint` | ESLint     | JS/TS 린팅 규칙 적용                             |
| `esbenp.prettier-vscode` | Prettier   | 코드 자동 포매팅                                 |
| `eamodio.gitlens`        | GitLens    | Git blame, 히스토리, 브랜치 등 강력한 Git 시각화 |
| `usernamehw.errorlens`   | Error Lens | 에러/경고를 해당 코드 줄에 인라인으로 표시       |

---

## ESLint / Prettier 설정

### 1. 확장 프로그램 설치

VSCode 확장 프로그램 탭에서 아래 두 가지를 검색하여 설치합니다.

- `dbaeumer.vscode-eslint` — ESLint
- `esbenp.prettier-vscode` — Prettier

### 2. 패키지 설치

프로젝트 루트에서 실행합니다.

```bash
pnpm add -D prettier eslint-config-prettier
```

### 3. `.prettierrc` 생성 (프로젝트 루트)

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "lf"
}
```

### 4. `eslint.config.mjs` 수정

`eslint-config-prettier`를 가장 마지막에 추가해야 Prettier와 충돌하는 ESLint 규칙이 비활성화됩니다.

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier, // ← 반드시 마지막에 위치
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "packages/**/node_modules/**",
    "packages/ui/storybook-static/**",
    "**/*.tsbuildinfo",
  ]),
]);

export default eslintConfig;
```

### 5. `.vscode/settings.json` 생성 (프로젝트 루트)

```json
{
  "eslint.useFlatConfig": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[javascriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

> 설정 후 VSCode를 재시작하거나 `Ctrl+Shift+P` → **ESLint: Restart ESLint Server** 를 실행합니다.

---

## 폴더 구조 (단일 서비스용)

`apps/` 없이 **루트가 Next 앱**, 공통 코드만 `packages/`에 둡니다.

```
next-tanstack-monorepo/
├── app/                    # Next 라우트만 (얇은 re-export)
│   ├── layout.tsx
│   ├── page.tsx
│   └── (board)/notice|qna/
├── src/                    # FSD (Feature-Sliced Design)
│   ├── application/        # FSD app 레이어 (providers, Next app/ 과 구분)
│   ├── screens/            # 화면 조립 (FSD pages — Next pages/ 와 충돌 방지)
│   ├── widgets/            # 큰 UI 블록
│   ├── features/           # 유스케이스
│   ├── entities/           # 도메인 개념
│   └── shared/             # 앱 전용 공통 (config, lib)
├── public/
├── packages/               # FSD shared 인프라 (UI, API, Query)
│   ├── api-client/         # Orval + axios
│   ├── query/              # TanStack Query
│   ├── ui/                 # MUI, ECHARTS, QCELL , storybook
│   ├── types/
│   └── config-typescript/
├── next.config.ts
├── package.json            # Next 앱 + workspace 루트
├── pnpm-workspace.yaml     # packages/* 만 포함
└── turbo.json
```

## FSD 레이어 규칙

의존 방향은 **위 → 아래**만 허용합니다. 같은 레이어의 다른 slice끼리 import는 하지 않습니다.

```
app/ (Next)  →  screens  →  widgets  →  features  →  entities  →  shared / packages
```

| 레이어             | 역할                                                                        | 이 레포 예시                                              |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------- |
| `app/` (Next)      | URL, `layout`, `metadata`. 비즈니스 로직 없음                               | `app/page.tsx` → `@/screens/home` re-export               |
| `src/application/` | FSD app 레이어 — Provider, 초기화                                           | `AppProviders` (MUI + Query + Theme)                      |
| `src/screens/`     | **한 라우트 화면** 조립. FSD의 pages                                        | `home`, `notice`, `qna`                                   |
| `src/widgets/`     | 여러 feature/entity를 묶은 **큰 UI 블록**                                   | `demo-dashboard`, `board-nav`                             |
| `src/features/`    | **사용자가 하는 동작 하나**. UI + 그 동작에 필요한 상태·API 호출을 묶음     | `demo-form`(폼 제출), `api-playground`(엔드포인트 테스트) |
| `src/entities/`    | **앱이 다루는 핵심 데이터 단위**. 타입·모델만 가짐. feature에서 조립해서 씀 | `notice`(공지 타입), `qna`(QnA 타입)                      |
| `src/shared/`      | 도메인 없는 앱 전용 유틸                                                    | `shared/config/routes.ts`                                 |
| `packages/*`       | 멀티앱·인프라급 공통 (FSD shared)                                           | `@repo/ui`, `@repo/api-client`, `@repo/query`             |

> **왜 `screens`인가?** Next.js는 `src/pages/`를 Pages Router로 인식합니다. FSD의 pages 레이어 이름은 `screens`로 둡니다.

### Slice 안 segment (폴더 역할)

기능/엔티티 폴더(slice) 안에서는 **파일 종류**별로 segment를 둡니다.

| segment  | 넣는 것                    | 예시                                                             |
| -------- | -------------------------- | ---------------------------------------------------------------- |
| `ui/`    | React 컴포넌트             | `features/demo-form/ui/demo-form-panel.tsx`                      |
| `model/` | hook, store, 비즈니스 상태 | `entities/notice/model/types.ts`, (추가 시) `use-notice-list.ts` |
| `api/`   | API 호출·Orval 래핑        | (추가 시) `features/notice-list/api/get-notices.ts`              |
| `lib/`   | slice **내부만** 쓰는 헬퍼 | slice 전용 포맷터 등                                             |

외부에서는 slice의 **`index.ts`(public API)** 만 import 합니다.

```ts
// ✅
import { DemoFormPanel } from "@/features/demo-form";

// ❌ segment·내부 파일 직접 import
import { DemoFormPanel } from "@/features/demo-form/ui/demo-form-panel";
```

### Import 허용 표

| from ↓ / to → | screens | widgets | features | entities | shared          | packages |
| ------------- | ------- | ------- | -------- | -------- | --------------- | -------- |
| **screens**   | —       | ✅      | ✅       | ✅       | ✅              | ✅       |
| **widgets**   | ❌      | —       | ✅       | ✅       | ✅              | ✅       |
| **features**  | ❌      | ❌      | —        | ✅       | ✅              | ✅       |
| **entities**  | ❌      | ❌      | ❌       | —        | ✅              | ✅       |
| **shared**    | ❌      | ❌      | ❌       | ❌       | slice 간 최소화 | ✅       |

- `features/auth` → `features/cart` ❌ (필요하면 `widgets` 또는 `screens`에서 조합)
- 도메인 hook·API는 `shared`가 아니라 **해당 feature/entity의 `model/`·`api/`**

> **features vs entities 구분법**
>
> - `entities` = **"무엇(What)"** — 데이터가 어떻게 생겼는가 (User, Notice의 타입·모델)
> - `features` = **"어떻게(How)"** — 사용자가 그 데이터로 무엇을 하는가 (로그인, 글쓰기, 검색)

### Custom Hook 위치 기준 (CRUD별)

hook은 **읽기냐 / 쓰기냐**에 따라 위치가 달라집니다.

| 동작               | 성격                                        | 위치                     |
| ------------------ | ------------------------------------------- | ------------------------ |
| `GET` 조회         | 데이터를 읽기만 함 — 여러 레이어에서 재사용 | `entities/{name}/model/` |
| `POST` 등록        | 사용자가 행동을 일으킴                      | `features/{name}/model/` |
| `PUT / PATCH` 수정 | 사용자가 행동을 일으킴                      | `features/{name}/model/` |
| `DELETE` 삭제      | 사용자가 행동을 일으킴                      | `features/{name}/model/` |

```
entities/
  notice/
    model/
      use-notice-list.ts    ← GET 목록 조회 ✅
      use-notice-detail.ts  ← GET 상세 조회 ✅

features/
  notice-create/
    model/
      use-notice-create.ts  ← POST 등록 ✅
  notice-edit/
    model/
      use-notice-edit.ts    ← PUT 수정 ✅
  notice-delete/
    model/
      use-notice-delete.ts  ← DELETE 삭제 ✅
```

> **조회 hook을 entities에 두는 이유:** screens, widgets, features 어디서든 공통으로 재사용되기 때문입니다.  
> **등록·수정·삭제 hook을 features에 두는 이유:** 특정 사용자 행동(폼 제출, 버튼 클릭)에 종속되어 해당 feature 안에서만 쓰이기 때문입니다.

### Path alias (`tsconfig.json`)

| alias           | 경로              |
| --------------- | ----------------- |
| `@/screens/*`   | `src/screens/*`   |
| `@/widgets/*`   | `src/widgets/*`   |
| `@/features/*`  | `src/features/*`  |
| `@/entities/*`  | `src/entities/*`  |
| `@/shared/*`    | `src/shared/*`    |
| `@/application` | `src/application` |

---

## 예제: 지금 코드가 어떻게 연결되는지

### 1) Next 라우트 → screen (얇은 진입점)

```tsx
// app/page.tsx
export { HomePage as default } from "@/screens/home";

// app/(board)/notice/page.tsx
export { NoticePage as default } from "@/screens/notice";
```

### 2) screen — 위젯·타이포만 조립

```tsx
// src/screens/home/ui/home-page.tsx
import { Typography } from "@repo/ui";
import { DemoDashboard } from "@/widgets/demo-dashboard";

export function HomePage() {
  return (
    <main>
      <Typography variant="h4">Next.js 16.1 Monorepo</Typography>
      <DemoDashboard />
    </main>
  );
}
```

### 3) widget — feature 여러 개 + UI 패키지

```tsx
// src/widgets/demo-dashboard/ui/demo-dashboard.tsx
import { PublicEndpointPanel } from "@/features/api-playground";
import { DemoFormPanel } from "@/features/demo-form";
// + @repo/ui (Tabs, QCELL, Chart)
```

### 4) feature — 유스케이스 한 덩어리

```tsx
// src/features/api-playground/ui/public-endpoint-panel.tsx
import { usePublicEndpoint } from "@repo/api-client";
import { Button } from "@repo/ui";
```

### 5) entity — 도메인 타입·표시 (API 연동 전 스켈레톤)

```ts
// src/entities/notice/model/types.ts
export type Notice = { id: string; title: string; createdAt: string };

// src/entities/notice/index.ts
export type { Notice } from "./model/types";
```

### 6) shared — 라우트 상수 등 앱 전용

```ts
// src/shared/config/routes.ts
export const routes = { home: "/", notice: "/notice", qna: "/qna" } as const;

// src/widgets/board-nav/ui/board-nav.tsx
import { routes } from "@/shared/config/routes";
```

### 7) 공통 hook을 추가할 때

도메인 이름이 없는 hook만 `src/shared/lib/` (또는 `shared/lib/hooks/`)에 둡니다.

```
src/shared/lib/
  use-debounce.ts
  index.ts
```

공지 목록 조회 hook은 `entities/notice/model/use-notice-list.ts`처럼 **entity/feature** 쪽에 둡니다.

---

## 실전 샘플: "공지사항" 기능을 처음부터 만든다면

> 하나의 도메인을 레이어별로 어떻게 나누는지 전체 흐름을 보여줍니다.

### 폴더 구조 전체

```
src/
├── entities/
│   └── notice/
│       ├── model/
│       │   ├── types.ts              # Notice 타입 정의
│       │   ├── use-notice-list.ts    # GET 목록 조회 hook
│       │   └── use-notice-detail.ts  # GET 상세 조회 hook
│       ├── ui/
│       │   └── notice-card.tsx       # 공지 1건을 표시하는 기본 카드 UI
│       └── index.ts                  # 외부 공개 API
│
├── features/
│   ├── notice-create/
│   │   ├── model/
│   │   │   ├── schema.ts             # zod 유효성 검사 스키마
│   │   │   └── use-notice-create.ts  # POST 등록 hook
│   │   ├── ui/
│   │   │   └── notice-create-form.tsx
│   │   └── index.ts
│   ├── notice-edit/
│   │   ├── model/
│   │   │   └── use-notice-edit.ts    # PUT 수정 hook
│   │   ├── ui/
│   │   │   └── notice-edit-form.tsx
│   │   └── index.ts
│   └── notice-delete/
│       ├── model/
│       │   └── use-notice-delete.ts  # DELETE 삭제 hook
│       ├── ui/
│       │   └── notice-delete-button.tsx
│       └── index.ts
│
├── widgets/
│   └── notice-board/
│       ├── ui/
│       │   └── notice-board.tsx      # 목록 + 페이지네이션 조합 블록
│       └── index.ts
│
└── screens/
    └── notice/
        ├── ui/
        │   └── notice-page.tsx       # 화면 조립만 담당
        └── index.ts
```

### 각 파일이 담는 내용

**① 타입 정의** `entities/notice/model/types.ts`

```ts
export type Notice = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};
```

**② 조회 hook** `entities/notice/model/use-notice-list.ts`

```ts
import { useQuery } from "@tanstack/react-query";

export function useNoticeList() {
  return useQuery({
    queryKey: ["notice", "list"],
    queryFn: () => fetchNotices(), // @repo/api-client 호출
  });
}
```

**③ 유효성 검사 스키마** `features/notice-create/model/schema.ts`

```ts
import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(10, "내용은 10자 이상 입력해주세요"),
});
```

**④ 등록 hook** `features/notice-create/model/use-notice-create.ts`

```ts
import { useMutation } from "@tanstack/react-query";

export function useNoticeCreate() {
  return useMutation({
    mutationFn: (data: NoticeCreateInput) => createNotice(data),
  });
}
```

**⑤ 화면 조립** `screens/notice/ui/notice-page.tsx`

```tsx
import { NoticeBoard } from "@/widgets/notice-board";
import { NoticeCreateForm } from "@/features/notice-create";

export function NoticePage() {
  return (
    <main>
      <NoticeCreateForm />
      <NoticeBoard />
    </main>
  );
}
```

### segment 정리

| segment           | 무엇을 넣나          | 주의                                      |
| ----------------- | -------------------- | ----------------------------------------- |
| `model/types.ts`  | 타입·인터페이스      | 로직 없음, 순수 타입만                    |
| `model/use-*.ts`  | custom hook          | 조회→entities, 쓰기→features              |
| `model/schema.ts` | zod 등 유효성 스키마 | 해당 feature 안에서만 사용                |
| `ui/*.tsx`        | React 컴포넌트       | 외부에서 index.ts 통해서만 import         |
| `api/*.ts`        | API 호출 함수        | Orval 생성 함수 래핑                      |
| `lib/*.ts`        | slice 내부 전용 유틸 | 외부에서 import 금지                      |
| `index.ts`        | 외부 공개 API        | 여기서만 export, 내부 파일 직접 접근 금지 |

---

## Zod — 런타임 스키마 검증

> 참조: [https://zod.dev/](https://zod.dev/)

### 개요

Zod는 TypeScript-first 스키마 선언 및 런타임 검증 라이브러리입니다.  
TypeScript 타입은 컴파일 타임에만 동작하지만, Zod 스키마는 **런타임에서도 실제 데이터를 검증**합니다.

```
TypeScript 타입  →  컴파일 타임 안전성
Zod 스키마      →  런타임 안전성 + 타입 자동 추론
```

### 설치 위치

이 모노레포에서 `zod`는 `@repo/types` 패키지에서 관리합니다.  
루트 앱과 다른 패키지는 `zod`를 직접 의존하지 않고 `@repo/types`를 통해 사용합니다.

```ts
// ✅ 권장 — @repo/types를 통해 사용
import { z } from "@repo/types";

// ❌ 비권장 — 직접 참조 시 버전 분산 위험
import { z } from "zod";
```

### 주요 사용처

#### 1. 조회 — API 응답 런타임 검증

Orval이 생성한 타입은 컴파일 타임 전용입니다.  
실제 API 응답이 스키마와 다를 경우를 대비해 `safeParse`로 런타임 검증을 추가할 수 있습니다.

```ts
import { z } from "@repo/types";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  active: z.boolean(),
});

// safeParse: 실패해도 예외를 던지지 않음
const result = UserSchema.safeParse(apiResponse);

if (result.success) {
  console.log(result.data); // 타입 안전한 데이터
} else {
  console.error(result.error.issues); // 오류 상세 목록
}
```

#### 2. 등록/수정 — 폼 유효성 검사

`react-hook-form`의 `zodResolver`와 조합하면 스키마 하나로 **타입 추론 + 폼 검증**을 동시에 처리합니다.

```ts
import { z } from "@repo/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요.").max(20),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  role: z.enum(["Admin", "Editor", "Viewer"]),
});

type UserFormValues = z.infer<typeof UserFormSchema>; // 타입 자동 추론

const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
  resolver: zodResolver(UserFormSchema),
});
```

### 스키마 관리 원칙

- 공통으로 재사용되는 스키마는 `@repo/types/src/schemas/` 하위에 도메인별 파일로 관리합니다.
- 특정 feature에서만 사용하는 스키마는 해당 feature 내부 파일에서 정의합니다.
- `z.infer<typeof Schema>`로 타입을 추론해 별도 `type` 선언을 최소화합니다.

```
packages/types/src/schemas/
├── common.ts     ← 페이지네이션 등 공통 스키마
└── {domain}.ts   ← 도메인별 스키마 추가
```

---

## 새 기능 넣을 때 (체크리스트)

| 질문                                 | 넣을 곳                                    |
| ------------------------------------ | ------------------------------------------ |
| 새 URL 화면인가?                     | `app/.../page.tsx` + `src/screens/<name>/` |
| 여러 feature를 한 블록으로 묶나?     | `src/widgets/<name>/`                      |
| 사용자 액션(로그인, 필터, 제출)인가? | `src/features/<name>/`                     |
| Notice, User 같은 **개념**인가?      | `src/entities/<name>/`                     |
| 버튼·Input·테마                      | `@repo/ui` (`packages/ui`)                 |
| Orval 생성 API·axios                 | `@repo/api-client`                         |
| QueryClient·queryKeys                | `@repo/query`                              |
| debounce 등 순수 유틸 hook           | `src/shared/lib/`                          |

**notice 목록 API 연동 예 (추가 시 권장 구조)**

```
src/entities/notice/
  model/types.ts
  ui/notice-row.tsx
  index.ts

src/features/notice-list/
  api/get-notices.ts          # Orval 래핑
  model/use-notice-list.ts
  ui/notice-list.tsx
  index.ts

src/screens/notice/
  ui/notice-page.tsx          # <NoticeList /> 조립만
```

---

## `app/` vs `src/` — Next colocation

| 패턴                                        | FSD에서                                    |
| ------------------------------------------- | ------------------------------------------ |
| `app/_components`, `app/_hooks`, `app/_lib` | 사용하지 않음 (비어 있으면 삭제)           |
| 라우트 전용 코드                            | `screens` / `features` / `entities`로 이동 |

---

## 왜 `apps/web/app` 대신 루트 `app/`?

| 구조               | 적합한 경우                                |
| ------------------ | ------------------------------------------ |
| `apps/web/app/...` | web, admin, api 등 **배포 단위가 여러 개** |
| `app/...` (루트)   | **서비스 1개** + 코드만 패키지로 분리      |

지금처럼 서비스가 하나면 루트 `app/`이 경로도 짧고 설정도 단순합니다. monorepo 이점(공유 패키지, Orval, Query 설정 분리)은 그대로 유지됩니다.

## 시작하기

```powershell
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install
pnpm dev
```

## 스크립트

| 명령             | 설명                         |
| ---------------- | ---------------------------- |
| `pnpm lint`      | ESLint (`eslint.config.mjs`) |
| `pnpm dev`       | 개발 서버 (localhost:3000)   |
| `pnpm build`     | Next 프로덕션 빌드           |
| `pnpm codegen`   | Orval API 클라이언트 생성    |
| `pnpm typecheck` | 루트 + packages 타입 검사    |
| `pnpm storybook` | 스토리북 (localhost:6006)    |
