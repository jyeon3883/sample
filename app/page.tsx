"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AXIOS_INSTANCE } from "@repo/api-client/axios";
import { usePublicEndpoint } from "@repo/api-client";
import { queryKeys } from "@repo/query";
import { Button, LabeledSelect, SearchInput, Tab, TabPanel, Tabs, Typography } from "@repo/ui";
import { EChart, type EChartsOption } from "@repo/ui/chart";
import { QCELLGrid, QCELLGridRef } from "@repo/ui/qcell";

type HealthResponse = {
  status: string;
};

async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await AXIOS_INSTANCE.get<HealthResponse>("/health");
  return data;
}

export default function HomePage() {
  const [tab, setTab] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [environment, setEnvironment] = useState("local");
  const qcellObjProperty = {
    id: "qcell-demo",
    rowheaders: ['sequence'],
    onechlikedit: true,
    columns: [
      { key: "id", title: ["ID"], width: '5%' , type: "html" },
      { key: "name", title: ["이름"], width: '20%' , type: "html" },
      { key: "role", title: ["역할"], width: '20%' , type: "html" },
      { key: "active", title: ["활성"], width: '5%' , type: "html" },
      { key: "actions", title: ["Actions"], width: '20%' , type: "html" },
      { key: "createdAt", title: ["작성일"], width: '30%' , type: "html" },
    ],
    data: {input : [
      { id: 1, name: "Kim", role: "Admin", active: "Y", actions: "Edit", createdAt: "2026-01-01" },
      { id: 2, name: "Lee", role: "Editor", active: "Y", actions: "Edit", createdAt: "2026-01-01" },
      { id: 3, name: "Park", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 4, name: "Choi", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 5, name: "Kwon", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 6, name: "Kim", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 7, name: "Lee", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 8, name: "Park", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 9, name: "Choi", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
      { id: 10, name: "Kwon", role: "Viewer", active: "N", actions: "Edit", createdAt: "2026-01-01" },
    ]},
  };

  const qcellRef = useRef<QCELLGridRef>(null);

  const chartOption: EChartsOption = {
    tooltip: { trigger: "axis" },
    legend: { data: ["활성 사용자"] },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "활성 사용자",
        type: "line",
        data: [120, 200, 150, 80, 70, 110, 130],
        smooth: true,
      },
    ],
  };

  const { data, isPending: isLoading, isError, mutate: refetch } = usePublicEndpoint();
 

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Typography variant="h4" component="h1">
        Next.js 16.1 Monorepo
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
        React 19.2.1 · axios · TanStack Query · Orval · MUI atoms/molecules
      </Typography>

      <div style={{ marginTop: "1.5rem" }}>
        <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)}>
          <Tab label="폼 예제" />
          <Tab label="API 예제" />
          <Tab label="그리드 예제" />
          <Tab label="차트 예제" />
        </Tabs>
      </div>

      <TabPanel value={tab} index={0}>
        <div style={{ display: "grid", gap: "0.75rem", maxWidth: "420px" }}>
          <SearchInput value={keyword} onChange={setKeyword} label="키워드" />
          <LabeledSelect
            label="환경"
            value={environment}
            onChange={setEnvironment}
            options={[
              { label: "Local", value: "local" },
              { label: "Dev", value: "dev" },
              { label: "Prod", value: "prod" },
            ]}
          />
          <Typography variant="body2" color="text.secondary">
            검색어: {keyword || "(없음)"} / 환경: {environment}
          </Typography>
        </div>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button onClick={() => refetch()}>Health API 호출</Button>
        </div>
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#f4f4f5",
            borderRadius: "8px",
          }}
        >
          {isLoading && "로딩 중..."}
          {isError && "API 호출 실패 (백엔드 미실행 시 정상)"}
          {!isLoading && !isError && JSON.stringify(data ?? { hint: "버튼을 눌러 호출" }, null, 2)}
        </pre>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          QCELL React 샘플입니다.
        </Typography>
        <div id="qcell-demo-wrap" style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}>
          <QCELLGrid
            ref={qcellRef}
            width="100%"
            height="320px"
            objProperty={qcellObjProperty}
          />
        </div>
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ECharts 라인 차트 샘플입니다.
        </Typography>
        <div style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}>
          <EChart option={chartOption} height={360} />
        </div>
      </TabPanel>
    </main>
  );
}
