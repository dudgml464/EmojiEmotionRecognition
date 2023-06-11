import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

function EmojiButton({ name, icon, imageName, handleClick, isLoaded }) {
  return (
    <React.Fragment>
      <button
        className={`Emoji ${name}`}
        onClick={() => handleClick(imageName)}
        disabled={!isLoaded}
      >
        <FontAwesomeIcon className="RegularIcon" icon={icon} size="sm" />
      </button>
      <Tooltip anchorSelect={`.${name}`} place="top">{name}</Tooltip>
    </React.Fragment>
  )
}

export default EmojiButton;