import React, {Component} from 'react'
import {InputGroup, FormControl, Button, Badge} from 'react-bootstrap'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {

    searchInfo = React.createRef()

    search = () => {
        const msg = this.searchInfo.current.value
        if (msg.trim() === '') return

        // 消息发布，PubSub.publish('topic', data)
        PubSub.publish('notice', {isFirst: false, isLoading: true})
        //this.props.updateUser({isFirst: false,isLoading: true})

        axios.get(`https://api.github.com/search/users?q=${msg}`).then(
            response => {
                const users = response.data.items
                //this.props.updateUser({isLoading: false,users:users})
                PubSub.publish('notice', {isLoading: false, users: users})
            },
            error => {
                //this.props.updateUser({isLoading: false,err:error.message})
                PubSub.publish('notice', {isLoading: false, err: error.message})
            }
        )
    }

    pressEnter = (event) => {
        const {keyCode} = event
        if (keyCode !== 13) return
        else this.search()
    }

    render() {
        return (
            <div>
                <h2>
                    Search for <Badge variant="secondary"> Github Users</Badge>
                </h2>
                <InputGroup className="mb-3">
                    <FormControl
                        ref={this.searchInfo}
                        placeholder="Keywords ... "
                        aria-describedby="basic-addon2"
                        onKeyUp={this.pressEnter}
                    />
                    <InputGroup.Append>
                        <Button variant="secondary" onClick={this.search}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}
