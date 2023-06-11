import React, { useState, useEffect } from 'react';
import './styles.css';
import {
  faFaceAngry as angry,
  faFaceFlushed as fearful,
  faFaceMeh as neutral,
  faFaceSurprise as surprised,
  faFaceSadTear as sad,
  faFaceLaughSquint as happy,
  faFaceGrimace as disgusted,
} from '@fortawesome/free-regular-svg-icons';
import EmojiButton from './EmojiButton';

const emojiList = [
  { name: 'angry', icon: angry, imageName: "angry" },
  { name: 'fearful', icon: fearful, imageName: "fearful" },
  { name: 'neutral', icon: neutral, imageName: "neutral" },
  { name: 'surprised', icon: surprised, imageName: "surprised" },
  { name: 'sad', icon: sad, imageName: "sad" },
  { name: 'happy', icon: happy, imageName: "happy" },
  { name: 'disgusted', icon: disgusted, imageName: "disgusted" },
];

function EmojiMenu({ handleButtonImageLoad }) {
  const [imagesLoaded, setImagesLoaded] = useState(Array(emojiList.length).fill(false));

  const handleImageLoad = (index) => {
    setImagesLoaded(imagesLoaded => {
      imagesLoaded[index] = true;
      return [...imagesLoaded];
    });
  };

  useEffect(() => {
    emojiList.forEach(({ imageName }, i) => {
      const img = new Image();
      img.src = `/image/${imageName}.jpg`;
      img.loading = "lazy";
      img.onload = () => handleImageLoad(i);
    });
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

export default EmojiMenu;
