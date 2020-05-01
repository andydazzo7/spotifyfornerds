import SearchBar from "../components/SearchBar/SearchBar";
let access_token;
const clientID = '188724e97b2f44458488091d1e4dd56d';
const redirect = 'http://spotifyfornerds.surge.sh';
let Spotify ={
   
    getAccessToken(){
        if(access_token)
        {
            return access_token;
        }
        //cheack for match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch)
        {
            access_token = accessTokenMatch[1];
            const expires_in = Number(expiresInMatch[1]);
            window.setTimeout(()=> access_token ='', expires_in * 1000);
            window.history.pushState('Access Token', null, '/');
            return access_token;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public user-top-read user-read-currently-playing&redirect_uri=${redirect}`;
            window.location = accessUrl;
        }

    },
    getArtistId(term){
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        const accessUrl =`https://api.spotify.com/v1/search?q=${term}&type=artist`;
        return fetch(accessUrl, {headers:headers}).then(response =>response.json()).then(jsonResponse =>{
            if(jsonResponse.artists){
                return jsonResponse.artists.items[0].id;
            }
             return '';
        });


    },
    getTrackId(term){
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        const accessUrl =`https://api.spotify.com/v1/search?q=${term}&type=track`;
        return fetch(accessUrl,{headers:headers}).then(response =>response.json()).then(jsonResponse =>{
            if(jsonResponse.tracks){
                return jsonResponse.tracks.items[0].id;
            }
             return '';
        });
    },
    savePlaylist(name, uris){
        if(!name || !uris)
        {
           return; 
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        let id='';
        return fetch('https://api.spotify.com/v1/me', {headers:headers}).then(
          response => response.json()
        ).then(jsonResponse =>{
            id = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${id}/playlists`,
             {
                headers : headers,
                method : 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse =>{
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${id}/playlists/${playlistID}/tracks`,
                {
                    headers:headers,
                    method: 'POST',
                    body: JSON.stringify({uris:uris})
                })
            })
        });

    },
    getStats(id){
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        const url=`https://api.spotify.com/v1/audio-features/${id}`
        return fetch(url, {headers:headers}).then(response=>response.json()).then(jsonResponse=>{
            return{
                accousticness:jsonResponse.acousticness,
                liveness: jsonResponse.liveness,
                energy: jsonResponse.energy,
                danceability: jsonResponse.danceability

            }
        })
    },
    getTopArtists(mode){
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        const url=`https://api.spotify.com/v1/me/top/artists?time_range=${mode}&limit=10`;
        return fetch(url, {headers:headers}).then(response=>response.json()).then(jsonResponse=>
            {
                if(jsonResponse.items){
                    return jsonResponse.items.map(artist =>({
                        id: artist.id,
                        name: artist.name,
                        img: artist.images[0].url
                    }));
                }
            })
    },
    currentlyPlaying(){
        const accessToken = Spotify.getAccessToken();
        const current = `https://api.spotify.com/v1/me/player/currently-playing`;
        const headers = {
            Authorization :`Bearer ${accessToken}`
        }
        return fetch(current, {headers:headers}).then(response=>{
            console.log(response);
            if(!response)
            {
                return ''
            }
            return response.json()
        }).then(jsonResponse=>{
            console.log(jsonResponse);
            if(jsonResponse.item)
            {
            return {
                id: jsonResponse.item.id,
                name: jsonResponse.item.name,
                artist: jsonResponse.item.artists[0].name,
                album: jsonResponse.item.album.name,
                img: jsonResponse.item.album.images[0].url
            }
        }
        return '';
        })


    },
    search(term, mode, recArtist, recTrack, dance, accoustic, energy,live){
      const accessToken = Spotify.getAccessToken();
      let accessUrl;
      console.log(live);
      if(mode === 'normal'){
          accessUrl = `https://api.spotify.com/v1/search?type=track&q=${term}&limit=50`;
      }
      else if(mode ==='reccomendations'){
          if(recTrack && recArtist){accessUrl = `https://api.spotify.com/v1/recommendations?&seed_tracks=${recTrack}&seed_artists=${recArtist}&market=US&min_danceability=${dance}&min_accousticness=${accoustic}&min_energy=${energy}&min_liveness=${live}&limit=100`;
        }
        else if(recTrack){
            accessUrl=`https://api.spotify.com/v1/recommendations?&seed_tracks=${recTrack}&market=US&min_danceability=${dance}&min_accousticness=${accoustic}&min_energy=${energy}&min_liveness=${live}&limit=100`;
        }
        else{
            accessUrl=`https://api.spotify.com/v1/recommendations?seed_artists=${recArtist}&market=US&min_danceability=${dance}&min_accousticness=${accoustic}&min_energy=${energy}&min_liveness=${live}&limit=100`;
        }
      }
      else{
          accessUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${mode}&limit=50`
      }
      return fetch(accessUrl, {
          headers: { 
             Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        console.log(jsonResponse);
        if(mode==="normal")
        {
        if (jsonResponse.tracks) {
            
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            title: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri : track.uri,
            img: track.album.images[0].url
          }));
        }
        else{
            return [];
        }
    }else if(mode==="reccomendations")
    {
    if (jsonResponse.tracks) {
        
      return jsonResponse.tracks.map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri : track.uri,
        img: track.album.images[0].url
      }));
    }
    else{
        return [];
    }}else{
        if(jsonResponse.items){
            return jsonResponse.items.map(track =>({
                id: track.id,
                title: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri : track.uri,
                img: track.album.images[0].url
            }));
        }
    }
       
      });
    }
}
export default Spotify;