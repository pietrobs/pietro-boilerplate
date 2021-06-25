import React, { useEffect, useRef } from "react";
import { VideoContext } from "./context";
import styled from "styled-components";
import Hls from "hls.js";
import propTypes from "prop-types";
import { VIDEO_STATUS } from "./constants";
import { VideoError } from "./video-error";
import { VideoLoading } from "./video-loading";

export * from "./context";
export * from "./video-toggle";
export * from "./constants";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: black;

  .message-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
  }
`;

const StyledVideo = styled.video`
  display: block;
  width: 100%;
  height: 100%;
`;

interface IHlsPlayerProps {
  m3u8?: string;
  setStatus: Function;
  status?: string;
  fullScreen: boolean;
  visible: boolean;
}

const hlsErrors = [
  "levelLoadError",
  "levelLoadTimeOut",
  "manifestLoadError",
  "manifestLoadTimeOut",
  "manifestParsingError",
];

const HlsPlayer = (props: IHlsPlayerProps) => {
  const retryingFromStream = useRef(false);
  const retryInterval = useRef(undefined);
  const retries = useRef(0);
  const hls = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    initHls(props.m3u8);
  }, []);

  const initHls = (m3u8: string) => {
    if (hls.current) hls.current.destroy();

    hls.current = new Hls({
      debug: false,
      enableWorker: true,
      maxBufferLength: 1,
      liveBackBufferLength: 0,
      liveSyncDuration: 3,
      liveMaxLatencyDuration: 4,
      liveDurationInfinity: true,
      highBufferWatchdogPeriod: 1,
    });

    hls.current.on(Hls.Events.ERROR, onHlsError);
    hls.current.on((Hls.Events as any).STREAM_STATE_TRANSITION, onStateTransition);
    hls.current.on(Hls.Events.MEDIA_ATTACHED, () => {
      retryingFromStream.current = false;
    });

    hls.current.loadSource(m3u8);
    hls.current.attachMedia(videoRef.current);
  };

  const recreateHlsPlayer = () => {
    props.setStatus(VIDEO_STATUS.LOADING);
    retries.current += 1;
    retryingFromStream.current = true;

    console.log("[HLS PLAYER] > Recreating player | Retries", retries.current);

    hls.current.destroy();
    initHls(props.m3u8);
  };

  const onHlsError = (error, data) => {
    console.log("onHlsError", {error, data});
    if (data.details === "bufferStalledError") {
      console.error("[HLS PLAYER] > Destroy and restart player");
      hls.current.destroy();
      initHls(props.m3u8);
    }

    if (hlsErrors.includes(data.details)) {
      startRecreateTimeout();
    }
  };

  const onStateTransition = (_, { previousState, nextState }) => {
    // console.log('[HLS PLAYER] > Stream state', previousState, nextState)
    const stoppedStatus = ["ERROR", "STOPPED", "ENDED"];

    if (stoppedStatus.includes(previousState) && nextState === "IDLE") {
      restartPlayer();
    }
  };

  const startRecreateTimeout = () => {
    setTimeout(recreateHlsPlayer, 5 * 1000);
  };

  const restartPlayer = () => {
    retries.current = 0;
    retryingFromStream.current = false;
    props.setStatus(VIDEO_STATUS.PLAYING);
    window.clearInterval(retryInterval.current);
  };

  const { visible, fullScreen, status } = props;

  return (
    <StyledWrapper>
      <StyledVideo muted autoPlay ref={videoRef} />

      <div className="message-container">
        {status === VIDEO_STATUS.ERROR && <VideoError />}
        {status === VIDEO_STATUS.LOADING && <VideoLoading />}
      </div>
    </StyledWrapper>
  );
};

export const Video = () => (
  <VideoContext.Consumer>{(props) => <HlsPlayer {...props} />}</VideoContext.Consumer>
);
