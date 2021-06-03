import { Box, Stack } from "@chakra-ui/react"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

function Sidebar(){
  return(
    <Box as="aside" w="64" mr="8">
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
    </Box>
  )
}

export { Sidebar }