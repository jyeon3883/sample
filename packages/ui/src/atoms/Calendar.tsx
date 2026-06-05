"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import { useMemo, useState } from "react";

export interface CalendarProps {
    value?: Date | null;
    onChange?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    disablePast?: boolean;
    disableFuture?: boolean;
    shouldDisableDate?: (date: Date) => boolean;
    sx?: SxProps<Theme>;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const GOV_BLUE = "#004EA2";
const GOV_BLUE_DARK = "#003A7A";
const GOV_BLUE_BG = "#EEF3FB";

function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export function Calendar({
    value,
    onChange,
    minDate,
    maxDate,
    disablePast = false,
    disableFuture = false,
    shouldDisableDate,
    sx,
}: CalendarProps) {
    const today = useMemo(() => startOfDay(new Date()), []);

    const [viewDate, setViewDate] = useState(() => {
        const base = value ?? today;
        return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const cells = useMemo(() => {
        const firstDow = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        const items: { date: Date; inactive: boolean }[] = [];

        for (let i = firstDow - 1; i >= 0; i--) {
            items.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inactive: true });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            items.push({ date: new Date(year, month, d), inactive: false });
        }
        const remaining = 42 - items.length;
        for (let d = 1; d <= remaining; d++) {
            items.push({ date: new Date(year, month + 1, d), inactive: true });
        }

        return items;
    }, [year, month]);

    const isDisabled = (date: Date): boolean => {
        const d = startOfDay(date);
        if (disablePast && d < today) return true;
        if (disableFuture && d > today) return true;
        if (minDate && d < startOfDay(minDate)) return true;
        if (maxDate && d > startOfDay(maxDate)) return true;
        return shouldDisableDate?.(date) ?? false;
    };

    const handlePrevYear = () => setViewDate(new Date(year - 1, month, 1));
    const handleNextYear = () => setViewDate(new Date(year + 1, month, 1));
    const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const handleDateClick = (date: Date, inactive: boolean, disabled: boolean) => {
        if (disabled) return;
        if (inactive) setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        onChange?.(date);
    };

    return (
        <Box
            role="application"
            aria-label="달력"
            sx={[
                {
                    width: 320,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    userSelect: "none",
                },
                ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
        >
            {/* ── Header ── */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1.5,
                    py: 1.25,
                    bgcolor: GOV_BLUE,
                    color: "white",
                }}
            >
                {/* Year navigation */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        size="small"
                        onClick={handlePrevYear}
                        aria-label="이전 연도"
                        sx={{ color: "white", p: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography
                        variant="body2"
                        sx={{ minWidth: 40, textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}
                    >
                        {year}년
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={handleNextYear}
                        aria-label="다음 연도"
                        sx={{ color: "white", p: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                {/* Month navigation */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                        size="small"
                        onClick={handlePrevMonth}
                        aria-label="이전 월"
                        sx={{ color: "white", p: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography
                        variant="body2"
                        sx={{ minWidth: 32, textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}
                    >
                        {month + 1}월
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={handleNextMonth}
                        aria-label="다음 월"
                        sx={{ color: "white", p: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* ── Weekday headers ── */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", bgcolor: GOV_BLUE_BG }}>
                {WEEKDAYS.map((label, i) => (
                    <Box key={label} sx={{ py: 0.875, textAlign: "center" }}>
                        <Typography
                            component="span"
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                color: i === 0 ? "#C62828" : i === 6 ? "#1565C0" : "text.secondary",
                            }}
                        >
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* ── Date grid ── */}
            <Box
                sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", p: 1, gap: "2px" }}
                role="grid"
                aria-label={`${year}년 ${month + 1}월`}
            >
                {cells.map(({ date, inactive }, idx) => {
                    const isToday = isSameDay(date, today);
                    const isSelected = value != null && isSameDay(date, value);
                    const disabled = isDisabled(date);
                    const dow = date.getDay();

                    const textColor = isSelected
                        ? "white"
                        : disabled || inactive
                            ? "text.disabled"
                            : dow === 0
                                ? "#C62828"
                                : dow === 6
                                    ? "#1565C0"
                                    : "text.primary";

                    return (
                        <ButtonBase
                            key={idx}
                            role="gridcell"
                            onClick={() => handleDateClick(date, inactive, disabled)}
                            disabled={disabled}
                            aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일${isToday ? " (오늘)" : ""}${isSelected ? ", 선택됨" : ""}`}
                            aria-pressed={isSelected}
                            aria-disabled={disabled}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                aspectRatio: "1",
                                borderRadius: "50%",
                                bgcolor: isSelected ? GOV_BLUE : "transparent",
                                border: isToday && !isSelected ? `2px solid ${GOV_BLUE}` : "2px solid transparent",
                                transition: "background-color 0.15s, border-color 0.15s",
                                "&:hover:not(.Mui-disabled)": {
                                    bgcolor: isSelected ? GOV_BLUE_DARK : `rgba(0,78,162,0.1)`,
                                },
                                "&:focus-visible": {
                                    outline: `2px solid ${GOV_BLUE}`,
                                    outlineOffset: "2px",
                                },
                                "&.Mui-disabled": {
                                    opacity: 0.4,
                                    cursor: "not-allowed",
                                    pointerEvents: "auto",
                                },
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: "0.8125rem",
                                    fontWeight: isToday || isSelected ? 700 : 400,
                                    lineHeight: 1,
                                    color: textColor,
                                }}
                            >
                                {date.getDate()}
                            </Typography>

                            {/* Today dot indicator */}
                            {isToday && !isSelected && (
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 4,
                                        borderRadius: "50%",
                                        bgcolor: GOV_BLUE,
                                        mt: "2px",
                                    }}
                                />
                            )}
                        </ButtonBase>
                    );
                })}
            </Box>
        </Box>
    );
}
