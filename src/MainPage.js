import React, {useState, useEffect} from 'react';
import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import './TradeInfo'
import TradeInfo from './TradeInfo';


const MainPage = () => {

    const [trades, setTrades] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [deleteEntry, setDeleteEntry] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if(deleteEntry){
        var newTrades = []
        for (let index = 0; index < trades.length; index++) {
            if(index != currentIndex){
                newTrades.push(trades[index])
            }
        }
        console.log(currentIndex)
        setTrades(newTrades)
        console.log(trades)
        setDeleteEntry(false);
        
    }

    return (
        <div>
        <Container>
            <Button onClick={() => addNewTrade()}>Add New Row</Button>
        </Container>
        <Container>
            <Form >
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Col>
                        <Form.Label>
                            stock name
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            stock initial price
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            quantity bought
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            current price
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            ROI
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>
                            Delete Entry
                        </Form.Label>
                    </Col>
                </Form.Group>
                {trades.map((trade, i) => (
                    <TradeInfo trade={trade} index={i} setCurrentIndex={setCurrentIndex} setDeletEntry={setDeleteEntry}/>
                ))}
            </Form>
        </Container>
        </div>
    )

    function addNewTrade(){
        const newTrade = {
            "name": "",
            "initial": 0,
            "current": 5,
            "quantity": 0
        }
        trades.push(newTrade);
        setRefresh(!refresh);
        print(trades)
    }

    function print(m){
        console.log(m);
    }

}



export default MainPage;