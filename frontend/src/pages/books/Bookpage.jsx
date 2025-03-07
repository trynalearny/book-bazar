import React from 'react';
import { useParams } from 'react-router-dom';
import SingleBook from './SingleBook';
import Bookscard from './Bookscard';

const BookPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-5">
      <SingleBook />
      <Bookscard />
    </div>
  );
};

export default BookPage;
