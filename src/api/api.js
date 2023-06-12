import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35659797-8cc42750c81fcd96097728ed9';

export const getPictures = async (textForSearch, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${textForSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  // console.log(response.data.totalHits);
  // console.log(response.data.hits);
  return response.data;
};
