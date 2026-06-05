"use client";

import { useState } from "react";
import { Tab, TabPanel, Tabs } from "@repo/ui";
import { PublicEndpointPanel } from "@/features/apiPlayground";
import { ChartDemoPanel } from "@/features/chartDemo";
import { DemoFormPanel } from "@/features/demoForm";
import { GridDemoPanel } from "@/features/gridDemo";
import { ZodDemoPanel } from "@/features/zodDemo";
import { ZustandDemoPanel } from "@/features/zustandDemo";

export function DemoDashboard() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div style={{ marginTop: "1.5rem" }}>
        <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)}>
          <Tab label="폼 예제" />
          <Tab label="API 예제" />
          <Tab label="그리드 예제" />
          <Tab label="차트 예제" />
          <Tab label="Zod 예제" />
          <Tab label="Zustand 예제" />
        </Tabs>
      </div>

      <TabPanel value={tab} index={0}>
        <DemoFormPanel />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <PublicEndpointPanel />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <GridDemoPanel />
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <ChartDemoPanel />
      </TabPanel>

      <TabPanel value={tab} index={4}>
        <ZodDemoPanel />
      </TabPanel>

      <TabPanel value={tab} index={5}>
        <ZustandDemoPanel />
      </TabPanel>
    </>
  );
}
