# next-tanstack-monorepo

단일 Next.js 앱 + 공유 패키지 monorepo (React **19.2.1**, Next **16.1.0**)

## 폴더 구조 (단일 서비스용)

`apps/` 없이 **루트가 Next 앱**, 공통 코드만 `packages/`에 둡니다.

```
C:\work\next-tanstack-monorepo\
├── app/                    # Next.js App Router (바로 접근)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── public/
├── packages/               # 공유 라이브러리만
│   ├── api-client/         # Orval + axios
│   ├── query/              # TanStack Query
│   ├── ui/
│   ├── types/
│   └── config-typescript/
├── next.config.ts
├── package.json            # Next 앱 + workspace 루트
├── pnpm-workspace.yaml     # packages/* 만 포함
└── turbo.json
```

## 왜 `apps/web/app` 대신 루트 `app/`?

| 구조 | 적합한 경우 |
|------|-------------|
| `apps/web/app/...` | web, admin, api 등 **배포 단위가 여러 개** |
| `app/...` (루트) | **서비스 1개** + 코드만 패키지로 분리 |

지금처럼 서비스가 하나면 루트 `app/`이 경로도 짧고 설정도 단순합니다. monorepo 이점(공유 패키지, Orval, Query 설정 분리)은 그대로 유지됩니다.

## 시작하기

```powershell
cd C:\work\next-tanstack-monorepo
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install
pnpm dev
```

## 스크립트

| 명령 | 설명 |
|------|------|
| `pnpm dev` | 개발 서버 (localhost:3000) |
| `pnpm build` | Next 프로덕션 빌드 |
| `pnpm codegen` | Orval API 클라이언트 생성 |
| `pnpm typecheck` | 루트 + packages 타입 검사 |

## 이전 프로젝트 삭제

`C:\Users\jyeoun\Projects\next-tanstack-monorepo`는 Cursor가 폴더를 열어두면 삭제가 안 될 수 있습니다. 해당 워크스페이스를 닫은 뒤:

```powershell
Remove-Item -Recurse -Force "C:\Users\jyeoun\Projects\next-tanstack-monorepo"
```
