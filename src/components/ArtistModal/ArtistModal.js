import React,{useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import Spotify from '../../util/Spotify';
import {TrackList} from '../TrackList/Tracklist'
import {ArtistList} from '../ArtistList/ArtistList'
import './modal.css'
export function ArtistModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [songs, setSongs] = useState([])
    const [artists, setArists] = useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        Spotify.getArtistTopTracks(props.artist).then(results=>setSongs(results));
        Spotify.getRelatedArtists(props.artist).then(results=>setArists(results));
    });
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor:'#010c3f', width:'150px', fontSize:'14px'}}>
          {props.artist}
        </Button>
        
        <Modal show={show} onHide={handleClose} className='modal-artist'>
            
          <Modal.Header closeButton>
            <Modal.Title>{props.artist}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Top Tracks</Modal.Body>
          <TrackList tracks={songs}/>
          <Modal.Body>Related Artists</Modal.Body>
          <ArtistList artists={artists}/>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }