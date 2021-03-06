import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import {Row} from "react-bootstrap";
import PubSub from 'pubsub-js'

export default class List extends Component {

    // 数据驱动状态的更新，通过改变state的状态，实现更新页面数据
    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        err: '',
    }

    componentDidMount() {
        // 消息订阅 PubSub.subscribe(‘topic’,data)
        this.token = PubSub.subscribe('notice', (_, stateObj) => {
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        // 取消订阅  PubSub.unsubscribe(token)
        PubSub.unsubscribe(this.token)
    }

    render() {
        const {users, isFirst, isLoading, err} = this.state
        return (
            <Row>
                {
                    isFirst ? <h2>Hello, type something...</h2> :
                        isLoading ? <h2>Loading...</h2> :
                            err ? <h2 style={{color: 'red'}}>{err}</h2> :
                                users.map((user) => {
                                    return (
                                        <Card key={user.id} style={{
                                            width: '16rem',
                                            height: '16rem',
                                            marginBottom: 60,
                                            marginLeft: 10
                                        }}>
                                            <a rel="noreferrer" target="_blank" href={user.html_url}>
                                                <Card.Img variant="top" src={user.avatar_url}/>
                                            </a>
                                            <Card.Body>
                                                <Card.Title>{user.login}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    )
                                })
                }
            </Row>
        )
    }
}
