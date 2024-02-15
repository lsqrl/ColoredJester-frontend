import { Button, Td, Text, Tr } from "@chakra-ui/react";
import classNames from "classnames";
import { FC } from "react";
import TokenIcon from "@/components/TokenIcon";
import { Pool } from "@/types";


import TRowItem from "./TRowItem";

interface Props {
  idx: number;
  pool : Pool;
}

const icons = ["USDC", "EUR", "BTC", "ETH"];
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const TRow: FC<Props> = ({
  pool,
  idx
}) => {
  return (
    <Tr
      className={classNames([
        "cursor-pointer",
        "hover:bg-primary-200",
        "border-b border-primary-400"
      ])}
    >
      <Td width="15%">
        <div className="flex items-center gap-2">
          <Text>{icons[idx]}</Text>
          <TokenIcon name={icons[idx]} height={32} width={32} />
        </div>
      </Td>
      <Td width="15%"> 
        {pool.tvl ? formatter.format(pool.tvl) : "-"}
      </Td>
      <TRowItem
        value={pool.estApy ? pool.estApy : "-"}
      />
      <TRowItem
        width="20%"
        value={pool.histApy ? pool.histApy : "-"}
      />
      <TRowItem
        width="15%"
        value={pool.utilization ? pool.utilization : "-"}
      />
      <Td>
          <Button
            fontSize="sm"
            fontWeight="normal"
            style={{
              borderRadius: "10px",
              padding: "0px 10px",
            }}
            variant="outline"
          >
            Deposit
          </Button>
      </Td>
    </Tr>
  );
};

export default TRow;
