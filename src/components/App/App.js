import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { pixabay, searchParams } from "../../Api/Pixaby";
import { RotatingLines } from "react-loader-spinner";
import Loader from "../Loader/Loader";

// import {}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      queryImage: "",
      data: [],
    };
    this.getQueryImages = this.getQueryImages.bind(this);
  }

  async getQueryImages(evt) {
    const searchQuery = evt.target.query.value.trim();
    this.setState({ queryImage: searchQuery });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.queryImage !== this.state.queryImage) {
      this.setState({ isLoading: true });
      searchParams.set("q", this.state.queryImage);
      let data;
      if (this.state.queryImage === "") {
        data = [];
        this.setState({ data: data });
        this.setState({ isLoading: false });
        return;
      } else {
        data = await pixabay.getPictures();
        this.setState({ data: data });
        this.setState({ isLoading: false });
        return;
      }
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <SearchBar getQueryImages={this.getQueryImages}></SearchBar>
        {isLoading && <Loader></Loader>}
        <ImageGallery data={this.state.data}></ImageGallery>
      </>
    );
  }
}
