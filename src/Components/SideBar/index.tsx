import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
  Box,
  Flex,
  IconButton,
  ButtonProps,
  Stack,
  Link,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import {
  BsFillPersonFill,
  BsFillGridFill,
  BsBoxArrowInRight,
} from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useStore } from '../../hooks/Store';

interface SideBarButtonPops extends ButtonProps {
  icon: IconType;
  ariaLabel: string;
}

const SideBarButton: React.FC<SideBarButtonPops> = observer(
  ({ icon: IconChild, ariaLabel, ...props }) => {
    return (
      <Box color="white">
        <IconButton
          {...props}
          aria-label={ariaLabel}
          colorScheme="gray"
          variant="ghost"
          size="md"
          icon={<Icon as={IconChild} boxSize={8} />}
        />
      </Box>
    );
  },
);

const SideBar: React.FC = () => {
  const { authStore } = useStore();

  return (
    <Box width={{ base: 10, md: 16 }}>
      <Flex
        h="min-content"
        width={{ base: 'min-content', md: 16 }}
        backgroundColor="pink.600"
        paddingX={{ base: 1, md: 2 }}
        position="fixed"
        justify="center"
        paddingTop="4"
        borderBottomRightRadius="full"
      >
        <Stack spacing={{ base: 4, md: 8 }}>
          <Tooltip label="Account">
            <Link
              as={RouterLink}
              to={authStore.authenticated ? '/profile' : '/accounts/login'}
            >
              <SideBarButton
                icon={BsFillPersonFill}
                ariaLabel="Access account"
              />
            </Link>
          </Tooltip>
          <Tooltip label="Meetings">
            <Link as={RouterLink} to="/">
              <SideBarButton
                icon={BsFillGridFill}
                ariaLabel="Access meetings"
              />
            </Link>
          </Tooltip>
          {authStore.authenticated && (
            <Tooltip label="Logout">
              <Box>
                <SideBarButton
                  ariaLabel="Logout"
                  icon={BsBoxArrowInRight}
                  onClick={authStore.logout}
                />
              </Box>
            </Tooltip>
          )}
          <SideBarButton
            ariaLabel="Hidden"
            icon={BsFillGridFill}
            visibility="hidden"
          />
        </Stack>
      </Flex>
    </Box>
  );
};

export default observer(SideBar);
