import type { EChartsOption } from "echarts";

export const barChartOption: EChartsOption = {
  title: { text: "Bar Chart" },
  tooltip: {},
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Sales",
      type: "bar",
      data: [120, 200, 150, 80, 70],
    },
  ],
};

export const lineChartOption: EChartsOption = {
  title: { text: "Line Chart" },
  tooltip: { trigger: "axis" },
  xAxis: {
    type: "category",
    data: ["Jan", "Feb", "Mar", "Apr", "May"],
  },
  yAxis: { type: "value" },
  series: [
    {
      name: "Trend",
      type: "line",
      data: [820, 932, 901, 934, 1290],
    },
  ],
};

export const pieChartOption: EChartsOption = {
  title: { text: "Pie Chart" },
  tooltip: { trigger: "item" },
  legend: { orient: "vertical", left: "left" },
  series: [
    {
      name: "Share",
      type: "pie",
      radius: "50%",
      data: [
        { value: 1048, name: "A" },
        { value: 735, name: "B" },
        { value: 580, name: "C" },
      ],
    },
  ],
};
