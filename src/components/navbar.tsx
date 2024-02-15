import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { Circle } from "phosphor-react";
import { type FC, Fragment } from "react";

import {
  MagicMarker as MagicMarkerIcon,
  ThreeDot as ThreeDotIcon,
  OpusLogo as OpusLogoIcon,
  Discord as DiscordIcon,
} from "@/assets/svgs";
import { HamburgerMenu } from "@/assets/svgs";
import { useColorMode } from "@/hooks/useColorMode";
import classNames from "classnames";

// import { ThemeSwitch } from "./theme-switch";

interface Props {
  onSetSidebarOpen: (open: boolean) => void;
}

const Navbar: FC<Props> = ({ onSetSidebarOpen }) => {
  const { pathname } = useRouter();
  const { mode, colorMode } = useColorMode();


  const handleOpenSideBar = () => onSetSidebarOpen(true);

  const unactiveClassButton = classNames([
    "border-green-500 border-2",
    "text-white font-bold py-2 px-4 rounded",
    "bg-transparent mr-2",
  ])
  const activeClassButton = classNames([
    "bg-green-500 hover:bg-green-700",
    "text-white font-bold py-2 px-4 rounded",
    "ml-2 mr-4",
  ])

  return (
    <nav>
      <div className="flex items-center w-full px-12 my-5">
        <div className="flex flex-grow gap-6">
          <Link href="/earn">
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <div className="flex items-center">
            {/* <Link href="/trade">
              <button 
                className={pathname === '/trade' ? unactiveClassButton : activeClassButton}
                disabled={pathname === '/trade'}  
              >
                Start Trading
              </button>
            </Link> */}
            <ConnectButton chainStatus="full" />
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
                  }}
                  _hover={{
                    backgroundColor: mode("primary.200", "primary.200.dark"),
                  }}
                >
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
                      <MagicMarkerIcon width={24} height={24} />
                    </span>
                    <span>Tutorial</span>
                  </div>
                </MenuItem>
                <MenuItem
                  style={{
                    width: "95%",
                    border: "transparent",
                    padding: "10px 5px",
                    borderRadius: "5px",
                  }}
                  _hover={{
                    backgroundColor: mode("primary.200", "primary.200.dark"),
                  }}
                >
                  {/* <div className="block pr-1">
                    <OpusLogoIcon width={30} height={30} />
                  </div> */}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <Box
          bg={mode("primary.200", "primary.200.dark")}
          style={{
            borderRadius: "50%",
            marginLeft: "10px",
            padding: "5px",
          }}
          className="sm:hidden"
          onClick={handleOpenSideBar}
        >
          <HamburgerMenu width={32} height={32} />
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
