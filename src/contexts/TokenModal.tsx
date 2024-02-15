import {
    Button,
    Modal as ChakraModal,
    Divider,
    List,
    ListItem,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import React from "react";
  
  import { CloseButton } from "@/assets/svgs";
  import TokenIcon from "@/components/TokenIcon";
  import { useColorMode } from "@/hooks/useColorMode";
  import {
    Asset,
    CloseDialogFn,
    OpenTokenDialogFn,
    TokenModalOptions,
    VoidNoArgs,
  } from "@/types";
  
  const TokenModalContext = createContext<{
    closeDialog: CloseDialogFn;
    onSelectToken: CloseDialogFn;
    setOptions: (o: TokenModalOptions) => void;
    assets: Asset[];
  }>({
    closeDialog: () => undefined,
    onSelectToken: () => undefined,
    setOptions: () => undefined,
    assets: [],
  });
  
  export const useTokenModal = (
    options: Partial<TokenModalOptions> = getDefaultOptions()
  ) => {
    const value = useContext(TokenModalContext);
    const memoedValue = useRef(value);
    const memoedOptions = useRef(options);
  
    useEffect(() => {
      memoedValue.current.setOptions({
        ...getDefaultOptions(),
        ...memoedOptions.current,
      });
    }, [memoedValue, memoedOptions]);
  
    return value;
  };
  
  export const getDefaultOptions = (): TokenModalOptions => ({
    isClosable: true,
    onSelectTokenCallback: () => undefined,
    returnPath: "",
    assets: [],
  });
  
  interface Props {
    isClosable: boolean;
    isOpen: boolean;
    onClose: VoidNoArgs;
    onSelectToken?: () => void;
    returnPath?: string;
    assets: Asset[];
  }
  
  const TokenModalComponent: React.FC<Props> = ({
    isClosable,
    isOpen,
    onClose,
    onSelectToken,
    returnPath,
    assets,
  }) => {
    const { mode } = useColorMode();
  
    const handleClose = () => isClosable && onClose();
  
    return (
      <>
        <ChakraModal onClose={handleClose} isCentered isOpen={isOpen}>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent bg={mode("primary.100", "primary.100.dark")}>
            <ModalHeader
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span></span>
              <span>Select a token</span>
              {isClosable ? (
                <Text
                  style={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: "8px",
                  }}
                  onClick={handleClose}
                >
                  <CloseButton width={14} height={14} />
                </Text>
              ) : (
                <span></span>
              )}
            </ModalHeader>
  
            <Divider
              style={{
                width: "95%",
                alignSelf: "center",
              }}
            />
  
            <ModalBody
              style={{
                padding: "0px",
                paddingBottom: "0px",
              }}
            >
              <List p="10px" bg="transparent">
                {assets.map((item, key) => (
                  <React.Fragment key={key}>
                    Item {item.name}
                  </React.Fragment>
                ))}
              </List>
            </ModalBody>
  
            {returnPath && (
              <ModalFooter>
                <Link
                  onClick={onClose}
                  style={{ width: "100%" }}
                  href={returnPath}
                >
                  <Button>Back</Button>
                </Link>
              </ModalFooter>
            )}
          </ModalContent>
        </ChakraModal>
      </>
    );
  };
  
  const TokenModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [options, setOptions] = useState<TokenModalOptions>(getDefaultOptions);
  
    const handleSelectToken = () => {
      options.onSelectTokenCallback();
      handleClose();
    };
  
    const handleClose = () => {
      setOptions(getDefaultOptions());
      onClose();
    };
  
    return (
      <TokenModalContext.Provider
        value={{
          closeDialog: handleClose,
          onSelectToken: handleSelectToken,
          setOptions,
          assets: options.assets,
        }}
      >
        <TokenModalComponent
          isOpen={isOpen}
          isClosable={options.isClosable}
          onClose={handleClose}
          onSelectToken={handleSelectToken}
          returnPath={options.returnPath}
          assets={options.assets}
        />
  
        {children}
      </TokenModalContext.Provider>
    );
  };
  
  export default TokenModalProvider;
  