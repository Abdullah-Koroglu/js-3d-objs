import React , {Component}from 'react';
import './App.css';
import Obj from './components/Obj'
import Header from './components/Header'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      sceneName:'naber'
    }
  }
  render(){
    return (
    <div className="App">
      <Header/>
      <Obj sceneName={this.state.sceneName}/>
    </div>
  );
}}

export default App;
