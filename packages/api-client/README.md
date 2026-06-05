# @repo/api-client

Orval 기반 API 클라이언트 생성 패키지입니다.

## 코드 생성

1. 백엔드(OpenAPI)가 실행 중이어야 합니다.
2. 루트에서 환경 변수를 준비합니다.
3. 루트에서 아래 명령을 실행합니다.

```bash
pnpm codegen
```

## 생성 구조

- `mode: tags-split`으로 태그별 엔드포인트 폴더가 생성됩니다.
- 코드젠 후 후처리로 각 서비스의 `models/<tag>` 하위 폴더가 생성됩니다.
- 중복 방지를 위해 `models` 루트의 평면 모델 파일은 제거되고, `models/index.ts`는 태그 폴더만 re-export 합니다.
- Orval은 operation 별 파일 분리를 기본 제공하지 않습니다.

## MSA 확장

`codegen-services.json`에 서비스를 추가한 뒤 루트 스크립트를 등록합니다.

1. `codegen-services.json`에 항목 추가
   - `name`: `pnpm codegen:<name>`에 사용 (`main` → `pnpm codegen:main`)
   - `orvalProject`: Orval project 키
   - `openApiEnvKey`: `ORVAL_OPENAPI_URL_<SERVICE>` 형태의 env 키
   - `outputTarget` / `outputSchemas`: `./src/generated/<service>/...`
2. 루트 `package.json`에 `"codegen:<name>": "cross-env APP_ENV=local pnpm --filter @repo/api-client codegen:<name>"` 추가
3. 루트 `.env.*`에 `ORVAL_OPENAPI_URL_<SERVICE>` 값 추가

```bash
pnpm codegen          # 전체 서비스
pnpm codegen:main     # main 서비스만
# pnpm codegen:payment  # 추가 서비스 예시
```

환경별 OpenAPI URL이 필요하면 `APP_ENV`를 바꿔 실행합니다.

```bash
cross-env APP_ENV=dev pnpm codegen:main
```

서로 다른 서비스가 같은 `schemas` 디렉터리를 공유하지 않도록 유지하세요.
