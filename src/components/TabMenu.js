import React, { useCallback, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faImage } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";

const TabMenu = ({
  activeTab,
  handleClickWebcamTab,
  handleClickImageTab,
}) => {
  const handleWebcamClick = useCallback(() => {
    handleClickWebcamTab();
  }, [handleClickWebcamTab]);

  const handleImageClick = useCallback(() => {
    handleClickImageTab();
  }, [handleClickImageTab]);

  return (
    <div className="menu">
      <button
        className={activeTab === "webcam" ? "tab-active" : ""}
        onClick={handleWebcamClick}
      >
        <FontAwesomeIcon className="MenuIcon" icon={faCameraRetro} size="2x" />
      </button>
      <button
        className={activeTab === "image" ? "tab-active" : ""}
        onClick={handleImageClick}
      >
        <FontAwesomeIcon className="MenuIcon" icon={faImage} size="2x" />
      </button>
    </div>
  );
};

export default memo(TabMenu);
