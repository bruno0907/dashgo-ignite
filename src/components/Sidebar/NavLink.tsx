import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from 'next/link'
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
  icon: ElementType;
  label: string;  
  to: string;
}

function NavLink({ icon, label, to, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={to} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{label}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}

export { NavLink };
