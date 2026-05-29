"use client";

import { useMemo } from "react";
import type { CSSProperties } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts";
import type { EChartsReactProps } from "echarts-for-react";

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  CanvasRenderer,
]);

export type { EChartsOption };

export type EChartProps = {
  option: EChartsOption;
  className?: string;
  style?: CSSProperties;
  height?: number | string;
  width?: number | string;
  theme?: EChartsReactProps["theme"];
  loading?: boolean;
  onEvents?: EChartsReactProps["onEvents"];
};

export function EChart({
  option,
  className,
  style,
  height = 400,
  width = "100%",
  theme,
  loading,
  onEvents,
}: EChartProps) {
  const mergedStyle = useMemo(
    () => ({ height, width, ...style }),
    [height, width, style],
  );

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      className={className}
      style={mergedStyle}
      theme={theme}
      showLoading={loading}
      onEvents={onEvents}
      notMerge
      lazyUpdate
    />
  );
}
