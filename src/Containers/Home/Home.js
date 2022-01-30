import React, { Component } from 'react';

import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Jumbotron,Container, Row, Col, Image, Button } from 'react-bootstrap';
import Cards from '../../components/UI/Card/Cards';
import CardFlip from '../../components/UI/CardFlip/CardFlip';
import Carousel from '../../components/Carousel/Carousel';

class Home extends Component {
    state = {
        authorized: true
    }
    render() {
/*        let toolbarb = null;
        if (this.state.authorized) {
            toolbarb = <Toolbarb />;
        }
    */
        return (
            <Container>
                <CardFlip />
        <br/>
        <Carousel />
        <br/>
            
           
               
                 <Row className="show-container text-center">
                     <Col xs={12} sm={4} className="person-wrapper">
                         <Image src={ require('../../components/Assets/Images/gold-ipad-beside-stylus-768473.jpg')} height={500} width={900} />
                         <h3>Hospital</h3>
                         <p>about hospital facilities</p>
                         <Link to="/Home">
                     <Button bsStyle="link">Hospital</Button>
                     <hr />
                 </Link>
                     </Col>
                 </Row>
                 <Row className="show-container text-center">
                     <Col xs={12} sm={4} className="person-wrapper">
                         <Image src={ require('../../components/Assets/Images/positive-doctor-in-medical-uniform-talking-on-cellphone-in-4173249.jpg')} height={500} width={900} />
                         <h3>Doctors</h3>
                         <p>W e provide you the best doctors</p>
                         <Link to="/doctor">
                     <Button bsStyle="primary">Doctor</Button>
                     <hr />
                 </Link>
                     </Col>
                 </Row>
                 <Row className="show-container text-center">
                     <Col xs={12} sm={4} className="person-wrapper">
                         <Image src={ require('../../components/Assets/Images/woman-having-a-video-call-4031818.jpg')} height={500} width={900} />
                         <h3>appointment</h3>
                         <p>about appointment facilities</p>
                         <Link to="/appointment">
                     <Button bsStyle="primary">Appointment</Button>
                     <hr />
                 </Link>
                     </Col>
                 </Row><Row className="show-container text-center">
                     <Col xs={12} sm={4} className="person-wrapper">
                         <Image src={ require('../../components/Assets/Images/medication-pills-isolated-on-yellow-background-3683098.jpg')} height={500} width={900} />
                         <h3>faqs</h3>
                         <p>frequently asked questions</p>
                         <Link to="/faqs">
                     <Button bsStyle="primary">FAQs</Button>
                     <hr />
                 </Link>
                     </Col>
                 </Row>
                 <br />
                 <Jumbotron>
                   <h2>About Ecolive</h2>
                   <div>
                   <img src={require('../../components/Assets/Images/concentrated-coworking-couple-discussing-project-together-4308099.jpg') } height={500} width={800}/>
                   </div>
        <hr />
        <p style={{display:"grid"}}> Our DNA is to do whatever we can do to help the ecology which could range from   avoiding usage of chemicals or plastics, recycling waste, planting more trees, keeping good health by adopting naturopathy/yoga, promoting organic food or preservative-less food products etc.</p>
                   <Link to="/about">
                     <Button bsStyle="primary">About</Button>
                 </Link>
                 </Jumbotron>
                 < Cards />
                 <br/>
                 <h4>Mindset</h4>
         <hr />
         <p>The state of ecology or even us is quite often a consequence of our mindsets, which get formed gradually since our birth. As they say old habits die hard, we believe changing the mindsets via workshops is a very effective mechanism to drive positive change. Globally also since last few years or so ecology/environment is being cared for far more & efforts are being made across the world to bring this issue/cause into forefront. One major consequence of heightened awareness is emergence of  quite many ecology related projects, ventures, campaigns, movements, sustainability investing.

Possibly, subsequent to the declaration of Principles of Responsible Investments (PRI) by UN Environment Programme (UNEP), sustainable investments have also been growing YoY since 2012 and such investments have always outperformed major indices. There had been so many instances wherein companies had to either close their business or pay heavy fines for violations in environmental, social or governance space.

In this era, business should  no more be about generating wealth only, rather it should focus on wealth & well-being of everybody on earth!  Around the said principles, Ecolive also offers ESG (Ecoliving Sustainability Guidance) to make an impact and these are hosted for schools, colleges, companies, institutions or townships or associations. These are some of the most common and well-received mindset changing workshops, which are also customisable for  content & duration basis audiences profile.</p>
        
                 <Footer />
           </Container>
           
        )
    }
}
export default Home;