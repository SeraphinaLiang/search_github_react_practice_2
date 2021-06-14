import './App.css';
import React, {Component} from 'react'
import Search from "./components/Search";
import List from "./components/List";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

    state = {
        users:[],
        isFirst:true,
        isLoading:false,
        err:'',
    }

    updateUser=(stateObj)=>{
        this.setState(stateObj)
    }

    render(){
        return (
            <div className="App">
                <Search updateUser={this.updateUser}/>
                <List {...this.state}/>
            </div>
        )
    }
}
