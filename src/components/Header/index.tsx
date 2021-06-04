import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarContext";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";


function Header () {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({ 
    base: false,
    lg: true,
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxW="1480"
      h="20"
      mx="auto"
      px="6"
      mt="4"
      align="center"
    >
      {!isWideVersion && (
        <IconButton 
          icon={<Icon as={RiMenuLine} />}
          fontSize="24" 
          variant="unstyled"
          aria-label="Open Navigation"
          onClick={onOpen}
          mr="2"
          pb="1"
        />)}
      <Logo />
      
      {isWideVersion && <SearchBox />}
      
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};

export { Header };
