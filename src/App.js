import './App.css';
import React, {Component} from 'react'
import Search from "./components/Search";
import List from "./components/List";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {

    /**
     *增加了消息发表与订阅，实现了兄弟组件间的通信
     */
    render() {
        return (
            <div className="App">
                <Search/>
                <List/>
            </div>
        )
    }
}
