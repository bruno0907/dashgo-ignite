import { Stack } from "@chakra-ui/layout";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink to="/dashboard" icon={RiDashboardLine} label="Dashboard" />
        <NavLink to="/users" icon={RiContactsLine} label="Usuários" />
      </NavSection>
      <NavSection title="Automação">
        <NavLink to="/forms" icon={RiInputMethodLine} label="Formulários" />
        <NavLink to="/automation" icon={RiGitMergeLine} label="Automação" />
      </NavSection>
    </Stack>   
  )
}

export { SidebarNav };