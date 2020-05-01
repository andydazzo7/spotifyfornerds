import React from 'react'
import './current.css';
import { tsThisType } from '@babel/types';
export class Current extends React.Component{
    constructor(props){
        super(props)
        this.state={
            track: [],
            id:0,
            attributes:[]
        }
        this.getStats= this.getStats.bind(this);
    }
    componentDidMount(){
        this.props.track().then(result =>
            {
                console.log(result);
                this.setState({track:result, id :result.id})
            }
            )
    }
    getStats(){
        this.props.stats(this.state.id).then(res=>{
            this.setState({attributes: res})
        });
    }
    render(){
        return(
            <div className="Oh">
            <div className="current">
            <h2>You are currently Playing this Track</h2>
              <h3>{this.state.track.name}</h3>
              <p>{this.state.track.artist} | {this.state.track.album}</p>
              <img src={this.state.track.img}></img>
              <button onClick={this.getStats}>GET STATS FOR THIS SONG</button>
              <p className="Attr">Energy {this.state.attributes.energy} | Liveness {this.state.attributes.liveness} | Danceability  {this.state.attributes.danceability} | Acouticness {this.state.attributes.accousticness} </p>
            </div>
           
          </div>
        );
    }
}
export default Current;