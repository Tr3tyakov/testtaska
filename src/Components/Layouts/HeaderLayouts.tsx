import React from 'react';
import { Box, Container, Avatar, Typography, Button } from '@mui/material';
import { IHeaderLayouts } from './headerLayouts.interface';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Hooks/useTypeSelector';
import { changeAuth, setUser } from '../Store/Reducers/user/userReducer';
import { getProfile } from '../HTTP/http.profile';

const HeaderLayouts: React.FC<IHeaderLayouts> = ({ children, openSnackbar }) => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ userReducer }) => userReducer.user);
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  React.useEffect(() => {
    try {
      (async () => {
        const { data, status } = await getProfile();
        if (status === 200) {
          dispatch(changeAuth(true));
          dispatch(setUser(data));
          return;
        }
        navigation('/');
      })();
    } catch (e) {
      const result = (e as Error).message;
      openSnackbar({ message: result });
    }
  }, []);

  const makeExit = () => {
    dispatch(changeAuth(false));
    localStorage.clear();
    navigation('/');
  };

  return (
    <>
      <Box
        zIndex={100}
        position="fixed"
        top="0"
        width="100%"
        display="flex"
        height="60px"
        alignItems="center"
        justifyContent="flex-end"
        bgcolor="#196bbe"
        boxShadow="0px 3px 3px #515151">
        <Box padding="0 10px" display="flex" alignItems="center" gap="10px">
          <Button startIcon={<Avatar />} onClick={(e) => handleChange(e)}>
            <Typography color="white">{user?.username}</Typography>
          </Button>
          <Menu open={Boolean(anchor)} onClose={closeMenu} anchorEl={anchor}>
            <MenuItem onClick={makeExit}>Выход</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Container>
        <Box marginTop="80px" marginBottom="20px">
          {children}
        </Box>
      </Container>
    </>
  );
};

export default HeaderLayouts;
