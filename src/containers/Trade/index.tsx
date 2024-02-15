import { Box, Text, Button, Menu, MenuButton, MenuItem, MenuList, HStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FC, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TokenIcon from "@/components/TokenIcon";
import OptionsTable from "./OptionsTable";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionMenuButton = motion(MenuButton);

interface Asset {
  name: string;
  price: number;
  priceVariation: number;
}

const assets: Asset[] = [
  { name: 'USDC', price: 1.0, priceVariation: 0.0},
  { name: 'EUR', price: 1.08, priceVariation: 0.0146 },
  { name: 'BTC', price: 41000, priceVariation: -0.0412},
  { name: 'ETH', price: 2500, priceVariation: 0.0123}
];

const TradeContainer: FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isButtonMoved, setIsButtonMoved] = useState<boolean>(false);

  const handleClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleSelect = (asset: Asset) => {
    setSelectedAsset(asset);
  };
  
  const selectedAssetIcon = useMemo(() => selectedAsset ? <TokenIcon name={selectedAsset?.name} /> : null, [selectedAsset]);

  return (
    <MotionBox display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <AnimatePresence>
        {!selectedAsset && (
          <MotionText
            fontSize="xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Which asset do you want to trade?
          </MotionText>
        )}
      </AnimatePresence>
      <MotionBox display="flex">
        {selectedAsset ? (
          <Menu>
            <MotionMenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="outline"
              borderColor="green"
              initial={{ x: 0, y: 0 }}
              animate={{ x: -500, y: -100 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => setIsButtonMoved(true)}
            >
              <HStack spacing={5}>
                <Box width="20px">{selectedAssetIcon}</Box>
                <Box>{selectedAsset?.name}</Box>
              </HStack>
            </MotionMenuButton>
            <MenuList>
              {assets.filter(asset => asset !== selectedAsset).map(asset => (
                <MenuItem key={asset.name} onClick={() => handleSelect(asset)}>
                  <HStack spacing={5}>
                    <Box width="20px"><TokenIcon name={asset.name} /></Box>
                    <Box>{asset.name}</Box>
                  </HStack>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        ) : (
          assets.map((asset) => (
            <Button
              key={asset.name}
              variant="outline"
              borderColor="green"
              mr={3}
              onClick={() => handleClick(asset)}
            >
              <HStack spacing={5}>
                <Box width="20px"><TokenIcon name={asset.name} /></Box>
                <Box>{asset.name}</Box>
              </HStack>
            </Button>
          ))
        )}
      </MotionBox>
      {isButtonMoved && <OptionsTable 
                          assetName={selectedAsset?.name || undefined}
                          assetPrice={selectedAsset?.price || undefined}
                          priceVariation={selectedAsset?.priceVariation || undefined}
                        />}
    </MotionBox>
  );
};

export default TradeContainer;