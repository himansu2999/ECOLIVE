import React, { Component } from 'react';

import { Card, CardGroup} from 'react-bootstrap';
class Cards extends Component{
    render(){
        return(
<CardGroup>
  <Card>
  <div>
                   <img src={require('../../Assets/Images/unrecognizable-male-doctor-with-money-4021804.jpg') } height={500} width={500}/>
                   </div>
    <Card.Body>
      <Card.Title>Doctor</Card.Title>
      
      <Card.Text>
        We are here to serve you!!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">updated 5 months ago</small>
    </Card.Footer>
  </Card>
  <Card>
  <div>
                   <img src={require('../../Assets/Images/capsule.jpg') } height={500} width={500}/>
                   </div>
    <Card.Body>
      <Card.Title>Treatment</Card.Title>
      <Card.Text>
        We provide best treatments!!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">updated 1 year ago</small>
    </Card.Footer>
  </Card>
  <Card>
  <div>
                   <img src={require('../../Assets/Images/computer-desk-laptop-stethoscope-48604.jpg') } height={500} width={370}/>
                   </div>
    <Card.Body>
      <Card.Title>Appointments</Card.Title>
      <Card.Text>
        Efficient and fastest service!!
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">updated 3months ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
 )
}
  
}
export default Cards;