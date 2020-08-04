import React from 'react'
import './Artist.css'
import {ArtistModal} from '../ArtistModal/ArtistModal'
 export class Artist extends React.Component{
    render(){
        return(
            <div className="Artist">
           
            <img src={this.props.artist.img}></img>
            <div className="artist">
            <ArtistModal artist = {this.props.artist.name} className='list'/>
            </div>
          </div>
        );
    }
 }