import React, { useState, useEffect } from 'react';
import Rodal from 'rodal';
import "rodal/lib/rodal.css";
import css from './AddCardModal.module.css';

const AddCardModal = ({ visible, onClose, handleCardAdd, editingCard }) => {
  const customStyles = {
    background: "rgb(58 58 58)",
    padding: "20px",
    width: "50%",
    top: "-3rem",
    height: "fit-content",
    maxWidth: "40rem"
  };

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingCard) {
      setTitle(editingCard.title);
      setDetail(editingCard.description);
      setImage(editingCard.image);
    } else {
      setTitle('');
      setDetail('');
      setImage(null);
    }
  }, [editingCard]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (title.trim() === '' || detail.trim() === '') {
      // Mostrar mensaje de error o realizar alguna acción de validación
      return;
    }

    handleCardAdd(title, detail, image);
    setDetail('');
    setTitle('');
    setImage(null);
  };

  return (
    <Rodal
      customStyles={customStyles}
      visible={visible}
      onClose={onClose}
      closeOnEsc={false}
      closeMaskOnClick={false}
    >
      <div className={css.container}>
        <div>
          <span className={css.label}>Titulo de la tarea:</span>
          <input
            type="text"
            className={css.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <span className={css.label}>Descripcion:</span>
          <textarea
            rows={10}
            className={css.input}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
            pattern=".{1,}"
          />
        </div>

        <div>
          <span className={css.label}>Imagen:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div class="delete-img">
              <img src={image} alt="Preview" className={css.imagePreview} />
              <button className={css.removeImageButton} onClick={handleRemoveImage}>
                Borrar imagen
              </button>
            </div>
          )}
        </div>

        <button
          disabled={title.trim() === '' && detail.trim() === ''}
          className={css.saveButton}
          onClick={handleSubmit}
        >
          {editingCard ? 'Guardar' : 'Agregar'}
        </button>
      </div>
    </Rodal>
  );
};

export default AddCardModal;