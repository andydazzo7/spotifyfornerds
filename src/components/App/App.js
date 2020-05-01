import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'
import {Current} from '../current/current'
import AritstList from '../ArtistList/ArtistList'
export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playListName:'', 
      playlistTracks:[],
      mode :'normal',
      recArtist:'',
      recTrack:'',
      dance:'0.0',
      accoustic:'0.0',
      energy:'0.0',
      liveness:'0.0',
      topArtists: []
    }
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist  = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
     this.handleMode = this.handleMode.bind(this)
     this.handleRecArtist = this.handleRecArtist.bind(this);
     this.handleRecTrack = this.handleRecTrack.bind(this);
     this.handleDance = this.handleDance.bind(this);
     this.handleAccoustic = this.handleAccoustic.bind(this);
     this.handleEnergy=this.handleEnergy.bind(this);
     this.handleLive=this.handleLive.bind(this);
     this.getCurrent= this.getCurrent.bind(this);
     this.getTopArtists = this.getTopArtists.bind(this);
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
  search(searchTerm, mode, recArtist, recTrack, accoustic, dance, energy, live){
    Spotify.search(searchTerm, mode, recArtist, recTrack, accoustic, dance,energy,live).then(results =>{
      this.setState({searchResults : results})
    });
  }
  getCurrent(){
     return Spotify.currentlyPlaying();
  }
  getStats(id){
    return Spotify.getStats(id);
  }
  handleMode(e){
    this.setState({mode: e.target.value});
  }
  handleRecArtist(e){
    let id=Spotify.getArtistId(e.target.value).then(result =>{
      this.setState({recArtist: result});
    })

  }
  handleRecTrack(e){
    let id=Spotify.getTrackId(e.target.value).then(result =>{
      this.setState({recTrack: result});
    })
  }
  handleAccoustic(e){
    let accoustic1 = e.target.value;
    if(Number(accoustic1) >1.0 || Number(accoustic1) < 0){
      accoustic1 = 0.0;

    }
    this.setState({accoustic:accoustic1});
  }
  handleDance(e){
    let dance1 = e.target.value;
    if(Number(dance1) >1.0 || Number(dance1) < 0){
      dance1 = 0.0;

    }
    this.setState({dance:dance1});
  }
  handleEnergy(e){
    let energy1 = e.target.value;
    if(Number(energy1) >1.0 || Number(energy1) < 0){
      energy1 = 0.0;
    }
    this.setState({energy:energy1});
  }
  getTopArtists(e){
    return Spotify.getTopArtists(e.target.value).then(results=>this.setState({topArtists: results}));
  }
  handleLive(e)
  {
    let live1 = e.target.value;
    if(Number(live1) >1.0 || Number(live1) < 0){
      live1 = 0.0;
    }
    this.setState({liveness:live1});
  }
  render(){
      return (
        <div className="a">
      <h1>Spotify for <span className="highlight">Nerds</span></h1>
      <div className="App">
        <h1>Search for Tracks and Make a Playlist</h1>
        <Current track={this.getCurrent} stats={this.getStats}/>
        <h2 className='inspo'>Need Some Inspiration? See your Top Artists!</h2>
        <select className='art' onChange={this.getTopArtists}>
          <option value='short_term'>Use This to Select the Time Period of Your Top Artists (will default to 4 weeks)</option>
          <option value="short_term">Get your Top 10 artists of the past 4 weeks</option>
          <option value="medium_term">Get your Top 10 artists of the past 6 months</option>
          <option value="long_term">Get your Top 10 artists of all time</option>
        </select>
        <AritstList artists={this.state.topArtists}/>
        <select className='mode' placeholder="Choose your mode" onChange={this.handleMode}>
          <option value="normal">Search all of Spotify</option>
          <option value="short_term">Automatically search your top songs of the last 4 weeks</option>
          <option value="medium_term">Automatically search your top songs of the last 6 months</option>
          <option value="long_term">Automatically search of your top songs of all time</option>
          <option value='reccomendations'>Automatically get a list of reccomendations from Spotify</option>
        </select>
       
        <input id='song' className='rec'placeholder="Choose a Song to Base Reccomendations Off Of"onChange={this.handleRecTrack}></input>
        <input id='artist' className='rec' placeholder="Choose an Artist to Get Reccomendations Off Of"onChange={this.handleRecArtist}></input>
        <input id='dance'className='rec' placeholder="How Dancable is the Track (0-1)?"onChange={this.handleDance}></input>
        <input id='accoustic' className='rec' placeholder="How Acoustic is the Track(0-1)?"onChange={this.handleAccoustic}></input>
        <input id='energy' className='rec' placeholder="How Energetic is the Track(0-1)?" onChange={this.handleEnergy}></input>
        <input id='live' className='rec' placeholder="How Live (audience) is the Track(0-1)?" onChange={this.handleLive}></input>
        
        <SearchBar onSearch={this.search} mode={this.state.mode} recArtist={this.state.recArtist} recTrack={this.state.recTrack} dance={this.state.dance}
        accoustic ={this.state.accoustic} energy={this.state.energy} live={this.state.liveness}/>
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
