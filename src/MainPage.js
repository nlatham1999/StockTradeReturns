import React, {useState, useEffect} from 'react';
import {Button, Card, Form, Row, Container, Col, Modal } from 'react-bootstrap'

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
    const [deleteEverything, setDeleteEverything] = useState(false);
    const [reallyAreDeletingEverything, setReallyAreDeletingEverything] = useState(false);



    useEffect(() => {
        addNewTrade()
        setFileName(getFileName());
      }, [])

    if(reallyAreDeletingEverything){
        setReallyAreDeletingEverything(false);
        setTrades([])
    }

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
        <Container style={{position: "fixed", zIndex: 1, paddingBottom: "1%", paddingTop: "1%", left: 0, right: 0, backgroundColor: "white"}}>
            <Navbar>
                <Button variant="outline-dark" onClick={() => addNewTrade()}>Add New Row</Button>
                <Button variant="outline-dark" style={{marginLeft: "1%"}} onClick={()=>setRefresh(!refresh)}>Refresh</Button>
                <Button variant="outline-danger" style={{marginLeft: "1%"}} onClick={() => deleteEveryThingClicked()}>Delete All Rows</Button>
                <Navbar.Collapse style={{marginLeft: "1%"}} id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Upload/Download" id="basic-nav-dropdown">          
                            <CSVLink  style={{color: "black"}} filename={fileName} data={generate2DArray()}>Download as CSV</CSVLink>;
                            <ImportCSVFile setTrades={setTrades} />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Form>
                
                <Form.Group as={Row} 
                // style={{position: "fixed", zIndex: 1, left: 0, right: 0, marginRight: "6%", marginLeft: "6%", backgroundColor: "#e0e0e0"}} 
                controlId="formHorizontalEmail">
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
            </Form>
        </Container>
        <Container style={{paddingTop: "10%"}}>
            
            <Form >
                {trades.map((trade, i) => (
                    <TradeInfo trade={trade} index={i} setCurrentIndex={setCurrentIndex} setDeletEntry={setDeleteEntry}/>
                ))}
            </Form>
        </Container>
        <Modal show={deleteEverything} onHide={() => setDeleteEverything(false)} centered>
                <Modal.Header closeButton>
                <Modal.Title>Delete Everything?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you really, really sure you want to delete everything?

                    It is suggested that you make a backup before doing this.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setReallyAreDeletingEverything(true)}>yes</Button>
                    <Button onClick={() => setDeleteEverything(false)}>no</Button>
                </Modal.Footer>

            </Modal>
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

    function deleteEveryThingClicked(){
        setDeleteEverything(true);
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