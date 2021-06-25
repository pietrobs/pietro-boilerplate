import React from "react";
import { Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import NetworkWifiIcon from "@material-ui/icons/NetworkWifi";
import SignalWifiOffIcon from "@material-ui/icons/SignalWifiOff";
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

const NetworkListener = () => {
  const isOnline = useNetworkContext();
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const displayMessage = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  React.useEffect(() => {
    if (isOnline) {
      displayMessage("Conexão estabelecida!");
    } else {
      displayMessage("Problema de conexão!");
    }
  }, [isOnline]);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={isOnline ? 6000 : undefined}
        open={open}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert color={isOnline ? "#4caf50" : "#ff9800"}>
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
                {isOnline ? <NetworkWifiIcon /> : <SignalWifiOffIcon />}
                {messageInfo ? (
                  <Typography style={{ marginLeft: 8, color: "#ffffff", fontWeight: 700 }}>
                    {messageInfo.message}
                  </Typography>
                ) : (
                  ""
                )}
              </div>
              <IconButton aria-label="close" color="inherit" onClick={handleClose as any}>
                <CloseIcon />
              </IconButton>
            </span>
            {!isOnline && (
              <Typography style={{ textAlign: "left", color: "white" }} variant="caption">
                Os vídeos serão armazenados no terminal até que a conexão com a internet seja
                reestabelecida.
              </Typography>
            )}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default React.memo(NetworkListener, () => true);
