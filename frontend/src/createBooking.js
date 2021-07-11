import React from 'react';
import './createBooking.css';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class CreateBookingForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            "data": {
                "email": "",
                "name": "",
                "phoneNumber": "",
                "noOfSeats": 0,
                "attendees": [],
                "eventId": ""
            },
            "eventName": "",
            "pictureUrl": "",
            "noOfSeats": 0,
            "errors": []
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`${window.location.origin}/api/event/${id}`)
        .then((res) => res.json())
        .then((res) => {
            this.setState(prevState => {
                return{
                        ...this.state,
                        data: {
                            ...this.state.data,
                            eventId: id
                        },
                        eventName: res.name,
                        pictureUrl: res.pictureUrl,
                        noOfSeats: res.noOfSeats
                }
            });
        });
    }

    handleInputValidation = (inputType, value) => {
        let customData = Object.assign({}, this.state.data);
        if(inputType === "noOfSeats"){
            customData[inputType] = parseInt(value);
            customData["attendees"] = [];
            if(customData[inputType] > 6 || customData[inputType] < 0) return;
        } else if(inputType === "attendees"){
            customData[inputType][value["idx"]] = value['value'];
        }else{
            customData[inputType] = value;
        }
        this.setState({data: customData});
    }

    generateAttendeeInputList = () => {
        let elements = [];
        let noOfSeats = parseInt(this.state.data.noOfSeats);
        if(noOfSeats > 1){
            for(let i=1; i < noOfSeats; i++){
                elements.push(
                    <div>
                        <Form.Label>Attendee {i + 1}:</Form.Label>
                        <Form.Control type="input" onChange={(e) => this.handleInputValidation("attendees", {"idx": i - 1, "value": e.target.value})} value={this.state.data.attendees[i-1]} />
                    </div>
                );
            }
            return elements;
        }
        return <div></div>
    }

    handleSubmit = () => {
        fetch(`${window.location.origin}/api/booking`,{
            method: "POST",
            body: JSON.stringify(this.state.data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(async (res) => {
           let data = await res.json();
           if(res.status === 201){
               // navigate to list page
               window.location.replace("/")
           }else{
               alert(data.error);
           }
        }).catch((err) => {
            console.log(err);
            window.location.replace("/");
        });
    }

    render(){
        const { eventName, pictureUrl, noOfSeats, data } = this.state; 
        return <div className="wrapper">
             <div className="heading-text">{ eventName }</div>
             <div className="heading-text">No. of Seats: { noOfSeats }</div>
             <div style={{ display: "flex" }}>
                <div className="image-box">
                     <img style={{ width: "200px" }} src={pictureUrl} />
                </div> 
                <Form className="form-style">
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="input" onChange={(e) => this.handleInputValidation("name", e.target.value)} placeholder="Enter your name" value={data.name} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" onChange={(e) => this.handleInputValidation("email", e.target.value)} placeholder="Enter your email id" value={data.email} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="input" onChange={(e) => this.handleInputValidation("phoneNumber", e.target.value)} placeholder="Enter your phone number" value={data.phoneNumber} />
                    </Form.Group>

                    <Form.Group controlId="formBasicNoOfSeats">
                        <Form.Label>No.of Seats</Form.Label>
                        <Form.Control type="number" onChange={(e) => this.handleInputValidation("noOfSeats", e.target.value)} value={data.noOfSeats} min="1" max="6" />
                    </Form.Group>

                    <Form.Group controlId="formBasicAttendees">
                        {
                           this.generateAttendeeInputList()
                        }
                    </Form.Group>            
                    
                    <Button variant="primary" onClick={(e) => this.handleSubmit()}>
                    Submit
                    </Button>
                </Form>
            </div>
      </div>
    }
}

export default CreateBookingForm;