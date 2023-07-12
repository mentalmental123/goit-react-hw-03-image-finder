import React, { Component, useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { pixabay, searchParams } from "../../Api/Pixaby";

import Loader from "../Loader/Loader";

// import {}

export default function App() {
  // constructor() {
  //   super();

  //   this.state = {
  //     isLoading: false,
  //     queryImage: "",
  //     data: [],
  //   };
  //   this.getQueryImages = this.getQueryImages.bind(this);
  // }

  const [isLoading, setIsLoading] = useState(false);
  const [queryImage, setQueryImage] = useState("");
  const [data, setData] = useState([]);

  const getQueryImages = async (evt) => {
    const searchQuery = evt.target.query.value.trim();
    setQueryImage(searchQuery);
  };

  useEffect(() => {
    searchParams.set("q", queryImage);

    const fetchData = async () => {
      let tempData;
      if (queryImage === "") {
        setData([]);
        setIsLoading(false);
        return;
      } else {
        tempData = await pixabay.getPictures();
        setData(tempData);
        setIsLoading(false);
        return;
      }
    };
    fetchData();
  }, [queryImage]);

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.queryImage !== this.state.queryImage) {
  //     this.setState({ isLoading: true });
  //     searchParams.set("q", this.state.queryImage);
  //     let data;
  //     if (this.state.queryImage === "") {
  //       data = [];
  //       this.setState({ data: data });
  //       this.setState({ isLoading: false });
  //       return;
  //     } else {
  //       data = await pixabay.getPictures();
  //       this.setState({ data: data });
  //       this.setState({ isLoading: false });
  //       return;
  //     }
  //   }
  // }

  return (
    <>
      <SearchBar getQueryImages={getQueryImages}></SearchBar>
      {isLoading && <Loader></Loader>}
      <ImageGallery data={data}></ImageGallery>
    </>
  );
}
