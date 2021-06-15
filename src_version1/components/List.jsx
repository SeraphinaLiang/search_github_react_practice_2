import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import {Row} from "react-bootstrap";

export default class List extends Component {
    render() {
        const {users, isFirst, isLoading, err} = this.props
        return (
            <Row>
                {
                    isFirst ? <h2>Hello, type something...</h2> :
                        isLoading ? <h2>Loading...</h2> :
                            err ? <h2 style={{color:'red'}}>{err}</h2> :
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
