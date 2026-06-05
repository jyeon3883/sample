"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  /** 자동 재생 간격 (ms, 기본 3000) */
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  /** 명시하지 않으면 autoPlay가 true일 때 자동 표시 */
  showPlayPause?: boolean;
  sx?: SxProps<Theme>;
}

export function Carousel({
  items,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  showPlayPause,
  sx,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);

  useEffect(() => {
    if (!playing || count <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [playing, interval, next, count]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const displayPlayPause = showPlayPause ?? autoPlay;

  return (
    <Box
      role="region"
      aria-label="캐러셀"
      sx={[{ width: "100%" }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {/* 자동 재생 시 재생/정지 버튼을 첫 번째 인터랙티브 요소로 배치 */}
      {displayPlayPause && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.75 }}>
          <IconButton
            onClick={() => setPlaying((p) => !p)}
            size="small"
            aria-label={playing ? "자동 재생 정지" : "자동 재생 시작"}
            sx={{
              color: "#555",
              border: "1px solid #D0D0D0",
              borderRadius: 1,
              p: 0.5,
              "&:hover": { bgcolor: "#F5F5F5" },
            }}
          >
            {playing
              ? <PauseIcon sx={{ fontSize: 18 }} />
              : <PlayArrowIcon sx={{ fontSize: 18 }} />}
          </IconButton>
        </Box>
      )}

      {/* 슬라이드 트랙 */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        sx={{ position: "relative", overflow: "hidden", borderRadius: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {items.map((item, i) => (
            <Box
              key={item.id}
              role="group"
              aria-roledescription="슬라이드"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={i !== current}
              tabIndex={i !== current ? -1 : undefined}
              sx={{ flex: "0 0 100%", minWidth: 0 }}
            >
              {item.content}
            </Box>
          ))}
        </Box>

        {showArrows && count > 1 && (
          <>
            <IconButton
              onClick={prev}
              aria-label="이전 슬라이드"
              sx={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.35)", color: "white", width: 40, height: 40,
                "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={next}
              aria-label="다음 슬라이드"
              sx={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.35)", color: "white", width: 40, height: 40,
                "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Dot 인디케이터 + 현재/전체 카운터 */}
      {showDots && count > 1 && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, mt: 1.5 }}>
          {items.map((_, i) => (
            <Box
              key={i}
              component="button"
              onClick={() => setCurrent(i)}
              aria-label={`슬라이드 ${i + 1}로 이동`}
              aria-current={i === current ? "true" : undefined}
              sx={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === current ? "#004EA2" : "#C8C8C8",
                border: "none",
                cursor: "pointer",
                p: 0,
                transition: "width 0.3s, background-color 0.3s",
                "&:focus-visible": { outline: "2px solid #004EA2", outlineOffset: 2 },
              }}
            />
          ))}
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, lineHeight: 1 }}>
            {current + 1} / {count}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
