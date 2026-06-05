"use client";

import { Typography } from "@repo/ui";
import { EChart } from "@repo/ui/chart";
import { demoChartOption } from "../model/chartOption";

export function ChartDemoPanel() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        ECharts 라인 차트 샘플입니다.
      </Typography>
      <div style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}>
        <EChart option={demoChartOption} height={360} />
      </div>
    </>
  );
}
