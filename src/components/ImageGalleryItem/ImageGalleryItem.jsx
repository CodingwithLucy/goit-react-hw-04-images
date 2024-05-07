import '../components.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={() => onClick(image)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
