import React, {useState, useEffect} from 'react';
import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const TradeInfo = ({trade}) => {

    const [refresh, setRefresh] = useState(false);

    return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col>
                <Form.Control placeholder={trade.name} onChange={(event) => setStockNameFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control name="money" type="number" placeholder={trade.initial} onChange={(event) => setInitialPriceFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control type="number" placeholder={trade.quantity} onChange={(event) => setQuantityFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control type="number" placeholder={trade.current} onChange={(event) => setCurrentPriceFromInput(event)}/>
            </Col>
            <Col>
                <Form.Label>
                    {getROI()}
                </Form.Label>
            </Col>
            
        </Form.Group>
    );

    
    function setStockNameFromInput(event){
        trade.name = event.target.value
        setRefresh(!refresh)
    }

    function setInitialPriceFromInput(event){
        trade.initial = event.target.value
        setRefresh(!refresh)
    }

    function setQuantityFromInput(event){
        trade.quantity = event.target.value
        setRefresh(!refresh)
    }

    function setCurrentPriceFromInput(event){
        trade.current = event.target.value
        setRefresh(!refresh)
    }

    function getROI(){
        return (trade.current - trade.initial) * trade.quantity
    }


}

export default TradeInfo;