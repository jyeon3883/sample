import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { Header } from "./Header";
import type { GnbMenu, UtilityItem } from "./Header.types";

const meta = {
  title: "Atoms/Header",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleUtility: UtilityItem[] = [
  {
    type: "link",
    label: "공지사항",
    href: "#",
    external: true,
  },
  {
    type: "language",
    languages: [
      { code: "ko", label: "한국어" },
      { code: "en", label: "English" },
    ],
    currentLanguage: "ko",
    onLanguageChange: (code) => alert(`언어 변경: ${code}`),
  },
  {
    type: "resize",
    currentScale: "md",
    onScaleChange: (scale) => alert(`크기 변경: ${scale}`),
    onReset: () => alert("초기화"),
  },
];

const sampleGnb: GnbMenu[] = [
  {
    label: "소개",
    subMenus: [
      {
        label: "기관 소개",
        items: [
          { label: "연혁", href: "#" },
          { label: "조직도", href: "#" },
        ],
        bannerBadge: "신규 서비스",
        bannerLabel: "바로가기",
        onBannerClick: () => alert("배너 클릭"),
      },
    ],
  },
  {
    label: "서비스",
    subMenus: [
      {
        label: "온라인 신청",
        items: [
          { label: "서비스 A", href: "#" },
          { label: "서비스 B", href: "#" },
          { label: "서비스 C", href: "#" },
        ],
      },
      {
        label: "오프라인 신청",
        items: [
          { label: "서비스 D", href: "#" },
          { label: "서비스 E", href: "#" },
        ],
      },
    ],
  },
  {
    label: "자료실",
    subMenus: [
      {
        label: "공지사항",
        items: [{ label: "공지사항 목록", href: "#" }],
      },
    ],
  },
  { label: "링크", href: "#" },
];

// 기본 (비로그인)
export const Default: Story = {
  render: () => (
    <Header
      utilityItems={sampleUtility}
      gnbMenus={sampleGnb}
      onSearchClick={() => alert("검색")}
      onLoginClick={() => alert("로그인")}
      onJoinClick={() => alert("회원가입")}
    />
  ),
};

// 로그인 상태
export const LoggedIn: Story = {
  render: () => (
    <Header
      utilityItems={sampleUtility}
      gnbMenus={sampleGnb}
      isLoggedIn
      userInfo={{
        name: "홍길동",
        remainingTime: "12:00",
        onExtendTime: () => alert("시간 연장"),
        onLogout: () => alert("로그아웃"),
        myMenuItems: [
          { label: "나의 GOV 홈", href: "#" },
          { label: "나의 신청내역", href: "#" },
          { label: "나의 생활정보", href: "#" },
          { label: "나의 정보관리", href: "#" },
        ],
      }}
      onSearchClick={() => alert("검색")}
    />
  ),
};

// GNB 없음
export const WithoutGnb: Story = {
  render: () => (
    <Header
      utilityItems={sampleUtility}
      onSearchClick={() => alert("검색")}
      onLoginClick={() => alert("로그인")}
      onJoinClick={() => alert("회원가입")}
    />
  ),
};

// 모든 상태 한눈에 보기
export const AllStates: Story = {
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>비로그인</h4>
        <Header
          utilityItems={sampleUtility}
          gnbMenus={sampleGnb}
          onSearchClick={() => alert("검색")}
          onLoginClick={() => alert("로그인")}
          onJoinClick={() => alert("회원가입")}
        />
      </Box>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>로그인</h4>
        <Header
          utilityItems={sampleUtility}
          gnbMenus={sampleGnb}
          isLoggedIn
          userInfo={{
            name: "홍길동",
            remainingTime: "12:00",
            onExtendTime: () => alert("시간 연장"),
            onLogout: () => alert("로그아웃"),
            myMenuItems: [
              { label: "나의 GOV 홈", href: "#" },
              { label: "나의 신청내역", href: "#" },
            ],
          }}
          onSearchClick={() => alert("검색")}
        />
      </Box>
      <Box>
        <h4 style={{ margin: "0 0 8px" }}>GNB 없음</h4>
        <Header
          utilityItems={sampleUtility}
          onSearchClick={() => alert("검색")}
          onLoginClick={() => alert("로그인")}
          onJoinClick={() => alert("회원가입")}
        />
      </Box>
    </Box>
  ),
};
