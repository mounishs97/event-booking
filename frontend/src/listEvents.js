import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Button from 'react-bootstrap/Button';

import './listEvents.css';

class ListEvent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "data": [],
            "searchName": ""
        };
    }

    componentDidMount() {
        fetch(`${window.location.origin}/api/event`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({data: res});
            });
    }

    handleSearch(name){
        fetch(`${window.location.origin}/api/eventSearch?name=${name}`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({data: res, searchName: name});
            });       
    }

    render(){
        const { data, searchName } = this.state;
        return <div>
            <center>
                <input type="text" className="search-input" value={searchName} onChange={(e) => this.handleSearch(e.target.value)} placeholder="Search Events" />
            </center>
            {
                    data.length === 0 ? <h1>No Results Found </h1> : (
                        <CardDeck className="card-deck-style">
                            { 
                                data.map((datum) => {
                                    return <div key={datum._id} className="list-event-box"> 
                                            <Card>
                                            <Card.Title className="card-title">{ datum.name }</Card.Title>
                                            <Card.Body>
                                                <div className="card-display-vertically">
                                                    <Card.Img variant="top" style={{ width: "50%", borderRadius: "50%" }} src={ datum.pictureUrl } />
                                                    <div className="card-display-horizontally">
                                                        <Card.Text>
                                                            { moment(datum.endDate).format("Do MMM YYYY") }
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Seats Available: { datum.noOfSeats }
                                                        </Card.Text>
                                                        {
                                                            datum.noOfSeats > 0 ? (
                                                                <Link to={`/booking/${datum._id}`}>
                                                                    <Button variant="primary">
                                                                        Book Now
                                                                    </Button>
                                                                </Link>
                                                            ) : (
                                                                <Button variant="primary" disabled={true}>
                                                                    Sold Out
                                                                </Button> 
                                                            )
                                                        } 
                                                    </div>
                                                </div>
                                            </Card.Body>
                                            </Card>
                                    </div>
                            }) 
                            }
                        </CardDeck>
                    )
            }
        </div>
    }
}

export default ListEvent;