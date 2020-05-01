import React from 'react';
import './SearchBar.css';
export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state ={
            searchTerm: ''
        }
        this.search = this.search.bind(this);
    }
    handleTermChange(e){
        this.setState({searchTerm:e.target.value})
    }
    search(){
        console.log(this.props.live);
        this.props.onSearch(this.state.searchTerm, this.props.mode, this.props.recArtist, this.props.recTrack, this.props.dance, this.props.accoustic, this.props.energy, this.props.live);
    }
    render(){
        return(
            <div className="SearchBar">
                <p>Only Use this to Search all of Spotify, for Other Commands, Just Press Search</p>
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
            <button className="SearchButton" onClick={this.search}>SEARCH </button>
            </div>
        );
    }

}
export default SearchBar