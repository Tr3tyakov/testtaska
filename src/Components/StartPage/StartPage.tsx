import { Box, Container, Typography, Button, TextField, Paper } from '@mui/material';
import React from 'react';
import { authentication, registration } from '../HTTP/http.profile';
import { IError, IPorfile } from './startPage.interface';
import { useNavigate } from 'react-router-dom';
import { validationData } from './validation';
import { changeAuth } from '../Store/Reducers/user/userReducer';
import { useAppDispatch } from '../Hooks/useTypeSelector';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import {useSnackBar } from '../Hooks/snackBar';
import CloseIcon from '@mui/icons-material/Close';

const StartPage = () => {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const { snackBar, openSnackBar, closeSnackBar } = useSnackBar();
  const [error, setError] = React.useState<IError>({
    error: false,
    message: '',
  });
  
  const [haveAccount, setHaveAccount] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<IPorfile>({
    username: '',
    password: '',
    repeatPassword: '',
  });
  
  const changeProfileName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, username: e.currentTarget.value });
  };
  const changeProfilePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, password: e.currentTarget.value });
  };
  const changeProfileRepeatPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setProfile({ ...profile, repeatPassword: e.currentTarget.value });
    };
    
    const changeHaveAccount = () => {
      setHaveAccount(!haveAccount);
      setError({ error: false, message: '' });
    };
    
    const setRegistration = async () => {
      try {
      const check = validationData(profile.username, profile.password, profile.repeatPassword);
      if (check) {
        setError({ ...profile, error: true, message: check });
        openSnackBar({ message: check });
        return;
      }
      
      setError({ ...error, error: false });
      const { status } = await registration(profile.username, profile.password);
      if (status === 201) {
        changeHaveAccount();
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };
  
  /**
   * Функция для аутентификации пользователя
   */
  const setAuthentication = async () => {
    try {
      const { data, status } = await authentication(profile.username, profile.password);
      localStorage.setItem('Token', data.token);
      dispatch(changeAuth(true));
      if (status === 200) {
        navigation('/todo');
      }
    } catch (e) {
      const result = (e as Error).message;
      openSnackBar({ message: result });
    }
  };
  
  const isError = error.error;
  return (
    <Container>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={6000}
        onClose={closeSnackBar}
        message={snackBar.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        />
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper elevation={5}>
          <Box
            width="400px"
            height="max-content"
            bgcolor="Menu"
            borderRadius={6}
            p="15px"
            display="flex"
            justifyContent="center"
            gap={5}
            flexDirection="column"
            alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography gutterBottom color="black" fontSize="33px" fontWeight={600}>
                {haveAccount ? 'Вход в аккаунт' : 'Регистрация'}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={'10px'}>
              <Box display="flex" gap="10px" flexDirection="column">
                <TextField
                  type="text"
                  value={profile.username}
                  onChange={(e) => changeProfileName(e)}
                  error={isError}
                  color="primary"
                  variant="outlined"
                  placeholder="Имя"
                />
                <TextField
                  type="password"
                  value={profile.password}
                  onChange={(e) => changeProfilePassword(e)}
                  color="primary"
                  variant="outlined"
                  error={isError}
                  placeholder="Пароль"
                />
                {!haveAccount && (
                  <>
                    <TextField
                      type="password"
                      value={profile.repeatPassword}
                      onChange={(e) => changeProfileRepeatPassword(e)}
                      color="primary"
                      variant="outlined"
                      error={isError}
                      placeholder="Повторите пароль"
                    />

                    {isError && (
                      <Box display="flex" justifyContent="flex-start" width="100%">
                        <Typography color="red">{error.message}</Typography>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
            <Box>
              {haveAccount ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button variant="contained" onClick={() => setAuthentication()}>
                    Авторизоваться
                  </Button>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button variant="contained" onClick={() => setRegistration()}>
                    Зарегистрироваться
                  </Button>
                </Box>
              )}
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="5px"
                flexWrap="wrap">
                <Typography>{haveAccount ? 'Нет аккаунта?' : 'Уже имеете аккаунт?'}</Typography>
                <Button onClick={changeHaveAccount}>
                  {haveAccount ? 'Зарегистрироваться' : 'Войти'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default StartPage;
