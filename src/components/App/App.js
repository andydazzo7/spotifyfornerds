import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'
export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playListName:'', 
      playlistTracks:[],
      mode :'normal'
    }
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist  = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
     this.handleMode = this.handleMode.bind(this)
  }
  addTrack(track){
    if(!(this.state.playlistTracks.includes(track.id)))
    {
        const tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks : tracks});
    }
  }
  removeTrack(track){
    const tracks = this.state.playlistTracks;
    const newTracks = tracks.filter(track1 =>{
      return track1.id !== track.id
    });
    this.setState({playlistTracks: newTracks});
  }
  updatePlaylistName(name){
    this.setState({playListName:name});
  }
  savePlaylist(){
    
    const trackUris = this.state.playlistTracks.map(track =>track.uri)
    Spotify.savePlaylist(this.state.playListName, trackUris).then(
      ()=>{
        this.setState({playListName: 'New Playlist',
      playlistTracks: []})
      }
    )
  }
  search(searchTerm, mode){
    Spotify.search(searchTerm, mode).then(results =>{
      this.setState({searchResults : results})
    });
  }
  handleMode(e){
    this.setState({mode: e.target.value});
  }
  render(){
      return (
        <div>
      <h1>Spotify for <span className="highlight">Nerds</span></h1>
      <div className="App">
        <h1>Search for Tracks and Make a Playlist</h1>
        <select placeholder="Choose your mode" onChange={this.handleMode}>
          <option value="normal">Search all of Spotify</option>
          <option value="short_term">Automatically search your top songs of the last 4 weeks</option>
          <option value="medium_term">Automatically search your top songs of the last 6 months</option>
          <option value="long_term">Automatically search of your top songs of all time</option>
        </select>
        <SearchBar onSearch={this.search} mode={this.state.mode}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist name={this.state.playListName} tracks={this.state.playlistTracks} onRemoval={this.removeTrack} onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
        </div>
      </div>
    </div>
      );
  }
}

export default App;
