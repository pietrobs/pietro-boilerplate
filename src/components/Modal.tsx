import React from 'react';
import { Dialog, Slide, Toolbar, Grid, IconButton, DialogContent, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

// import { Container } from './styles';
const ModalContainer = styled(Dialog)`

    .modal-footer{
        display: flex;
        flex-direction: row;
        margin: 24px 0px;
        margin-top: 48px;
    }
`;

interface IModalProps{
    visible: boolean;
    isFullScreen?: boolean;
    handleClose: () => void;
    title: string;
    content: any;
}

const Transition = React.forwardRef((
    props: any & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />);

const Modal = ({visible, isFullScreen, handleClose, title, content}: IModalProps) => (
    <ModalContainer
  open={visible}
  TransitionComponent={Transition as any}
  fullScreen={isFullScreen}
  onClose={handleClose}
  aria-labelledby="alert-dialog-slide-title"
  aria-describedby="alert-dialog-slide-description"
  >
      <Toolbar>
          <Grid container justify="space-between" alignItems="center">
              <h3 className="normal">{title}</h3>
              <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
              </IconButton>
          </Grid>
      </Toolbar>

      <Divider />          

      <DialogContent style={{marginTop: isFullScreen ? 84 : 0, width: 600}} >
          {content}
      </DialogContent>

  </ModalContainer>
)

export default Modal;