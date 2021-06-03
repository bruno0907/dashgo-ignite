import { Stack } from "@chakra-ui/layout";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink icon={RiDashboardLine} label="Dashboard" />
        <NavLink icon={RiContactsLine} label="Usuários" />
      </NavSection>
      <NavSection title="Automação">
        <NavLink icon={RiInputMethodLine} label="Formulários" />
        <NavLink icon={RiGitMergeLine} label="Automação" />
      </NavSection>
    </Stack>   
  )
}

export { SidebarNav };