import { StyleConfig } from "@chakra-ui/react";

import { mode } from "@/utils/theme";

import { palette } from "../palette";

export const buttonStyle: StyleConfig = {
  defaultProps: {
    variant: "primary",
  },
  variants: {
    insideInput: ({ colorMode }) => ({
      backgroundColor: mode(
        colorMode,
        palette.colors.primary[300],
        palette.colors.primary["300.dark"]
      ),
      borderColor: mode(
        colorMode,
        palette.colors.primary[300],
        palette.colors.primary["300.dark"]
      ),
      borderWidth: "1px",
      _disabled: {
        backgroundColor: "transparent",
        borderColor: mode(
          colorMode,
          palette.colors.primary[300],
          palette.colors.primary["300.dark"]
        ),
      },
    }),
    primary: {
      backgroundColor: "tomato",
    },
  },
};
