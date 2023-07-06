import React from "react";
import css from "./imageGalleryItem.module.css";

import PropTypes from "prop-types";

export default function ImageGalleryItem({ images }) {
  return images.map(({ id, webformatURL, largeImageURL }) => (
    <>
      <li className={css.ImageGalleryItem} key={id}>
        <img src={webformatURL} alt="something" data-source={largeImageURL} />
      </li>
    </>
  ));
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
