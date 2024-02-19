import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ThemeProvider } from 'styled-components';
import { ConnectButton, Theme } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { type FC, Fragment } from "react";

import {
  ThreeDot as ThreeDotIcon,
  Book as BookIcon,
} from "@/assets/svgs";
import { useColorMode } from "@/hooks/useColorMode";
import classNames from "classnames";

// import { ThemeSwitch } from "./theme-switch";

interface Props {
  onSetSidebarOpen: (open: boolean) => void;
}
const theme = {
  colors: {
    primary: 'red',
  },
};
const Navbar: FC<Props> = () => {
  return (
    <nav>
      <div className="flex items-center w-full px-12 my-5">
        <div
          style={{
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center">
          <ThemeProvider theme={theme}>
            <ConnectButton chainStatus="full"/>
          </ThemeProvider>
          </div>
          <div className="hidden sm:flex">

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<ThreeDotIcon width={34} height={34} />}
                variant="solid"
              />
              <MenuList
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MenuItem
                  style={{
                    width: "95%",
                    border: "transparent",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "black"
                  }}
                >
                <Link href="https://your-link.com" target="_blank">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        padding: "5px",
                      }}
                    >
                      <BookIcon width={24} height={24} />
                    </span>
                    <span>Docs</span>
                  </div>
                    </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
