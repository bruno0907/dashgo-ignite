import {
  Flex,
  Box,
  Text,
  Avatar
} from '@chakra-ui/react'
interface ProfileProps {
  showProfileData?: boolean;
}

function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && 
        <Box mr="4" textAlign="right">
          <Text>Bruno Mariani</Text>
          <Text color="gray.300" fontSize="small">
            bruno0907@gmail.com
          </Text>
        </Box> }
      <Avatar
        size="md"
        name="Bruno Mariani"
        src="https://github.com/bruno0907.png"
      />
    </Flex>
  );
}

export { Profile };
