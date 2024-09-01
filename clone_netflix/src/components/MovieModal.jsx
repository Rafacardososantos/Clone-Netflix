import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import './MovieModal.css'


const ModalContent = styled.div`
  text-align: center;
  img {
    width: 100%;
    height: 70vh;
    margin-bottom: 15px;
  }
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const MovieModal = ({show, onHide, movie}) => {
    return(
        // <div className="modal" show={show} onHide={onHide}>
        //     <div className="modal--container">
        //         <span className="close">&times;</span>
        //         <h2>{movie.original_name}</h2>
        //     </div>
            
        // </div>
        <>
        <Overlay/>
        <ModalContainer>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{movie.title || movie.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalContent>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title || movie.name} Poster`} />
                <p>{movie.overview}</p>
                </ModalContent>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </ModalContainer>
    </>
    )
}

export default MovieModal;