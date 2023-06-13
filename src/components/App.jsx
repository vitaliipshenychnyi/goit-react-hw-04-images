import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPictures } from 'api/api';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './image-gallery/ImageGallery';
import { Wrapper } from './App.styled';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';
import { ModalImg } from './modal/Modal';

export const App = () => {
  const [textForSearch, setTextForSearch] = useState('');
  const [pictures, setPictures] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [urlBig, setUrlBig] = useState('');
  const [alt, setAlt] = useState('');

  // метод отримання та збереження у state тексту для пошуку зображення
  const receiveTextForSearch = text => {
    setTextForSearch(text);
  };

  // метод отримання та збереження перших зображень у state
  useEffect(() => {
    if (textForSearch) {
      setStatus('pending');
      const fetchPictures = async () => {
        try {
          const data = await getPictures(textForSearch);
          const pictures = data.hits;
          const totalHits = data.totalHits;

          if (!pictures.length) {
            setError(`Зображення ${textForSearch} відсутні`);
            setStatus('rejected');
          } else {
            setPictures(pictures);
            setTotalHits(totalHits);
            setStatus('resolved');
          }
        } catch (error) {
          setError(error.message);
          setStatus('rejected');
        }
      };

      fetchPictures(textForSearch);
    }
  }, [textForSearch]);

  // // метод отримання та додавання наступних зображень до state
  const addPictures = async page => {
    try {
      const data = await getPictures(textForSearch, page);
      const pictures = data.hits;

      if (!pictures.length) {
        setError(`Зображення ${textForSearch} відсутні`);
        setStatus('rejected');
      } else {
        setPictures(prevState => [...prevState, ...pictures]);
        setStatus('resolved');
      }
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  // метод відкриття модального вікна
  const openModal = event => {
    setUrlBig(event.target.dataset.url);
    setAlt(event.target.alt);
    setShowModal(true);
  };

  // метод закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
  };

  const appearBtnOrNot = status === 'resolved' && totalHits > pictures.length;

  return (
    <Wrapper>
      <Searchbar receiveTextForSearch={receiveTextForSearch} />

      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery pictures={pictures} onOpenModal={openModal} />
      )}
      {status === 'rejected' && <p>{error}</p>}
      {appearBtnOrNot && <Button addPictures={addPictures} />}

      {showModal && (
        <ModalImg closeModal={closeModal}>
          <img src={urlBig} alt={alt} />
        </ModalImg>
      )}

      <ToastContainer autoClose={3000} />
    </Wrapper>
  );
};
