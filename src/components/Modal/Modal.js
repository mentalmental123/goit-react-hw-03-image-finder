import css from "./modal.module.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function Modal({ onClickCloseModal, largeImage }) {
  useEffect(() => {
    document.addEventListener("keydown", (evt) => {
      if (evt.code !== "Escape") {
        return;
      }
      onClickCloseModal();
    });
  }, []);

  // const { onClickCloseModal, largeImage } = this.props;
  return (
    <div
      onClick={() => {
        onClickCloseModal();
      }}
      className={css.Overlay}
    >
      <div className={css.Modal}>
        <img src={largeImage} alt="something" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClickCloseModal: PropTypes.func,
  largeImage: PropTypes.string,
};
