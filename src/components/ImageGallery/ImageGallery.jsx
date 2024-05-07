import '../components.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

function ImageGallery({ images, onClick }) {
  return (
    <ul className="ImageGallery">
      {images &&
        images.map(image => (
          <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
        ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
