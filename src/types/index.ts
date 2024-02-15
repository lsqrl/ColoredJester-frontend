import { Address } from "viem";

export type viewTypes = "Active" | "Closed";

export type VoidNoArgs = () => void;

export type PromiseVoidNoArgs = () => Promise<void>;

export interface PositionsDetailItemType {
  title: string;
  value: string | number | string[] | number[];
  prefix?: string;
  postfix?: string | string[];
  postfixIcon?: React.ReactElement | React.ReactElement[];
  postfixStyle?: React.CSSProperties;
  prefixStyle?: React.CSSProperties;
}

export interface ChartDataPoint {
  date: Date;
  tvl: number;
  apy: number;
}

export type AssetName =
  | "USDC"
  | "USDT"
  | "WETH"
  | "WBTC"
  | "DAI"

export type ITokenName = `i${AssetName}`;

export interface ChartPoint {
  timestamp: Date;
  tvlUsd: number;
  apyBase: number;
}

export type Asset = {
  name: AssetName;
  label: string;
  description: string;
  coingeckoId: string;
  iconName: string;
  decimals: number;
  tokenAddress: Address;
  oracleAddress: Address;
  vaultAddress: Address;
  callOptionAddress: Address;
  aaveCollateralTokenAddress: Address;
  gmxCollateralTokenAddress: Address;
  iTokenAddress: Address;
};

export type AssetEssential = Pick<
  Asset,
  "name" | "label" | "decimals" | "tokenAddress" | "coingeckoId" | "iconName"
>;

export interface PageHeading {
  pathName: string;
  heading: string;
}

export type CloseDialogFn = VoidNoArgs;

export interface TokenModalOptions {
  assets: Asset[];
  isClosable: boolean;
  onSelectTokenCallback: () => void;
  returnPath: string;
}

export type Pool = {
  // token: Asset;
  token: string;
  tvl?: number;
  estApy?: string;
  histApy?: string;
  utilization?: string;
};

export type Pools = Pool[];

export type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type OpenTokenDialogFn = (
  assets: Asset[],
) => void;