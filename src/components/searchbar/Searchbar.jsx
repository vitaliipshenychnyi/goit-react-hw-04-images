import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Form,
  Header,
  BtnSearchForm,
  BtnLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ receiveTextForSearch }) => {
  const [text, setText] = useState('');

  // отримання значення з поля введення та запис до state
  const handleSearch = ({ currentTarget: { value } }) => {
    setText(value.toLowerCase());
  };

  // функція відправки даних до App
  const handleSubmit = event => {
    event.preventDefault();
    if (text.trim() === '') {
      return toast.warn('Ви не ввели текст для пошуку!');
    }
    receiveTextForSearch(text); // прокидання до Арр state
    setText('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <BtnSearchForm type="submit">
          <BtnLabel>Search</BtnLabel>
        </BtnSearchForm>

        <Input
          type="text"
          name="text"
          value={text}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  receiveTextForSearch: PropTypes.func.isRequired,
};
