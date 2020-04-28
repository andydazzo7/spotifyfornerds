import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/Tracklist';
import { throwStatement } from '@babel/types';

export class Playlist extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e){
      this.props.onNameChange(e.target.value);
    }
    render(){
        return(
            <div className="Playlist">
            <input defaultValue="New Playlist" onChange={this.handleNameChange}/>
            <TrackList tracks={this.props.tracks} onRemoval={this.props.onRemoval} isRemoval={true}/>
            <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
          </div>       
        );
    }
}

