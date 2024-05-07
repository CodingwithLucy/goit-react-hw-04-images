import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoading: false,
      currentPage: 1,
      searchQuery: '',
      largeImage: '',
    };
  }

  fetchImages = async () => {
    if (this.state.currentPage > 42) {
      console.log('Reached maximum page limit');
      return;
    }
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (response.data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong. Try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
    });
  };

  openModal = image => {
    this.setState({ largeImage: image.largeImageURL });
    const instance = basicLightbox.create(`
      <img src="${image.largeImageURL}" width="800" height="600">
    `);
    instance.show();
  };

  closeModal = () => {
    this.setState({ largeImage: '' });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery images={this.state.images} onClick={this.openModal} />
        {this.state.images.length > 0 && !this.state.isLoading && (
          <Button onClick={this.fetchImages} />
        )}
        {this.state.largeImage && (
          <Modal image={this.state.largeImage} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
