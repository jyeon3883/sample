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

`orval.config.ts`에 서비스 키를 추가하면 됩니다.

- `input`: `ORVAL_OPENAPI_URL_<SERVICE>`
- `output.target`: `./src/generated/<service>/endpoints`
- `output.schemas`: `./src/generated/<service>/models`

서로 다른 서비스가 같은 `schemas` 디렉터리를 공유하지 않도록 유지하세요.
