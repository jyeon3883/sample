"use client";

import { useEffect, useRef } from "react";
import { Button, Typography } from "@repo/ui";
import { QCELLGrid, type QCELLGridRef } from "@repo/ui/qcell";
import { demoQcellObjProperty } from "../model/qcellConfig";

export function GridDemoPanel() {
  const qcellRef = useRef<QCELLGridRef>(null);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 50;
    const tick = () => {
      if (cancelled) return;
      const instance = qcellRef.current?.getQCELLInstance() ?? null;
      if (instance) {
        console.log("QCELL ready", instance);
        return;
      }
      if (++attempts < maxAttempts) {
        window.setTimeout(tick, 100);
      } else {
        console.warn("QCELL instance timeout");
      }
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        QCELL React 샘플입니다.
      </Typography>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            const { current } = qcellRef;
            if (!current) return;
            const instance = current.getQCELLInstance();
            const qcell = current.getQCELL();
            console.log("qcell instance ::: ", instance);
            console.log("qcell QCELL ::: ", qcell);
            console.log("qcell instance ::: ", qcell.getInstance("qcell-demo"));
          }}
        >
          테스트
        </Button>
      </div>
      <div
        id="qcell-demo-wrap"
        style={{ border: "1px solid #e4e4e7", borderRadius: "8px", padding: "0.75rem" }}
      >
        <QCELLGrid
          ref={qcellRef}
          width="100%"
          height="320px"
          objProperty={demoQcellObjProperty}
        />
      </div>
    </>
  );
}
