import React, { useState, useEffect } from "react";
import css from "./imageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import { pixabay, searchParams, PERPAGE } from "../../Api/Pixaby";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

let PAGE_COUNTER = 1;

export default function ImageGallery({ data }) {
  // constructor() {
  //   super();
  //   this.state = {
  //     images: [],
  //     pictureTreshhold: 0,
  //     isLoading: false,
  //     showModal: false,
  //     largeImage: "",
  //   };
  // }
  const [images, setImages] = useState([]);
  const [pictureTreshhold, setPictureTreshhold] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");

  // this.onClickGetMoreImages = this.onClickGetMoreImages.bind(this);
  // this.onClickCloseModal = this.onClickCloseModal.bind(this);
  // this.onKeyClose = this.onKeyClose.bind(this);

  useEffect(() => {
    const array = data.hits || [];
    setImages(array);
    setPictureTreshhold(Math.ceil(data.totalHits / PERPAGE));
  }, [data]);

  const onClickGetMoreImages = async () => {
    setIsLoading(true);
    PAGE_COUNTER++;
    searchParams.set("page", PAGE_COUNTER);
    const data = await pixabay.loadMorePictures();
    setImages(images.concat(data.hits));
    setIsLoading(false);
  };

  const onClickOpenModal = (evt) => {
    if (evt.target.nodeName !== "IMG") {
      return;
    }
    const largerImgLink = evt.target.dataset.source;
    setLargeImage(largerImgLink);
    setShowModal(true);
    // this.setState({ largeImage: largerImgLink, showModal: true });
  };

  const onClickCloseModal = () => {
    setShowModal(false);
  };

  // const { images, pictureTreshhold, isLoading, showModal, largeImage } =
  //   this.state;
  return (
    <>
      <ul
        onClick={(evt) => {
          onClickOpenModal(evt);
        }}
        className={css.ImageGallery}
      >
        {images.length > 0 ? (
          <ImageGalleryItem key={images.key} images={images}></ImageGalleryItem>
        ) : (
          ""
        )}
      </ul>
      {isLoading && <Loader></Loader>}
      {PAGE_COUNTER <= pictureTreshhold && images.length >= 12 ? (
        <button onClick={onClickGetMoreImages} className={css.Button}>
          LOAD MORE
        </button>
      ) : (
        ""
      )}
      {showModal ? (
        <Modal
          onClickCloseModal={onClickCloseModal}
          largeImage={largeImage}
          // onKeyClose={onKeyClose}
        ></Modal>
      ) : (
        ""
      )}
    </>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
