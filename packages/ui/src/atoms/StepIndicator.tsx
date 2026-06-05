"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import type { SxProps, Theme } from "@mui/material/styles";

export interface Step {
  label: string;
  description?: string;
  optional?: boolean;
  /** optional이 true일 때 표시할 텍스트 (기본값: "(선택)") */
  optionalLabel?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  /** 0-based 현재 단계 인덱스 */
  activeStep: number;
  orientation?: "horizontal" | "vertical";
  sx?: SxProps<Theme>;
}

const GOV_BLUE = "#004EA2";
const CIRCLE_SIZE = 32;
const CONNECTOR_THICKNESS = 2;

type StepState = "completed" | "active" | "inactive";

function getState(index: number, activeStep: number): StepState {
  if (index < activeStep) return "completed";
  if (index === activeStep) return "active";
  return "inactive";
}

const CIRCLE_STYLE: Record<StepState, { bgcolor: string; color: string; border: string }> = {
  completed: { bgcolor: GOV_BLUE,     color: "#fff",       border: `2px solid ${GOV_BLUE}` },
  active:    { bgcolor: "transparent", color: GOV_BLUE,     border: `2px solid ${GOV_BLUE}` },
  inactive:  { bgcolor: "transparent", color: "#9CA3AF",    border: "2px solid #D1D5DB" },
};

const LABEL_COLOR: Record<StepState, string> = {
  completed: "text.secondary",
  active:    "text.primary",
  inactive:  "text.disabled",
};

export function StepIndicator({
  steps,
  activeStep,
  orientation = "horizontal",
  sx,
}: StepIndicatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <Box
      role="list"
      aria-label="단계 표시"
      sx={[
        {
          display: "flex",
          flexDirection: isHorizontal ? "row" : "column",
          alignItems: "flex-start",
          width: "100%",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {steps.map((step, i) => {
        const state = getState(i, activeStep);
        const isLast = i === steps.length - 1;
        const connectorCompleted = i < activeStep;
        const circleStyle = CIRCLE_STYLE[state];

        return (
          <Box
            key={i}
            role="listitem"
            aria-current={state === "active" ? "step" : undefined}
            sx={{
              display: "flex",
              flexDirection: isHorizontal ? "column" : "row",
              alignItems: isHorizontal ? "center" : "flex-start",
              flex: isHorizontal ? 1 : undefined,
              minWidth: 0,
            }}
          >
            {/* 원 + 연결선 행 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isHorizontal ? "row" : "column",
                alignItems: "center",
                width: isHorizontal ? "100%" : undefined,
              }}
            >
              {/* 단계 원 */}
              <Box
                sx={{
                  flexShrink: 0,
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: circleStyle.bgcolor,
                  border: circleStyle.border,
                  transition: "all 0.2s",
                }}
                aria-hidden="true"
              >
                {state === "completed" ? (
                  <CheckIcon sx={{ fontSize: 16, color: circleStyle.color }} />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      color: circleStyle.color,
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </Typography>
                )}
              </Box>

              {/* 연결선 */}
              {!isLast && (
                <Box
                  aria-hidden="true"
                  sx={
                    isHorizontal
                      ? {
                          flex: 1,
                          height: CONNECTOR_THICKNESS,
                          bgcolor: connectorCompleted ? GOV_BLUE : "#D1D5DB",
                          transition: "background-color 0.3s",
                        }
                      : {
                          width: CONNECTOR_THICKNESS,
                          height: 28,
                          ml: `${(CIRCLE_SIZE - CONNECTOR_THICKNESS) / 2}px`,
                          bgcolor: connectorCompleted ? GOV_BLUE : "#D1D5DB",
                          transition: "background-color 0.3s",
                        }
                  }
                />
              )}
            </Box>

            {/* 레이블 영역 */}
            <Box
              sx={
                isHorizontal
                  ? { textAlign: "center", mt: 0.75, px: 0.5, width: "100%" }
                  : { ml: 1.25, mt: 0.25, mb: !isLast ? 1 : 0 }
              }
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8125rem",
                  fontWeight: state === "active" ? 700 : 400,
                  color: LABEL_COLOR[state],
                  lineHeight: 1.4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {step.label}
                {step.optional && (
                  <Typography
                    component="span"
                    sx={{ fontSize: "0.6875rem", color: "text.disabled", ml: 0.5 }}
                  >
                    {step.optionalLabel ?? "(선택)"}
                  </Typography>
                )}
              </Typography>
              {step.description && (
                <Typography
                  variant="caption"
                  sx={{ color: "text.disabled", display: "block", mt: 0.25 }}
                >
                  {step.description}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
