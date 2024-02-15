import { Box, Button, Divider, HStack, VStack, Table, Thead, Tr, Th, Tbody, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { FC, useState } from "react";
import TRow from "./TRow";

interface OptionsTableProps {
    assetName: string | undefined;
    assetPrice: number | undefined;
    priceVariation: number | undefined;
  }

const dates = ['23 Jul 23', '25 Aug 23', '03 Sep 23', '10 Oct 23', '31 Nov 23', '28 Dec 23'];

const initialBidCall = 10; // initial value for bidCall
const initialAskCall = 20; // initial value for askCall
const initialBidPut = 100; // initial value for bidPut
const initialAskPut = 200; // initial value for askPut
const strike = 18.7500; // strike value

let bidCall = initialBidCall;
let askCall = initialAskCall;
let bidPut = initialBidPut;
let askPut = initialAskPut;

const rows : JSX.Element[] = [];


for (let i = 0; i < 13; i++) {
  rows.push(
    <TRow
      key={i}
      bidCall={bidCall}
      askCall={askCall}
      strike={strike - 0.05 * i}
      bidPut={bidPut}
      askPut={askPut}
    />
  );

  // Increase bidCall and askCall by 50%
  bidCall *= 1.5;
  askCall *= 1.5;

  // Decrease bidPut and askPut by 20%
  bidPut *= 0.8;
  askPut *= 0.8;
}

const OptionsTable: FC<OptionsTableProps> = ({ assetName, assetPrice, priceVariation }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined); // Add this state variable

  return (
    <TableContainer className="w-full rounded-xl bg-gray-800 lg:p-6">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th colSpan={7}>
              <HStack spacing={3}> 
                {dates.map((date, index) => (
                  <Button 
                    key={index}
                    bg="gray.700"
                    color={selectedDate === date ? "white" : "gray.500"} // Change the text color to white if the button is selected
                    variant="ghost" 
                    size="sm" // Make the button smaller
                    height="24px" // Adjust the height of the button
                    width="100px" // Adjust the width of the button
                    borderRadius="full" // Make the edges more rounded
                    borderColor={selectedDate === date ? "green.500" : "transparent"} // Add a green border if the button is selected
                    borderWidth={selectedDate === date ? "2px" : "0"} // Adjust the border width if the button is selected
                    onClick={() => setSelectedDate(date)} // Set the selected date when the button is clicked
                  >
                    {date}
                  </Button>
                ))}
              </HStack>
            </Th>
            </Tr>
            <Tr> 
                <Th textAlign="left" colSpan={3}>Calls</Th> 
                <Th textAlign="center" colSpan={2}>           
                    <HStack spacing={3} align="center">
                        <Box>{assetName} {assetPrice}</Box>
                        <Divider orientation="vertical" height="10px" borderWidth="1px"/>
                        <Box color={priceVariation! > 0 ? "green.500" : priceVariation! < 0 ? "red.500" : "black.500"}>
                            {priceVariation !== undefined && priceVariation !== null ? 
                                (priceVariation).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 }) : 
                                '0.00%'}
                        </Box>
                    </HStack>
                </Th>
                <Th textAlign="right" colSpan={2}>Puts</Th> 
            </Tr>         
            <Tr > 
                <Th><Box></Box></Th>
                <Th textAlign="center" >
                    <Box>Bid</Box>
                </Th>
                <Th textAlign="center">
                    <Box>Ask</Box>
                </Th>
                <Th textAlign="center">
                <Box>Strike</Box>
                </Th>
                <Th textAlign="center" >
                    <Box>Bid</Box>
                </Th>
                <Th textAlign="center">
                    <Box>Ask</Box>
                </Th>
                <Th><Box></Box></Th>
            </Tr>
        </Thead>
        <Tbody>
         {rows}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OptionsTable;