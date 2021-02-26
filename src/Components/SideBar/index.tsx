import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Box, Flex, IconButton, ButtonProps, Stack } from '@chakra-ui/react';
import {
  BsFillPersonFill,
  BsFillGridFill,
  BsBoxArrowInRight,
} from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useStore } from '../../hooks/Store';

interface SideBarButtonPops extends ButtonProps {
  icon: IconType;
}

const SideBarButton: React.FC<SideBarButtonPops> = observer(
  ({ icon: IconChild, ...props }) => {
    return (
      <Box color="white">
        <IconButton
          {...props}
          aria-label="Account"
          colorScheme="blue"
          size="md"
          fontSize={{ base: '1.5rem' }}
          icon={<IconChild />}
        />
      </Box>
    );
  },
);

const SideBar: React.FC = () => {
  const { authStore } = useStore();

  return (
    <Box width={{ base: '35px', md: '50px' }}>
      <Flex
        h="min"
        backgroundColor="pink.600"
        paddingX={{ base: 1, md: 2 }}
        position="fixed"
        justify="center"
        paddingTop="4"
        borderBottomRightRadius="full"
      >
        <Stack spacing={{ base: 4, md: 8 }}>
          <Link to="/accounts/login">
            <SideBarButton icon={BsFillPersonFill} />
          </Link>
          <SideBarButton icon={BsFillGridFill} />
          {authStore.authenticated && (
            <SideBarButton
              icon={BsBoxArrowInRight}
              onClick={authStore.logout}
            />
          )}
          <SideBarButton icon={BsFillGridFill} visibility="hidden" />
        </Stack>
      </Flex>
    </Box>
  );
};

export default observer(SideBar);
