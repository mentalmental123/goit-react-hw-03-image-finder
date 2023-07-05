import css from "./modal.module.css";
import React, { Component } from "react";

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
          <img src={largeImage} />
        </div>
      </div>
    );
  }
}
