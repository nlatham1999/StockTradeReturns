import React, {useState, useEffect} from 'react';
import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const TradeInfo = ({trade, index, setDeletEntry, setCurrentIndex}) => {

    const [refresh, setRefresh] = useState(false);

    return (
        <Form.Group as={Row} controlId="formHorizontalEmail">
            <Col>
                <Form.Control value={trade.name} onChange={(event) => setStockNameFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control name="money" type="number" value={trade.initial} onChange={(event) => setInitialPriceFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control type="number" value={trade.quantity} onChange={(event) => setQuantityFromInput(event)}/>
            </Col>
            <Col>
                <Form.Control type="number" value={trade.current} onChange={(event) => setCurrentPriceFromInput(event)}/>
            </Col>
            <Col>
                <Form.Label>
                <Form.Control type="number" disabled={true} placeholder={getROI()} />
                </Form.Label>
            </Col>
            <Col>
                <Button onClick={() => deleteEntry()}>delete</Button>
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
        var ROI = (trade.current - trade.initial) * trade.quantity
        trade.ROI = ROI;
        return ROI;
    }

    function deleteEntry(){
        setCurrentIndex(index)
        setDeletEntry(true)
    }


}

export default TradeInfo;