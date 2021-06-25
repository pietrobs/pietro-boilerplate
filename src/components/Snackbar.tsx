import React from "react";
import { Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MaterialSnackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { useNetworkContext } from "contexts/network";

const paperStyle: any = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
  color: "#FFF",
  marginTop: 8,
  fontWeight: 700,
  width: 300,
  textAlign: "center",
};

function Alert({ color, ...props }: any) {
  return (
    <Paper
      elevation={6}
      variant="elevation"
      {...props}
      style={{ backgroundColor: color, ...paperStyle }}
    />
  );
}
// import { Container } from './styles';

interface ISnackbarProps{
    visible: boolean;
    handleClose: () => void;
    icon?: any;
    message: string;
    duration?: number
    position?: { vertical: "top" | "center" | "bottom", horizontal: "right" | "left" | "center"};
}

const Snackbar = ({visible, handleClose, icon, message, duration, position}: ISnackbarProps) => <MaterialSnackbar
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    autoHideDuration={duration || undefined}
    open={visible}
    onClose={handleClose}
  >
    <Alert color="#ff9800">
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
          { icon || <NotificationImportantIcon />}
                <Typography style={{ marginLeft: 8, color: "#ffffff", fontWeight: 700 }}>
                {message}
              </Typography>
          </div>
          <IconButton aria-label="close" color="inherit" onClick={handleClose as any}>
            <CloseIcon />
          </IconButton>
        </span>
      </div>
    </Alert>
  </MaterialSnackbar>
  
export default Snackbar;