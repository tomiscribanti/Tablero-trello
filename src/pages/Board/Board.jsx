import React, { useState, useEffect } from 'react';
import Board, { moveCard, moveColumn, removeCard, addCard } from '@asseinfo/react-kanban';
import "@asseinfo/react-kanban/dist/styles.css";
import useBoard from '../../store/Board';
import "./Board.css";
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import AddCardModal from '../../components/AddCardModal/AddCardModal';

const BoardPage = () => {
  const { board, setBoard } = useBoard();
  const [modalOpened, setModalOpened] = useState(false);
  const [editingCard, setEditingCard] = useState(null); 

  useEffect(() => {
    const savedBoard = JSON.parse(localStorage.getItem('kanbanBoard'));
    if (savedBoard) {
      setBoard(savedBoard);
    }
  }, [setBoard]);

  useEffect(() => {
    localStorage.setItem('kanbanBoard', JSON.stringify(board));
  }, [board]);

  const handleColumnMove = (_card, source, destination) => {
    const updatedBoard = moveColumn(board, source, destination);
    setBoard(updatedBoard);
  };

  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  };

  const getColumn = (card) => {
    const column = board.columns.find((column) => column.cards.includes(card));
    return column || {}; 
  };

  const getGradient = (card) => {
    const column = getColumn(card);
    const title = column.title;
    if (title === "Pendiente") {
      return {
        background: "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 189, 220) 163.54%)",
      };
    } else if (title === "En proceso") {
      return {
        background: "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(220, 48, 48) 163.54%)",
      };
    } else if (title === "Completeda") {
      return {
        background: "linear-gradient(65.35deg, rgba(65, 65, 65, 0.67) -1.72%, rgba(48, 220, 86) 163.54%)",
      };
    } else if (title === "Backlog") {
      return {
        background: "linear-gradient(65.35deg, rgba(65, 65,65, 0.67) -1.72%,rgba(134, 48, 220) 163.54%)",
      };
    }
  };

  const handleCardAdd = (title, detail, image) => {
    if (editingCard) {
      const updatedCard = { ...editingCard, title, description: detail, image };
      const updatedBoard = { ...board };
      const columnIndex = updatedBoard.columns.findIndex((column) => column.cards.includes(editingCard));
      const cardIndex = updatedBoard.columns[columnIndex].cards.findIndex((card) => card.id === editingCard.id);
      updatedBoard.columns[columnIndex].cards[cardIndex] = updatedCard;
      setBoard(updatedBoard);
      setEditingCard(null);
    } else {
      const card = {
        id: new Date().getTime(),
        title,
        description: detail,
        image,
      };
  
      const updatedBoard = addCard(board, board.columns[0], card);
      setBoard(updatedBoard);
    }
    setModalOpened(false);
  };
    

  const handleCardRemove = (card) => {
    const column = getColumn(card);
    const updatedBoard = removeCard(board, column, card);
    setBoard(updatedBoard);

    if (editingCard && editingCard.id === card.id) {
      setEditingCard(null);
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setModalOpened(true);
  };

  return (
    <div className="board-container">
      <span>Tablero organizador </span>
      
      <Board
        allowAddColumn
        allowRenameColumn
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onColumnDragEnd={handleColumnMove}
        renderCard={(props) => (
          <div key={props.id} className='kanban-card' style={getGradient(props)}>
            <div>
              <span>{props.title}</span>
              <button
                className='remove-button'
                type='button'
                onClick={() => handleCardRemove(props)}
              >
                <RxCross2 color="white" size={15} />
              </button>
              <button
                className='edit-button'
                type='button'
                onClick={() => handleEditCard(props)}
              >
                Editar
              </button>
            </div>
            {props.image && <img src={props.image} alt="Card" />}
            <span>{props.description}</span>
          </div>
        )}
        renderColumnHeader={(props) => (
          <div  key={props.id} className='column-header'>
            <span>{props.title}</span>
            <IoMdAdd
              color="white"
              size={25}
              title="Añadir tarjeta"
              onClick={() => setModalOpened(true)}
            />
            <AddCardModal visible={modalOpened} handleCardAdd={handleCardAdd} onClose={() => setModalOpened(false)} editingCard={editingCard} />

          </div>
        )}
      >
        {board}
      </Board>
    </div>
  );
};

export default BoardPage;