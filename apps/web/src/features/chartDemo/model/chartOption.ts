import type { EChartsOption } from "@repo/ui/chart";

export const demoChartOption: EChartsOption = {
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
