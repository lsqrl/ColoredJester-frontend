import "@chakra-ui/react";
import { type FC } from "react";
import Switch from "react-switch";

import { useColorMode } from "@/hooks/useColorMode";
import { type PropsWithClassName } from "@/types/components.types";

export const ThemeSwitch: FC<PropsWithClassName> = ({ className }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      className={className}
      onChange={toggleColorMode}
      uncheckedIcon={
        <div className="flex justify-center items-center [height:100%]">
          Switch Dark Icon Here
        </div>
      }
      checkedIcon={
        <div className="flex justify-center items-center [height:100%]">
          Switch Light Icon Here
        </div>
      }
      checked={colorMode === "light"}
      onColor="#F2F5F6"
      offColor="#20293A"
      onHandleColor="#FB8E51"
      offHandleColor="#F3E7A8"
    />
  );
};
