import React from "react";
import PropTypes from "prop-types";

import ProgressBar from "../progressbar";
import Button from "../button";
import videoSrc from "../../videos/license_plate1.mp4";

import s from "./videoPlayer.module.scss";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProgress: 0,
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

      this.setState({ currentProgress, duration });
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
    const { currentProgress, duration } = this.state;

    return (
      <>
        {/* eslint-disable-next-line */}
        <video width="640" height="360" ref={this.videoRef}>
          <source src={videoSrc} />
        </video>
        <div className={s.controlsBar}>
          <Button onClick={this.handleButtonClick} />
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
