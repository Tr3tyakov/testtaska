import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/material';
import { IBaseModal } from './modal.interface';

const BaseModalWrapper: React.FC<IBaseModal> = ({ active, changeActiveModal, children }): any => {
  if (active) {
    return ReactDOM.createPortal(
      <Box
        position="absolute"
        height="100vh"
        display="flex"
        top="0"
        left="0"
        right="0"
        bottom="0"
        justifyContent="center"
        alignItems="center"
        bgcolor="#00000061"
        onClick={changeActiveModal}>
        <Box
          bgcolor="white"
          width="60%"
          maxWidth="500px"
          height="max-content"
          p="15px"
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          borderRadius="5px"
          onClick={(e) => e.stopPropagation()}>
          {children}
        </Box>
      </Box>,
      document.getElementById('window') as HTMLElement,
    );
  }
};

export default BaseModalWrapper;
