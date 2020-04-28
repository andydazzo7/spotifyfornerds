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
        this.props.onSearch(this.state.searchTerm, this.props.mode);
    }
    render(){
        return(
            <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
            <button className="SearchButton" onClick={this.search}>SEARCH </button>
            </div>
        );
    }

}
export default SearchBar