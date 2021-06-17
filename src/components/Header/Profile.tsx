import {
  Flex,
  Box,
  Text,
  Avatar,
  SkeletonText,
  SkeletonCircle
} from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth';
interface ProfileProps {
  showProfileData?: boolean;
}

function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useAuth()
  
  return !user ? (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <SkeletonText noOfLines={2} w="140px"/>        
      </Box>
      <SkeletonCircle size="12"/>
    </Flex>
  ) : (
    <Flex align="center">
      { showProfileData && 
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box> }
      <Avatar
        size="md"
        name={user?.name}
        src={user?.avatar}
      />
    </Flex>
  );
};

export { Profile };
