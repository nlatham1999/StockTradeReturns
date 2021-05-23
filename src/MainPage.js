import React, {useState, useEffect} from 'react';
import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import './TradeInfo'
import TradeInfo from './TradeInfo';

import ImportCSVFile from './ImportCSVFile';

import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const MainPage = () => {

    const [trades, setTrades] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [deleteEntry, setDeleteEntry] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        addNewTrade()
        setFileName(getFileName());
      }, [])

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

    console.log(trades)

    return (
        <div>
        <Container>
            <Button onClick={() => addNewTrade()}>Add New Row</Button>
            <CSVLink filename={fileName} data={generate2DArray()}>Download as CSV</CSVLink>;
            <Button onClick={()=>setRefresh(!refresh)}>Refresh</Button>
            <ImportCSVFile setTrades={setTrades} />
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
            "current": 0,
            "quantity": 0,
            "ROI": 0
        }
        trades.push(newTrade);
        setRefresh(!refresh);
        print(trades)
    }

    function print(m){
        console.log(m);
    }

    function generate2DArray(){
        var data = [];
        var header = ["name", "initial", "current", "quantity", "ROI"]
        // console.log(trades)
        data.push(header)
        for (let index = 0; index < trades.length; index++) {
            const element = trades[index];
            var row = [element.name, element.initial, element.current, element.quantity, element.ROI]
            data.push(row);
        }
        return data;
    }

    function getFileName(){
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var newdate = "stock_data_" + year + "/" + month + "/" + day + ".csv";

        return newdate;
    }

    

}



export default MainPage;