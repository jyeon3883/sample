import MuiBox from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import { Button } from "../Button";
import { Typography } from "../Typography";
import type { FooterProps } from "./Footer.types";

export type { FooterProps };

export function Footer({
  quickItems = [],
  logoAlt = "KRDS - Korea Design System",
  address,
  csItems = [],
  goLinks = [],
  snsItems = [],
  bottomMenus = [],
  copyright,
  identifierText,
  identifierLogoAlt = "KRDS - Korea Design System",
}: FooterProps) {
  return (
    <MuiBox
      component="footer"
      id="krds-footer"
      sx={{ bgcolor: "grey.100", borderTop: "1px solid", borderColor: "divider" }}
    >
      {/* 관련 사이트 퀵 링크 */}
      {quickItems.length > 0 && (
        <MuiBox
          className="foot-quick"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "grey.200",
          }}
        >
          <MuiBox
            className="inner"
            sx={{
              maxWidth: 1200,
              mx: "auto",
              px: 3,
              py: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {quickItems.map((item, idx) => (
              <Button
                key={idx}
                component="a"
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                variant="text"
                size="small"
                sx={{ color: "text.secondary", fontSize: "0.875rem" }}
              >
                {item.label}
              </Button>
            ))}
          </MuiBox>
        </MuiBox>
      )}

      {/* 본문 영역 */}
      <MuiBox
        className="inner"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 3,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* 로고 */}
        <MuiBox className="f-logo">
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ fontSize: "1rem", color: "text.primary" }}
          >
            <span className="sr-only">{logoAlt}</span>
          </Typography>
        </MuiBox>

        {/* 정보 + 링크 */}
        <MuiBox
          className="f-cnt"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          {/* 주소 + 고객센터 */}
          <MuiBox className="f-info" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {address && (
              <Typography variant="body2" color="text.secondary" className="info-addr">
                {address}
              </Typography>
            )}
            {csItems.length > 0 && (
              <MuiBox
                component="ul"
                className="info-cs"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                {csItems.map((cs, idx) => (
                  <MuiBox component="li" key={idx}>
                    <Typography component="strong" variant="body2" fontWeight={700} sx={{ mr: 1 }}>
                      {cs.strong}
                    </Typography>
                    {cs.description && (
                      <Typography component="span" variant="body2" color="text.secondary">
                        {cs.description}
                      </Typography>
                    )}
                  </MuiBox>
                ))}
              </MuiBox>
            )}
          </MuiBox>

          {/* 바로가기 + SNS */}
          <MuiBox className="f-link" sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* 바로가기 링크 */}
            {goLinks.length > 0 && (
              <MuiBox className="link-go" sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {goLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    component="a"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    variant="text"
                    size="small"
                    sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                  >
                    {link.label}
                  </Button>
                ))}
              </MuiBox>
            )}

            {/* SNS 링크 */}
            {snsItems.length > 0 && (
              <MuiBox className="link-sns" sx={{ display: "flex", gap: 1 }}>
                {snsItems.map((sns, idx) => (
                  <MuiBox
                    key={idx}
                    component="a"
                    href={sns.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sns.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "text.primary", borderColor: "text.primary" },
                    }}
                  >
                    {sns.icon}
                  </MuiBox>
                ))}
              </MuiBox>
            )}
          </MuiBox>
        </MuiBox>

        <MuiDivider />

        {/* 하단 메뉴 + 저작권 + 식별 배너 */}
        <MuiBox
          className="f-btm"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 2,
          }}
        >
          <MuiBox className="f-btm-text" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* 하단 메뉴 */}
            {bottomMenus.length > 0 && (
              <MuiBox className="f-menu" sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {bottomMenus.map((menu, idx) => (
                  <Typography
                    key={idx}
                    component="a"
                    href={menu.href}
                    variant="body2"
                    sx={{
                      color: menu.highlight ? "text.primary" : "text.secondary",
                      fontWeight: menu.highlight ? 700 : 400,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {menu.label}
                  </Typography>
                ))}
              </MuiBox>
            )}

            {/* 저작권 */}
            {copyright && (
              <Typography variant="caption" color="text.secondary" className="f-copy">
                {copyright}
              </Typography>
            )}
          </MuiBox>

          {/* 식별 배너 */}
          {identifierText && (
            <MuiBox
              className="krds-identifier"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
              }}
            >
              <MuiBox
                component="span"
                className="logo"
                sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.primary" }}
              >
                <span className="sr-only">{identifierLogoAlt}</span>
              </MuiBox>
              <Typography variant="caption" color="text.secondary" className="ban-txt">
                {identifierText}
              </Typography>
            </MuiBox>
          )}
        </MuiBox>
      </MuiBox>
    </MuiBox>
  );
}
