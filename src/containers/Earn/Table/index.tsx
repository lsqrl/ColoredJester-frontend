import {
    Table as DefaultTable,
    TableContainer,
    Tbody,
  } from "@chakra-ui/react";
  import { ArrowForwardIcon } from '@chakra-ui/icons';

  import { Fragment, useState } from "react";

  import classNames from "classnames";
    
  import TRow from "./TRow";
  import Thead from "./THead";
  
  type Columns = "asset" | "tvl" | "apy" | "hpy" | "utilization" | "info";
  
  const columns: Array<{
    text: string;
    key: Columns;
    tooltip?: string;
    hideText?: boolean;
    className?: string;
  }> = [
    { text: "", key: "asset" },
    {
      text: "Pool TVL (USDC)",
      key: "tvl",
      tooltip: "Total value locked, how many tokens have been deposited",
    },
    {
      text: "Estimated APY",
      key: "apy",
      tooltip: "Estimated annual percentage yield, how much you can earn in a year",
    },
    {
      text: "APY Last 30 Days",
      key: "hpy",
      tooltip: "APY over the last 30 days, how much you would have earned in the last 30 days",
    },
    {
      text: "Pool Utilization",
      key: "utilization",
      tooltip: "How much of the pool is being used, how much of the pool is being borrowed",
    },
    { text: "", key: "info" },
  ];
  const Table = () => {
    const data = [2105212734, 595272194, 327294454, 152577194];
    const pools = [
      {
        token: "USDC",
        tvl: 2105212734,
        estApy: "11.83%",
        histApy: "10.71%",
        utilization: "65%"
      },
      {
        token: "EUR",
        tvl: 595272194,
        estApy: "13.45%",
        histApy: "12.75%",
        utilization: "35%"
      },
      {
        token: "BTC",
        tvl: 327294454,
        estApy: "17.45%",
        histApy: "15.90%",
        utilization: "75%"
      },
      {
        token: "ETH",
        tvl: 152577194,
        estApy: "21.13%",
        histApy: "18.26%",
        utilization: "55%"
      }
    ];
  
    return (
      <TableContainer className="w-full rounded-xl bg-gray-800 lg:p-6">
        <div className={classNames([
          "flex justify-between items-center",
          "mb-4",
          "border-b-4 border-primary-400",
          "pb-5"
          ])}>
          <h1 className={classNames([
            "text-3xl font-bold"])}>Liquidity Pools</h1>
          <button className={classNames([
              "border-green-500 border-2",
              " text-white font-bold",
              "py-2 px-4 rounded", 
              "flex items-center", "text-lg bg-transparent", 
              "hover:bg-green-500 hover:text-white"])}>
            Your Dashboard
            <ArrowForwardIcon ml={5} boxSize={6} />
          </button>
        </div>
        <DefaultTable size="md">
          <Thead columns={columns} />
          <Tbody>
            {data?.map((value: number, idx) => (
              <Fragment key={idx}>
                <TRow
                  pool={pools[idx]}
                  idx={idx}
                />
              </Fragment>
            ))}
          </Tbody>
        </DefaultTable>
      </TableContainer>
    );
  };
  
  export default Table;
  