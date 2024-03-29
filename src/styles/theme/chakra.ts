import {
  type ThemeConfig,
  extendTheme,
  withDefaultVariant,
} from "@chakra-ui/react";

import { mode } from "@/utils/theme";

import {
  buttonStyle,
  headingStyle,
  inputStyle,
  tableStyle,
  tooltipStyle,
} from "./components";
import { palette } from "./palette";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

export const theme = extendTheme(
  {
    config,
    colors: palette.colors,
    components: {
      Button: buttonStyle,
      Heading: headingStyle,
      Input: inputStyle,
      Table: tableStyle,
      Tooltip: tooltipStyle,
    },
    fonts: {
      body: "var(--font-body)",
      heading: "var(--font-heading)",
    },
    styles: {
      global: ({ colorMode }: any) => ({
        body: {
          background: "linear-gradient(to bottom, rgb(14, 142, 227), rgb(122, 165, 133))",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          color: mode(
            colorMode,
            palette.font["main"],
            palette.font["main.dark"]
          ),
        },
      }),
    },
    textStyles: {
      lg: {
        fontSize: ["20px"],
        fontWeight: "600",
        lineHeight: "150%",
      },
      md: {
        fontSize: ["16px"],
        fontWeight: "500",
        lineHeight: "150%",
      },
      md2: {
        fontSize: ["18px"],
        fontWeight: "normal",
        lineHeight: "150%",
      },
      "slender-md": {
        fontFamily: "system-ui",
        fontSize: ["18px"],
        fontWeight: "600",
        lineHeight: "150%",
      },
      // "slender" is Poppins
      "slender-sm": {
        fontFamily: "system-ui",
        fontSize: ["14px"],
        fontWeight: "700",
        lineHeight: "150%",
      },
      "slender-sm2": {
        fontFamily: "system-ui",
        fontSize: ["14px", "14px", "16px"],
        fontWeight: "500",
        lineHeight: "150%",
      },
      sm: {
        fontSize: ["14px"],
        fontWeight: "normal",
        lineHeight: "150%",
      },
    },
  },
  withDefaultVariant({
    variant: "",
    components: ["Table"],
  })
);
