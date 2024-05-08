import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Loader from './Loader/Loader.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import '../index.css';
import Notiflix from 'notiflix';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const API_KEY = '42562845-73a81eaa8d69c5cacc467e0b5';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');

  const fetchImages = async () => {
    if (currentPage > 42) {
      console.log('Reached maximum page limit');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
  };

  const openModal = image => {
    setLargeImage(image.largeImageURL);
    const instance = basicLightbox.create(`
      <img src="${image.largeImageURL}" width="800" height="600">
    `);
    instance.show();
  };

  const closeModal = () => {
    setLargeImage('');
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onClick={openModal} />
      {images.length > 0 && !isLoading && <Button onClick={fetchImages} />}
      {largeImage && <Modal image={largeImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
