import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Footer } from "./Footer";

const meta = {
  title: "Atoms/Footer",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleProps = {
  quickItems: [
    { label: "related_site", href: "#" },
    { label: "related_site", href: "#" },
    { label: "related_site", href: "#" },
    { label: "related_site", href: "#" },
  ],
  logoAlt: "KRDS - Korea Design System",
  address: "(26464) 강원특별자치도 원주시 건강로 32(반곡동) 국민건강보험공단",
  csItems: [
    { strong: "대표전화 1577-1000", description: "(유료, 평일 09시~18시)" },
    { strong: "해외이용 82-33-811-2001", description: "(유료, 평일 09시~18시)" },
  ],
  goLinks: [
    { label: "찾아오시는 길", href: "#" },
    { label: "이용안내", href: "#" },
    { label: "직원검색", href: "#" },
  ],
  snsItems: [
    { label: "인스타그램", href: "#", icon: <InstagramIcon fontSize="small" /> },
    { label: "유튜브", href: "#", icon: <YouTubeIcon fontSize="small" /> },
    { label: "X", href: "#", icon: <XIcon fontSize="small" /> },
    { label: "페이스북", href: "#", icon: <FacebookIcon fontSize="small" /> },
  ],
  bottomMenus: [
    { label: "개인정보처리방침", href: "#", highlight: true },
    { label: "저작권 정책", href: "#" },
    { label: "웹 접근성 품질인증 마크 획득", href: "#" },
  ],
  copyright: "© 2023 National Health Insurance Service. All rights reserved.",
  identifierText: "이 누리집은 보건복지부 누리집입니다.",
  identifierLogoAlt: "KRDS - Korea Design System",
};

// 기본
export const Default: Story = {
  render: () => <Footer {...sampleProps} />,
};

// 퀵 링크 없음
export const WithoutQuickItems: Story = {
  render: () => <Footer {...sampleProps} quickItems={[]} />,
};

// SNS 없음
export const WithoutSns: Story = {
  render: () => <Footer {...sampleProps} snsItems={[]} />,
};

// 최소 구성
export const Minimal: Story = {
  render: () => (
    <Footer
      copyright="© 2023 National Health Insurance Service. All rights reserved."
      bottomMenus={[
        { label: "개인정보처리방침", href: "#", highlight: true },
        { label: "저작권 정책", href: "#" },
      ]}
    />
  ),
};

// 모든 상태 한눈에 보기
export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>기본</h4>
        <Footer {...sampleProps} />
      </Box>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>퀵 링크 없음</h4>
        <Footer {...sampleProps} quickItems={[]} />
      </Box>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>SNS 없음</h4>
        <Footer {...sampleProps} snsItems={[]} />
      </Box>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>최소 구성</h4>
        <Footer
          copyright="© 2023 National Health Insurance Service. All rights reserved."
          bottomMenus={[{ label: "개인정보처리방침", href: "#", highlight: true }]}
        />
      </Box>
    </Box>
  ),
};
