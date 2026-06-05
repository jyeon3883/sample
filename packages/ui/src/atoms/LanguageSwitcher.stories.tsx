import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Box from "@mui/material/Box";

const meta = {
  title: "Atoms/LanguageSwitcher",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English (영어)" },
  { code: "zh", label: "中文 (중국어)" },
  { code: "ja", label: "日本語 (일본어)" },
  { code: "fr", label: "français (프랑스어)" },
];

const languagesWithNewWindow = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English (영어)", isNewWindow: true },
  { code: "zh", label: "中文 (중국어)", isNewWindow: true },
  { code: "ja", label: "日本語 (일본어)", isNewWindow: true },
  { code: "fr", label: "français (프랑스어)", isNewWindow: true },
];

/**
 * 기본 버전 - 현재 선택된 언어를 드롭다운 메뉴 상단에 표시
 */
export const Basic: Story = {
  render: () => {
    const [currentLang, setCurrentLang] = useState("ko");

    return (
      <Box>
        <h3>기본 언어 선택기</h3>
        <LanguageSwitcher
          languages={languages}
          currentLanguage={currentLang}
          showCurrentLanguage={true}
          onLanguageChange={(code) => {
            setCurrentLang(code);
            console.log("Language changed to:", code);
          }}
        />
        <Box sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
          <p>
            현재 언어: <strong>{currentLang}</strong>
          </p>
        </Box>
      </Box>
    );
  },
};

/**
 * 새창 오픈 버전 - 언어 선택 시 해당 언어가 적용된 새창이 열림
 */
export const OpenInNewWindow: Story = {
  render: () => {
    const [currentLang, setCurrentLang] = useState("ko");

    const handleLanguageChange = (code: string) => {
      // 새로운 언어로 새창 열기
      if (code !== currentLang) {
        // 예시: 기본 URL에 lang 쿼리 파라미터 추가
        const newUrl = `${window.location.origin}?lang=${code}`;
        window.open(newUrl, "_blank");
      }
    };

    return (
      <Box>
        <h3>새창 오픈 언어 선택기</h3>
        <LanguageSwitcher
          languages={languagesWithNewWindow}
          currentLanguage={currentLang}
          showCurrentLanguage={true}
          onLanguageChange={handleLanguageChange}
        />
        <Box sx={{ mt: 3, p: 2, backgroundColor: "#fff3cd", borderRadius: 1 }}>
          <p>
            현재 언어: <strong>{currentLang}</strong>
          </p>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            💡 선택한 언어로 새창이 열립니다 (현재 언어 제외)
          </p>
        </Box>
      </Box>
    );
  },
};
