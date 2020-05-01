import React from 'react';
import {Artist} from '../Artist/Artist';
export class ArtistList extends React.Component{
    componentDidMount(){
        this.props.artists.map(artist=>{
            return <Artist artist={artist}/>
        })
    }
    render(){
        return(
            <div className="AList">
                {this.props.artists.map(artist =>{
                    return <Artist artist={artist}/>;
                })
                }
            </div>
        );
    }
}
export default ArtistList;