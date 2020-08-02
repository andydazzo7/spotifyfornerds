import React from 'react'
import './current.css';
import { tsThisType } from '@babel/types';
export class Current extends React.Component{
    constructor(props){
        super(props)
        this.state={
            track: this.props.track,
            id:this.props.id,
            attributes:[]
        }
        this.getStats= this.getStats.bind(this);
    }
    componentDidMount(){
        this.getStats()
        setInterval(this.getStats, 1000)
    }
    getStats(){
        this.props.stats(this.props.id).then(res=>{
            this.setState({attributes: res})
        });
    }
    render(){
        return(
            <div className="Oh">
            <div className="current">
            <h2>You are currently Playing this Track</h2>
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artist} | {this.props.track.album}</p>
              <img src={this.props.track.img}></img>
              <div className="skipper" style={{textAlign:'center'}}>
            <button style={{display: 'inline'}} onClick={this.props.last}>Previous Track</button>
            <button style={{display: 'inline-block', marginLeft:30, left:25}}onClick={this.props.skip}>Next Track</button>
              </div>
              <button onClick={this.getStats}>GET STATS FOR THIS SONG</button>
              <p className="Attr">Energy {this.state.attributes.energy} | Liveness {this.state.attributes.liveness} | Danceability  {this.state.attributes.danceability} | Acouticness {this.state.attributes.accousticness} </p>
            </div>
           
          </div>
        );
    }
}
export default Current;