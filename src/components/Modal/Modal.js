import css from "./modal.module.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", (evt) => {
      if (evt.code !== "Escape") {
        return;
      }
      this.props.onClickCloseModal();
    });
  }
  render() {
    const { onClickCloseModal, largeImage } = this.props;
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
}

Modal.propTypes = {
  onClickCloseModal: PropTypes.func,
  largeImage: PropTypes.string,
};
