import PropTypes from 'prop-types';
import { useState } from 'react';
import { BtnLoadMore } from './Button.styled';

export const Button = ({addPictures}) => {
  const [page, setPage] = useState(2);
  
  // функція додавання page та відправки даних до ImageGallery
  const addPage = () => {
    setPage(prevState => prevState + 1);
    addPictures(page);
  };

  return (
    <BtnLoadMore type="button" onClick={addPage}>
      Load more
    </BtnLoadMore>
  );
};

Button.propTypes = {
  addPictures: PropTypes.func.isRequired,
};
