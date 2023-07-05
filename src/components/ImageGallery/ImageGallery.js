import React, { Component } from "react";
import css from "./imageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

import { pixabay, searchParams, PERPAGE } from "../../Api/Pixaby";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

let PAGE_COUNTER = 1;

export default class ImageGallery extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      pictureTreshhold: 0,
      isLoading: false,
      showModal: false,
      largeImage: "",
    };
    this.onClickGetMoreImages = this.onClickGetMoreImages.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    // this.onKeyClose = this.onKeyClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const data = this.props.data.hits || [];
      this.setState({
        images: data,
        pictureTreshhold: Math.ceil(this.props.data.totalHits / PERPAGE),
      });
    }
  }

  async onClickGetMoreImages() {
    this.setState({ isLoading: true });
    PAGE_COUNTER++;
    searchParams.set("page", PAGE_COUNTER);
    const data = await pixabay.loadMorePictures();
    this.setState((prevState) => {
      return { images: prevState.images.concat(data.hits) };
    });
    this.setState({ isLoading: false });
  }

  onClickOpenModal(evt) {
    if (evt.target.nodeName !== "IMG") {
      return;
    }
    const largerImgLink = evt.target.dataset.source;
    this.setState({ largeImage: largerImgLink, showModal: true });
  }

  onClickCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { images, pictureTreshhold, isLoading, showModal, largeImage } =
      this.state;
    return (
      <>
        <ul
          onClick={(evt) => {
            this.onClickOpenModal(evt);
          }}
          className={css.ImageGallery}
        >
          {images.length > 0 ? (
            <ImageGalleryItem
              key={this.state.images.key}
              images={this.state.images}
            ></ImageGalleryItem>
          ) : (
            ""
          )}
        </ul>
        {isLoading && <Loader></Loader>}
        {PAGE_COUNTER <= pictureTreshhold ? (
          <button onClick={this.onClickGetMoreImages} className={css.Button}>
            LOAD MORE
          </button>
        ) : (
          ""
        )}
        {showModal ? (
          <Modal
            onClickCloseModal={this.onClickCloseModal}
            largeImage={largeImage}
            onKeyClose={this.onKeyClose}
          ></Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}
