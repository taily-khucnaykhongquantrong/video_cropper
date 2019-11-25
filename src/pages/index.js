import React, { useRef, useState } from "react";

import Layout from "../components/layout";
import Cropper from "../components/cropper";
import VideoPlayer from "../components/videoPlayer/videoPlayer";

const IndexPage = () => {
  const [disabled, setDisable] = useState(true);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const canvas = <canvas ref={canvasRef} width="640" height="360" />;
  const videoPlayer = <VideoPlayer ref={videoRef} onDisableCrop={setDisable} />;

  return (
    <Layout>
      <div>
        <Cropper
          croppedImgRef={canvasRef}
          disabled={disabled}
          renderComponent={videoPlayer}
          videoPlayer={videoRef}
        />
        {canvas}
      </div>
    </Layout>
  );
};

export default IndexPage;
