import React from "react";
import PropTypes from "prop-types";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import "./cropper.module.scss";

class Cropper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crop: {
        x: 0,
        y: 0,
        width: 128,
        height: 128,
        ratio: 1,
      },
    };

    this.onCropChange = this.onCropChange.bind(this);
    this.onCropComplete = this.onCropComplete.bind(this);

    this.getCroppedImg = this.getCroppedImg.bind(this);
    this.makeClientCrop = this.makeClientCrop.bind(this);
  }

  onCropComplete(_, percentCrop) {
    console.info("onCropComplete", percentCrop);

    this.makeClientCrop(percentCrop);
  }

  onCropChange(percentCrop) {
    this.setState({ crop: percentCrop });
  }

  onDragStart = () => {
    console.info("onDragStart");
  };

  onDragEnd = () => {
    console.info("onDragEnd");
  };

  getCroppedImg(src, crop) {
    const { croppedImgRef } = this.props;
    const percentToPixel = (percent, oriSize) => (percent * oriSize) / 100;

    const canvas = croppedImgRef.current;
    const scaleX = src.videoWidth / src.width;
    const scaleY = src.videoHeight / src.height;
    const cropWidthInPixel = percentToPixel(crop.width, src.width);
    const cropHeightInPixel = percentToPixel(crop.height, src.height);
    const cropXinPixel = percentToPixel(crop.x, src.width);
    const cropYinPixel = percentToPixel(crop.y, src.height);
    canvas.width = cropWidthInPixel * 4;
    canvas.height = cropHeightInPixel * 4;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      src,
      cropXinPixel * scaleX,
      cropYinPixel * scaleY,
      cropWidthInPixel * scaleX,
      cropHeightInPixel * scaleY,
      0,
      0,
      cropWidthInPixel * 4,
      cropHeightInPixel * 4
    );
  }

  makeClientCrop(crop) {
    const { videoPlayer } = this.props;
    // videoPlayer is a component consisting of many ref
    const videoSrc = videoPlayer.current.videoRef.current;

    if (videoSrc && crop.width && crop.height) {
      this.getCroppedImg(videoSrc, crop);
    }
  }

  render() {
    const { crop } = this.state;
    const { disabled, renderComponent, src } = this.props;

    return (
      <ReactCrop
        crop={crop}
        disabled={disabled}
        onChange={this.onCropChange}
        onComplete={this.onCropComplete}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        renderComponent={renderComponent}
        src={src}
      />
    );
  }
}

Cropper.propTypes = {
  croppedImgRef: PropTypes.objectOf(PropTypes.objectOf(PropTypes.object)),
  disabled: PropTypes.bool.isRequired,
  src: PropTypes.string,
  renderComponent: PropTypes.node,
  videoPlayer: PropTypes.objectOf(PropTypes.object).isRequired,
};

Cropper.defaultProps = {
  croppedImgRef: null,
  src: "",
  renderComponent: null,
};

export default Cropper;
