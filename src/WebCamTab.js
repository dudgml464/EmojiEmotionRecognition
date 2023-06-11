import * as faceapi from 'face-api-arousal';
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceAngry,
  faFaceFlushed,
  faFaceMeh,
  faFaceSurprise,
  faFaceSadTear,
  faFaceLaughSquint,
  faFaceGrimace,
} from '@fortawesome/free-solid-svg-icons';

function WebCamTab({ active }) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState('');
  const [emotionKr, setEmotionKr] = useState('');
  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;

  const emotionToEmoji = useMemo(() => ({
      angry: { component: (<FontAwesomeIcon className='Icon' icon={faFaceAngry} beat size='2xl' style={{ color: '#b80000' }} /> ),
        kr: '화남',
      },
      disgusted: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceGrimace} beatFade size='2xl' style={{ color: '#76a532' }} /> ),
        kr: '역겨움',
      },
      fearful: { component: ( <FontAwesomeIcon className='Icon' icon={faFaceFlushed} spinPulse size='2xl' style={{ color: '#2C3E50' }} /> ),
        kr: '두려움',
      },
      happy: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceLaughSquint} bounce size='2xl' style={{ color: '#ffff00' }} /> ),
        kr: '기쁨',
      },
      sad: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceSadTear} beatFade size='2xl' style={{ color: '#0000ff' }} /> ),
        kr: '슬픔',
      },
      surprised: {
        component: ( <FontAwesomeIcon className='Icon' icon={faFaceSurprise} flip size='2xl' style={{ color: '#9932cc' }} /> ),
        kr: '놀람',
      },
      neutral: { component: ( <FontAwesomeIcon className='Icon' icon={faFaceMeh} fade size='2xl' style={{ color: '#808080' }} /> ),
        kr: '중립',
      },
    }), []
  );

  const stopVideo = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      videoRef.current.srcObject = null;
      setModelsLoaded(false);
    }
  }, []); 

  const startVideo = useCallback(async () => {
    if (!modelsLoaded) {
      await loadModels();
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: videoWidth, height: videoHeight },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
  
      const playPromise = new Promise((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            resolve();
          };
        }
      });
      await playPromise;

      const handleEmotionInterval = setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

          if (detections) {
            const maxValue = Math.max(...Object.values(detections.expressions));
            const detectedEmotion = Object.keys(detections.expressions).find(
              (key) => detections.expressions[key] === maxValue
            );
            setDetectedEmotion(emotionToEmoji[detectedEmotion]);
            setEmotionKr(emotionToEmoji[detectedEmotion].kr);
          }
        }
      }, 100);

      videoRef.current.handleEmotionIntervalId = handleEmotionInterval;
    } catch (err) {
      console.error('Error:', err);
    }
  }, [modelsLoaded, emotionToEmoji]);

  const handleVisibilityChange = useCallback(async () => {
    if (document.hidden) {
      stopVideo();
    } else if (active) {
      await startVideo();
    }
  }, [active, startVideo]);

  useEffect(() => {
    if (active) {
      startVideo();
    }
  
    return () => {
      stopVideo();
    };
  }, [active, startVideo, stopVideo]);
  
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);
  
  async function loadModels() {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]);
    setModelsLoaded(true);
  }

  return (
    <div className={`WebCam ${active ? 'visible' : 'hidden'}`}>
      {modelsLoaded && active && (
        <div className="Main">
          <div className='card'>
            <div className='card-image'>
              <video ref={videoRef} height={videoHeight} width={videoWidth} muted />
            </div>
            <p className='card-title'>감지된 감정</p>
            <p className='card-body'>
              <span className='e1'>{emotionKr}</span>
              <span className='e2'>{detectedEmotion.component}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebCamTab;