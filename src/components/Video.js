import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';


const VideoPlayer = () => {
    const videoId = "Rk5C149J9C0";
    const playerRef = useRef(null);
  
    useEffect(() => {
      const player = playerRef.current.getInternalPlayer();
      player.playVideo();
    }, []);
  
    return (
      <YouTube videoId={videoId} opts={{ playerVars: { autoplay: 1 } }} ref={playerRef} />
    );
  };
  
  
  export default VideoPlayer;
  