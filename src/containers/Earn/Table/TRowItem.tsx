import { Td } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  value: string;
  width?: string;
}

const TRowItem: FC<Props> = ({
  value,
  width = "auto",
}) => {
  return (
    <Td width={width}>{value}</Td>
  );
};

export default TRowItem;
