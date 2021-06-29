import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AppContext, { ModeType } from "contexts/app";
import SelectDevice from "components/SelectDevice";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Divider } from "@material-ui/core";
import SelectOutput from "components/SelectOutput";

const Transition = React.forwardRef((
  props: any & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Slide direction="up" ref={ref} {...props} />);

interface IConfigureModalProps {
  visible: boolean;
  handleClose: () => void;
}

const ConfigureModal = ({ visible, handleClose }: IConfigureModalProps) => {
    const { state, update } = useContext(AppContext);
    const [m3u8, setM3u8] = useState(state.m3u8);
    const fileRef = useRef<HTMLInputElement>();

    useEffect(() => {
        console.log("Tentando iniciar fileRef");
        if(fileRef.current){
            console.log("Iniciou");
            (fileRef.current as any).directory = true;
            (fileRef.current as any).webkitdirectory = true;
        }
    }, [fileRef.current])

    const handleDeviceChange = (mode: ModeType) => {
        update("mode", mode);
    }

    const handleOutputChange = () => {
        update("m3u8", m3u8);
    }

    const onStop = () => {
        update("stream", null);
      };

    const isTablet = state.mode === "tablet";

    const isFullScreen = false; // isTablet;

    return (
        <Dialog
        open={visible}
        TransitionComponent={Transition as any}
        fullScreen={isFullScreen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <h3 className="normal">Configurações</h3>
                    <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Toolbar>

            <Divider />          

            <DialogContent style={{marginTop: isFullScreen ? 84 : 0, width: 600}} >
                {/* <div className="spacing-x2">
                <SelectDevice handleDeviceChange={handleDeviceChange} device={state.mode} />
                </div> */}
                <input ref={fileRef} type="file" onChange={e => {console.log(e); console.log(e.target.value)}} multiple={false} />
                <div className="spacing-x2">
                <SelectOutput handleOutputChange={handleOutputChange} m3u8={m3u8} setM3u8={(m3u8) => setM3u8(m3u8)} />
                </div>
            </DialogContent>

            


        </Dialog>
    );
};

export default ConfigureModal;
