import type { Preview } from "@storybook/react-vite";
import { UiThemeProvider } from "../src/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <UiThemeProvider>
        <Story />
      </UiThemeProvider>
    ),
  ],
};

export default preview;
