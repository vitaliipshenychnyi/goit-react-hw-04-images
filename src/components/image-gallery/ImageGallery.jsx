import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/image-gallery-item/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ pictures, error, onOpenModal }) => {
  return (
    <GalleryList>
      <ImageGalleryItem pictures={pictures} error={error} onOpenModal={onOpenModal}/>
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};

// *******************************************************
// ПОПЕРЕДНІЙ КОД

// import PropTypes from 'prop-types';
// import { Component } from 'react';
// import { ImageGalleryItem } from 'components/image-gallery-item/ImageGalleryItem';
// import { getPictures } from 'api/api';
// import { Loader } from 'components/loader/Loader';
// import { Button } from 'components/button/Button';
// import { GalleryList } from './ImageGallery.styled';

// export class ImageGallery extends Component {
//   state = {
//     pictures: null,
//     error: null,
//     status: 'idle',
//     totalHits: null,
//   };

//   // метод додавання зображень до state
//   addPictures = async page => {
//     const { textForSearch } = this.props;
//     try {
//       const data = await getPictures(textForSearch, page);
//       const pictures = data.hits;

//       if (!pictures.length) {
//         this.setState({
//           error: `Зображення ${textForSearch} відсутні`,
//           status: 'rejected',
//         });
//       } else {
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...pictures],
//           status: 'resolved',
//         }));
//       }
//     } catch (error) {
//       this.setState({ error: error.message, status: 'rejected' });
//     }
//   };

//   // метод передавання отриманих зображень до state
//   async componentDidUpdate(prevProps, _) {
//     const { textForSearch } = this.props;

//     if (prevProps !== this.props) {
//       this.setState({ status: 'pending' });
//       try {
//         const data = await getPictures(textForSearch);
//         const pictures = data.hits;
//         const totalHits = data.totalHits;

//         if (!pictures.length) {
//           this.setState({
//             error: `Зображення ${textForSearch} відсутні`,
//             status: 'rejected',
//           });
//         } else {
//           this.setState({ pictures, status: 'resolved', totalHits });
//         }
//       } catch (error) {
//         this.setState({ error: error.message, status: 'rejected' });
//       }
//     }
//   }

//   render() {
//     const { pictures, error, status, totalHits } = this.state;

//     if (status === 'pending') return <Loader />;
//     if (status === 'resolved')
//       return (
//         <>
//           <GalleryList>
//             <ImageGalleryItem pictures={pictures} error={error} />
//           </GalleryList>
//           {totalHits > pictures.length && (
//             <Button morePictures={this.addPictures} />
//           )}
//         </>
//       );
//     if (status === 'rejected') return <p>{error}</p>;
//   }
// }

// ImageGallery.propTypes = {
//   textForSearch: PropTypes.string.isRequired,
// };