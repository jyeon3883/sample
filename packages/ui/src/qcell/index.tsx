"use client";

import { forwardRef, useEffect, useState } from "react";
import type { ReactElement, ReactNode, Ref } from "react";
import type { QCELLReactRef } from "qcell-react";
import styles from "./qcell.module.css";

type QCELLObjProperty = {
  id: string;
  parentid?: string;
  [key: string]: unknown;
};

type QCELLReactProps = {
  width?: string;
  height?: string;
  objProperty: QCELLObjProperty;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  suppressKnownQcellErrors?: boolean;
};

export type { QCELLReactRef } from "qcell-react";
export type QCELLGridRef = QCELLReactRef;

type LoadedQcellProps = {
  width?: string;
  height?: string;
  objProperty: QCELLObjProperty;
};

type LoadedQcellComponent = (
  props: LoadedQcellProps & { ref?: Ref<QCELLReactRef> },
) => ReactElement;

export const QCELLGrid = forwardRef<QCELLReactRef, QCELLReactProps>(function QCELLGrid(
  props,
  ref,
) {
  const { loadingFallback, errorFallback, suppressKnownQcellErrors = true, ...qcellProps } = props;
  const [QcellComponent, setQcellComponent] = useState<LoadedQcellComponent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!suppressKnownQcellErrors) return;

    const originalConsoleError = console.error;
    // qcell-react가 dev 환경에서 console.error를 반복 발생시키는 이슈가 있어
    // 컴포넌트가 마운트된 동안만 console.error를 차단한다.
    console.error = () => {};

    return () => {
      console.error = originalConsoleError;
    };
  }, [suppressKnownQcellErrors]);

  useEffect(() => {
    let mounted = true;

    import("qcell-react")
      .then((module) => {
        if (!mounted) return;
        setQcellComponent(() => module.default as LoadedQcellComponent);
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        const message = error instanceof Error ? error.message : "qcell-react 로딩 실패";
        setLoadError(message);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loadError) {
    if (errorFallback) return <>{errorFallback}</>;
    return <div>QCELL 로딩 실패: {loadError}</div>;
  }

  if (!QcellComponent) {
    if (loadingFallback) return <>{loadingFallback}</>;
    return <div>QCELL 로딩 중...</div>;
  }

  return (
    <div className={styles.qcellScope}>
      <QcellComponent ref={ref} {...qcellProps} />
    </div>
  );
});
