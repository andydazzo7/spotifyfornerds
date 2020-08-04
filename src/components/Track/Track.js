import React from 'react';
import './Track.css';
import Spotify from '../../util/Spotify'
import { Button } from 'react-bootstrap';
import Q from './q.png'

export class Track extends React.Component{
    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.addToQueue = this.addToQueue.bind(this)
    }
    renderActions(isRemoval)
    {
        if(isRemoval)
        {
            return( <button className='Track-action' onClick={this.removeTrack}>-</button>);
        }
        else{
            return( <button className='Track-action' onClick={this.addTrack}>+</button>);
        }
    }
    addTrack(){
      this.props.onAdd(this.props.track);
    }
    removeTrack(){
        this.props.onRemoval(this.props.track);
    }
    addToQueue(){
        console.log(this.props.track.uri)
        return Spotify.addToQueue(this.props.track.uri)
      }
    render(){
        return(
            <div className="Track">
            <div className="Track-information">
              <h3>{this.props.track.title}</h3>
              <p>{this.props.track.artist} | {this.props.track.album}</p>
              
            </div>
            <img src={this.props.track.img}></img>
          
            < img src={Q} style={{height:15, width:13, marginLeft:10}} onClick={this.addToQueue} className='q'/> 
            {this.renderActions(this.props.isRemoval)}
          
          </div>
        );
    }
}