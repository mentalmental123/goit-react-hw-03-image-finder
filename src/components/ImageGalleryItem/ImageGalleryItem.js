import React from "react";
import css from "./imageGalleryItem.module.css";
import Modal from "../Modal/Modal";
import { Component } from "react";

export default function ImageGalleryItem({ images }) {
  return images.map(({ id, webformatURL, largeImageURL }) => (
    <>
      <li className={css.ImageGalleryItem} key={id}>
        <img src={webformatURL} data-source={largeImageURL} />
      </li>
    </>
  ));
}
