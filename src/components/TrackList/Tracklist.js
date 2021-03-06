import React from 'react';
import './Tracklist.css';
import {Track} from '../Track/Track';
export class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                {this.props.tracks.map(track =>{
                    return <Track track={track} onAdd={this.props.onAdd} onRemoval={this.props.onRemoval}
                    isRemoval={this.props.isRemoval}/>;
                })
                }
            </div>
        );
    }
}