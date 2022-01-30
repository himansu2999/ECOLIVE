import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
 
class PracticeCarousel extends Component {
    render() {
        return (
            <Carousel>
                <div>
                    <img src={require('../Assets/Images/positive-doctor-in-medical-uniform-talking-on-cellphone-in-4173249.jpg')} />
                    <p className="caption">Medicine</p>
                </div>
                <div>
                    <img src={require('../Assets/Images/woman-discussing-a-lesson-3758869.jpg')}/>
                    <p className="caption">Doctor</p>
                </div>
                <div>
                    <img src={require('../Assets/Images/syringe-and-pills-on-blue-background-3786157.jpg')}/>
                    <p className="caption">Consult</p>
                </div>

                  

                
            </Carousel>
        );
    }
}
 
export default Carousel;