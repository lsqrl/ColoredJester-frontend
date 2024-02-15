import { Button, Box, Divider, HStack, Td, Tr, useColorModeValue, Menu, MenuButton, MenuItem, MenuList, Modal, ModalOverlay, ModalContent, 
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter, NumberInput, NumberInputField, Text, useDisclosure, VStack } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { useState } from "react";

interface TRowProps {
  bidCall: number;
  askCall: number;
  strike: number;
  bidPut: number;
  askPut: number;
}


const TRow: React.FC<TRowProps> = ({ bidCall, askCall, strike, bidPut, askPut }) => {
    const [isCallHovered, setIsCallHovered] = useState(false);
    const [isPutHovered, setIsPutHovered] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgCall = useColorModeValue(isCallHovered ? "gray.200" : "white", isCallHovered ? "gray.700" : "gray.800");
    const bgPut = useColorModeValue(isPutHovered ? "gray.200" : "white", isPutHovered ? "gray.700" : "gray.800");
  
    return (
        <Tr>
          <Td textAlign="center"
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          bg={bgCall}>
            <Box width="20px" height="20px">
              {isCallHovered && (
                <Button size="sm" p={2} fontSize="15px" onClick={onOpen}>RFQ</Button>
              )}
              </Box>
          </Td>
          <Td textAlign="center"
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          bg={bgCall}>
              <Box color="green.500">{bidCall.toFixed(1)}</Box>
          </Td>
          <Td textAlign="center"
          onMouseEnter={() => setIsCallHovered(true)}
          onMouseLeave={() => setIsCallHovered(false)}
          bg={bgCall}>
              <Box color="red.500">{askCall.toFixed(1)}</Box>
          </Td>
          <Td textAlign="center">
            <Box>{strike.toFixed(4)}</Box>
          </Td>
          <Td textAlign="center"
          onMouseEnter={() => setIsPutHovered(true)}
          onMouseLeave={() => setIsPutHovered(false)}
          bg={bgPut}>
              <Box color="green.500">{bidPut.toFixed(1)}</Box>
          </Td>
          <Td textAlign="center"
          onMouseEnter={() => setIsPutHovered(true)}
          onMouseLeave={() => setIsPutHovered(false)}
          bg={bgPut}>
              <Box color="red.500">{askPut.toFixed(1)}</Box>
          </Td>
          <Td textAlign="center"
          onMouseEnter={() => setIsPutHovered(true)}
          onMouseLeave={() => setIsPutHovered(false)}
          bg={bgPut}>
          <Box width="20px" height="20px">
            {isPutHovered && (
              <Button size="sm" p={2} fontSize="15px" onClick={onOpen}>RFQ</Button>
            )}
            </Box>
          </Td>

          
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>RFQ</ModalHeader>
            <Divider />
            <ModalCloseButton />
            <ModalBody p = {0}>
            <VStack spacing={4} divider={<Divider />} width="100%">
              <HStack spacing={4} width="100%">
                <Box width="50%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                  <VStack spacing={3}>
                  <Text fontSize="sm">Notional CCY</Text>
                  <Menu>
                      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>MEX</MenuButton>
                      <MenuList>
                        <MenuItem>ETH</MenuItem>
                        <MenuItem>BTC</MenuItem>
                        {/* Add more MenuItem components as needed */}
                      </MenuList>
                    </Menu>  
                    <NumberInput maxW="100px" mt={2}>
                      <NumberInputField placeholder="$0.00" />
                    </NumberInput>
                  </VStack>
                </Box>
                <Box width="50%" display="flex" alignItems="center" justifyContent="center">
                  Section 1.2 content here
                </Box>
              </HStack>
              <Box> Section 2 content here </Box>
              <Box>Section 3 content here </Box>
              <Box>Section 4 content here </Box>
              <Box>Section 5 content here </Box>
            </VStack>
            </ModalBody>
            <ModalFooter>
              Footer here
            </ModalFooter>
          </ModalContent>
        </Modal>

        </Tr>
      );
    };
export default TRow;