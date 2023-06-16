import React, { memo, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

const EmojiButton = ({ name, icon, imageName, handleClick, isLoaded }) => {
  return (
    <Fragment>
      <button
        className={`Emoji ${name}`}
        onClick={() => handleClick(imageName)}
        disabled={!isLoaded}
      >
        <FontAwesomeIcon className="RegularIcon" icon={icon} size="sm" />
      </button>
      <Tooltip anchorSelect={`.${name}`} place="top">{name}</Tooltip>
    </Fragment>
  )
}

export default memo(EmojiButton);
