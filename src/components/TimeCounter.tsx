import moment from "moment";
import * as React from "react";
import styled from "styled-components";
import ScheduleIcon from "@material-ui/icons/Schedule";

const TimeCounterWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TimeCounterProps {
  init?: any;
  style?: any;
}

const TimeCounter = ({ init, style }: TimeCounterProps) => {
  const [seconds, setSeconds] = React.useState<moment.Duration>(moment.duration(init, "seconds"));
  const interval: any = React.useRef();

  React.useEffect(() => {
    interval.current = setInterval(() => {
      setSeconds((oldSeconds) => moment.duration(oldSeconds.asSeconds() + 1, "seconds"));
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const formatTime = () => {
    const formattedNumber = (n: number) => `0${n}`.slice(-2);

    if (seconds.hours() > 0) {
      return `${formattedNumber(seconds.hours())}:${formattedNumber(
        seconds.minutes(),
      )}:${formattedNumber(seconds.seconds())}`;
    }

    return `${formattedNumber(seconds.minutes())}:${formattedNumber(seconds.seconds())}`;
  };

  return (
    <TimeCounterWrapper style={{ ...style }}>
      <ScheduleIcon style={{ marginRight: 8 }} />
      {formatTime()}
    </TimeCounterWrapper>
  );
};

export default TimeCounter;
