import { Link, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps{
  icon: ElementType;
  label: string;  
}

function NavLink({ icon, label, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">{label}</Text>
    </Link>
  );
}

export { NavLink };
