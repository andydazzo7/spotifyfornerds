import React from 'react'
import './Artist.css'
 export class Artist extends React.Component{
    render(){
        return(
            <div className="Artist">
            
            <img src={this.props.artist.img}></img>
            <div className="artist">
              <p className='name'>{this.props.artist.name}</p>
            </div>
          </div>
        );
    }
 }