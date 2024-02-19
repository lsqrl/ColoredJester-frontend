// const mobileHiddenColumnClass = "hidden md:table-cell";
import { FC, useEffect, useState } from "react";

import classNames from "classnames";
import { Box, Image, Input, Link, InputGroup, Text, Stack } from "@chakra-ui/react";
import ABI from '../../contracts/greaterFool.abi'

import { Button, ButtonGroup } from '@chakra-ui/react';
import { useAccount, usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction, erc20ABI } from "wagmi";

import { GreaterFool, Discord } from '@/assets/svgs'; 

import { ethers } from "ethers";

const EarnContainer: FC = () => {

  const BigNumber = require('bignumber.js');

  const [isButtonBuyClicked, setButtonBuyClicked] = useState(false);
  const [isButtonRedeemClicked, setButtonRedeemClicked] = useState(false);

  const [buyAmount, setBuyAmount] = useState(BigInt(0));
  const [maxIn, setMaxIn] = useState(BigInt(0));
  const [redeemAmount, setRedeemAmount] = useState(BigInt(0));
  const [minOut, setMinOut] = useState(BigInt(0));

  const [previewBuyAmount, setPreviewBuyAmount] = useState<bigint | undefined>(undefined);
  const [previewRedeemAmount, setPreviewRedeemAmount] = useState<bigint | undefined>(undefined);

  const [signerUnderlyingAllowance, setSignerUnderlyingAllowance] = useState<bigint | undefined>(undefined);
  const [signerUnderlyingBalance, setSignerUnderlyingBalance] = useState<bigint | undefined>(undefined);
  const [signerTokenBalance, setSignerTokenBalance] = useState<bigint | undefined>(undefined);

  const [bidPrice, setBidPrice] = useState(BigInt(0));

  const { isConnected, address: signerAddress } = useAccount();

  const CONTRACT_ADDRESS = "0xa47af34E766b2f71f97D27A48075d5b78d20D474";
  const UNDERLYING_ADDRESS = "0xfbB10b48f10Aad0E2D69463E93a563965993cA54";

  const { config : configBuy } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "buy",
    args: [buyAmount, maxIn],
  });

  const { config : configRedeem } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "redeem",
    args: [redeemAmount, minOut],
  });

  const { config : configApproveUnderlying } = usePrepareContractWrite({
    address: UNDERLYING_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [CONTRACT_ADDRESS, maxIn],
  });

  const { config : configApproveToken } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "approve",
    args: [CONTRACT_ADDRESS, redeemAmount],
  });

  const { data: buyData, write : buy, isLoading: isBuyLoading, isSuccess: isBuySuccess } = useContractWrite(configBuy);

  const { data: redeemData, write : redeem, isLoading: isRedeemLoading, isSuccess: isRedeemSuccess } = useContractWrite(configRedeem);

  const { data: approveUnderlyingData, write : approveUnderlying, isLoading: isApproveUnderlyingLoading, isSuccess: isApproveUnderlyingSuccess } = useContractWrite(configApproveUnderlying);

  const { isSuccess : buySuccess } = useWaitForTransaction({
    hash: buyData?.hash,
  });

  const { isSuccess : redeemSuccess } = useWaitForTransaction({
    hash: redeemData?.hash,
  });

  const { isSuccess : approveUnderlyingSuccess } = useWaitForTransaction({
    hash: approveUnderlyingData?.hash,
  });

  const isApproved = approveUnderlyingSuccess || (signerUnderlyingAllowance && signerUnderlyingAllowance >= maxIn);

  const {data : previewBuyData, refetch : refetchPreviewBuy } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi : ABI,
    functionName: "previewBuy",
    args: [buyAmount],
    watch: true
  });

  const { data : previewRedeemData, refetch : refetchPreviewRedeem } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi : ABI,
    functionName: "previewRedeem",
    args: [redeemAmount],
    watch: true
  });

  const { data : signerUnderlyingAllowanceData, refetch : refetchSignerUnderlyingAllowance } = useContractRead({
    address: UNDERLYING_ADDRESS,
    abi : erc20ABI,
    functionName: "allowance",
    args: [signerAddress!, CONTRACT_ADDRESS],
    watch: true
  });

  const { data : signerUnderlyingBalanceData, refetch : refetchSignerUnderlyingBalance } = useContractRead({
    address: UNDERLYING_ADDRESS,
    abi : erc20ABI,
    functionName: "balanceOf",
    args: [signerAddress!],
    watch: true
  });

  const { data : signerTokenBalanceData, refetch : refetchSignerTokenBalance } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi : ABI,
    functionName: "balanceOf",
    args: [signerAddress!],
    watch: true
  });

  const { data : bidPriceData, refetch : refetchBidPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi : ABI,
    functionName: "bidPrice",
    watch: true
  });

  const isBuyButtonDisabled = isBuyLoading || !isConnected || signerUnderlyingBalance! < maxIn || buyAmount === BigInt(0);

  useEffect(() => {
    setMaxIn(previewBuyData?.[0] ? previewBuyData[0] * BigInt(105) / BigInt(100) : BigInt(0));
    setMinOut(previewRedeemData?.[0] ? previewRedeemData[0] * BigInt(95) / BigInt(100) : BigInt(0));
    setMinOut(minOut);
    setSignerUnderlyingAllowance(signerUnderlyingAllowanceData);
    setSignerUnderlyingBalance(signerUnderlyingBalanceData);
    setSignerTokenBalance(signerTokenBalanceData);
    setPreviewBuyAmount(previewBuyData?.[0]);
    setPreviewRedeemAmount(previewRedeemData?.[0]);
    setBidPrice(bidPriceData ? bidPriceData : BigInt(0));
  }, [previewBuyData, 
      previewRedeemData, 
      signerUnderlyingAllowanceData, 
      signerUnderlyingBalanceData, 
      signerTokenBalanceData,
      bidPriceData]);

  return (
    <Box className={classNames([
      "flex flex-col", 
      "items-center justify-center w-full min-h-screen", 
      "w-2/4 h-1/2",
      "p-3 mx-auto font-sans gap-30",
      "font-mono"
      ])}
      marginTop="-100px"><Box 
      width={{ base: "1000px", md: "1500px" }} 
    >
      <GreaterFool />
</Box>
        
        <Box maxW={{ base: "90%", md: "300px" }} mt={-2} mb={80} position="relative">
        <Text 
          width="100%"
          textAlign="center" 
          marginTop="2"
          whiteSpace="nowrap">Current GFOOL price: {Number(ethers.formatUnits(bidPrice, 18)).toFixed(4)} USDC</Text>
        <ButtonGroup isAttached variant="outline" marginBottom={2}>
          <Button
            backgroundColor={isButtonBuyClicked ? "darkgreen" : "gray"}
            _hover={{ backgroundColor: isButtonBuyClicked ? "darkgreen" : "gray" }}
            onClick={() => {setButtonBuyClicked(true); setButtonRedeemClicked(false)}}
          >Buy</Button>
          <Button
            backgroundColor={isButtonRedeemClicked ? "darkred" : "gray"}
            _hover={{ backgroundColor: isButtonRedeemClicked ? "darkdarkred" : "gray" }}
            onClick={() => {setButtonRedeemClicked(true); setButtonBuyClicked(false)}}
          >Redeem</Button>
        </ButtonGroup>

        <InputGroup>
          <div className="input-with-unit-wrapper">
            <Input placeholder="0.00" type="number" paddingRight="50px" 
              backgroundColor="#f0f0f0" color="black"
              onChange={(e) => {
                const stringValue = e.target.value;
                const trimmedValue = stringValue.endsWith(".") ? stringValue.slice(0, -1) : stringValue;
                if(trimmedValue.length > 0) {
                setBuyAmount(ethers.parseEther(trimmedValue)); 
                setRedeemAmount(ethers.parseEther(trimmedValue))
              } 
              }}
              />
          </div>
        </InputGroup>
          {(isButtonBuyClicked || isButtonRedeemClicked) && (
            <Button 
              width="100%" 
              marginTop="2"
              backgroundColor={isBuyButtonDisabled ? "gray" : "darkgreen"}
              _hover={{ backgroundColor: isBuyButtonDisabled ? "gray" : "green" }}
              isDisabled={isBuyButtonDisabled}
              onClick={() => isButtonBuyClicked ? buy?.() : redeem?.()}
            >
              {isButtonBuyClicked ? signerUnderlyingBalance! < maxIn ? "Insufficient USDC balance" :
                (signerUnderlyingAllowance! < maxIn ? "Approve USDC"  : "Buy") : "Redeem"}
            </Button>)}
            {(isButtonBuyClicked || isButtonRedeemClicked) && (
              <Text 
                width="100%"
                textAlign="center" 
                marginTop="2"
                whiteSpace="nowrap"
              >
                {isButtonBuyClicked ? "You will receive " : "You will redeem "} 
                {isButtonBuyClicked ? ethers.formatUnits(buyAmount,18) : ethers.formatUnits(redeemAmount,18)} GFOOL tokens
              </Text>
              )}
              
            {(isButtonBuyClicked || isButtonRedeemClicked) && (
              <Text 
                width="100%"
                textAlign="center" 
                marginTop="2"
                whiteSpace="nowrap"
              >
                {isButtonBuyClicked ? "You will spend " : "You will get "} 
                {isButtonBuyClicked ? Number(ethers.formatUnits(previewBuyAmount ? previewBuyAmount : 0 ,18)).toFixed(4) : 
                  Number(ethers.formatUnits(previewRedeemAmount ? previewRedeemAmount : 0 ,18)).toFixed(4)} USDC
              </Text>
              )}
        </Box>
        <Box as="footer" width="100%" position="fixed" bottom="0" p={{ base: "2", md: "4" }} bg="rgb(14, 142, 227)">
        <Stack direction={{ base: "column", md: "row" }} spacing="3" align="center">
          <Text textAlign="center">Follow us on{" "}
            <Link href="https://discord.com" isExternal color="yellow.500">
              Discord
            </Link>
            ,{" "}
            <Link href="https://discord.com" isExternal color="yellow.500">
              Telegram
            </Link>
            {" "}and{" "}
            <Link href="https://discord.com" isExternal color="yellow.500">
              X (Twitter)
            </Link>
          </Text>
        </Stack>
        </Box>
    </Box>
  );
};

export default EarnContainer;
