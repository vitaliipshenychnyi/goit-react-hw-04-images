import { GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ pictures, onOpenModal }) => {
  return (
    <>
      {pictures &&
        pictures.map(picture => (
          <GalleryItem key={picture.id}>
            <img
              src={picture.webformatURL}
              alt={picture.tags}
              data-url={picture.largeImageURL}
              onClick={onOpenModal}
            />
          </GalleryItem>
        ))}
    </>
  );
};

// *******************************************************
// ПОПЕРЕДНІЙ КОД

// import { Component } from 'react';
// import { GalleryItem } from './ImageGalleryItem.styled';
// import { ModalImg } from 'components/modal/Modal';

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//     urlBig: '',
//     alt: '',
//   };

//   // метод зміни стану модального вікна
//   toggleModal = () => {
//     this.setState({ showModal: !this.state.showModal });
//   };

//   // метод відкриття модального вікна
//   openModal = event => {
//     this.setState({ urlBig: event.target.dataset.url });
//     this.toggleModal();
//   };

//   render() {
//     const { error, pictures } = this.props;
//     const { showModal, urlBig, alt } = this.state;

//     return (
//       <>
//         {error && <p>{error.message}</p>}

//         {pictures &&
//           pictures.map(picture => (
//             <GalleryItem key={picture.id}>
//               <img
//                 src={picture.webformatURL}
//                 alt={picture.tags}
//                 data-url={picture.largeImageURL}
//                 onClick={this.openModal}
//               />
//             </GalleryItem>
//           ))}

//         {showModal && (
//           <ModalImg closeModal={this.toggleModal}>
//             <img src={urlBig} alt={alt} />
//           </ModalImg>
//         )}
//       </>
//     );
//   }
// }
