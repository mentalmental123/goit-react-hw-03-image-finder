import axios from "axios";
import { Notify } from "notiflix";

const APIKEY = "35927356-03cae75c91b8b6400b36c16fd";
const BASEURL = "https://pixabay.com/api/";

const PERPAGE = 100;

axios.defaults.baseURL = `${BASEURL}`;

const searchParams = new URLSearchParams({
  key: APIKEY,
  image_type: "photo", // ok
  orientation: "horizaontal",
  safesearch: true,
  per_page: PERPAGE,
  q: "",
});

class Pixabay {
  async getPictures() {
    try {
      const { data } = await axios.get(`?${searchParams}`);
      if (data.totalHits === 0) {
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
      }
      return data;
    } catch (e) {
      console.error(e.message);
    }
  }

  async loadMorePictures() {
    // console.log(searchParams);
    // PAGE_COUNTER++;

    const data = await this.getPictures();
    return data;
  }
}

const pixabay = new Pixabay();

export { pixabay, searchParams, PERPAGE };
