import React from "react";
import PropTypes from "prop-types";

import ProgressBar from "../progressbar";
import Button from "../button";
import videoSrc from "../../videos/license_plate1.mp4";

import s from "./videoPlayer.module.scss";

const progressToTime = progress => {
  const hour = Math.floor(progress / 3600);
  const minute = Math.floor((progress % 3600) / 60);
  const second = Math.floor((progress % 3600) % 60);

  return { hour, minute, second };
};
const displayTime = ({ hour, minute, second }) => {
  let hourDisplay = "";
  const minuteDisplay = minute;
  let secondDisplay = `0${second}`;

  if (hour > 0 && hour < 10) {
    hourDisplay = `0${hour}`;
  } else if (hour > 10) {
    hourDisplay = hour;
  }

  if (second > 10) {
    secondDisplay = second;
  }

  return hour === 0
    ? `${minuteDisplay}:${secondDisplay}`
    : `${hourDisplay}:${minuteDisplay}:${secondDisplay}`;
};

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProgress: 0,
      currentTime: 0,
      duration: 0,
    };

    this.videoRef = React.createRef();

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleUpdateCurrentTime = this.handleUpdateCurrentTime.bind(this);
  }

  componentDidMount() {
    this.videoRef.current.addEventListener("timeupdate", () => {
      const { currentTime, duration } = this.videoRef.current;
      const currentProgress = currentTime / duration;

      this.setState({ currentProgress, currentTime, duration });
    });
  }

  handleButtonClick() {
    const video = this.videoRef.current;
    const { onDisableCrop } = this.props;

    if (video.paused) {
      video.play();
      onDisableCrop(true);
    } else {
      video.pause();
      onDisableCrop(false);
    }
  }

  handleUpdateCurrentTime(currentTime) {
    const video = this.videoRef.current;
    video.currentTime = currentTime;
  }

  render() {
    const { currentProgress, currentTime, duration } = this.state;
    const currentTimestamp = progressToTime(currentTime);
    const durationTimestamp = progressToTime(duration);
    const currentTimeDisplay = displayTime(currentTimestamp);
    const durationDisplay = displayTime(durationTimestamp);

    return (
      <>
        {/* eslint-disable-next-line */}
        <video width="640" height="360" ref={this.videoRef}>
          <source src={videoSrc} />
        </video>
        <div className={s.controlsBar}>
          <Button onClick={this.handleButtonClick} />
          <div>
            {currentTimeDisplay}/{durationDisplay}
          </div>
          <ProgressBar
            duration={duration}
            onUpdateCurrentTime={this.handleUpdateCurrentTime}
            value={currentProgress}
          />
        </div>
      </>
    );
  }
}

VideoPlayer.propTypes = {
  onDisableCrop: PropTypes.func.isRequired,
};

export default VideoPlayer;
