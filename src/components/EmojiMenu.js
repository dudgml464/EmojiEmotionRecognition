import React, { useState, useEffect, memo, lazy } from 'react';
import '../styles/styles.css';
import {
  faFaceAngry as angry,
  faFaceFlushed as fearful,
  faFaceMeh as neutral,
  faFaceSurprise as surprised,
  faFaceSadTear as sad,
  faFaceLaughSquint as happy,
  faFaceGrimace as disgusted,
} from '@fortawesome/free-regular-svg-icons';
const EmojiButton = lazy(() => import('./EmojiButton'));

const emojiList = [
  { name: 'angry', icon: angry, imageName: "angry" },
  { name: 'fearful', icon: fearful, imageName: "fearful" },
  { name: 'neutral', icon: neutral, imageName: "neutral" },
  { name: 'surprised', icon: surprised, imageName: "surprised" },
  { name: 'sad', icon: sad, imageName: "sad" },
  { name: 'happy', icon: happy, imageName: "happy" },
  { name: 'disgusted', icon: disgusted, imageName: "disgusted" },
];

const EmojiMenu = ({ handleButtonImageLoad }) => {
  const [imagesLoaded, setImagesLoaded] = useState(Array(emojiList.length).fill(false));

  const loadImage = async (index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `/image/${emojiList[index].imageName}.jpg`;
      img.onload = () => resolve();
      img.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(emojiList.map((_, index) => loadImage(index)));
        setImagesLoaded(Array(emojiList.length).fill(true));
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  const handleClick = (imageName) => handleButtonImageLoad(`/image/${imageName}.jpg`);

  return (
    <div className="EmojiMenu">
      {emojiList.map(({ name, icon, imageName }, index) => (
        <EmojiButton
          key={name}
          name={name}
          icon={icon}
          imageName={imageName}
          handleClick={handleClick}
          isLoaded={imagesLoaded[index]}
        />
      ))}
    </div>
  );
}

export default memo(EmojiMenu);
