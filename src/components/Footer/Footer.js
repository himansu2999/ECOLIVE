import React from 'react';
import ReactDOM from 'react-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  './Footer.module.css';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
const Footer = (props) => {
    return (
        <Aux>
            <footer className="Footer">   
            <div>  
        
                   <div style={{
    
                                backgroundColor:"lightgrey",
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                textAlign:"center",
                                bottom: 0,
                                 }} className="Footer__wrapper">
                    
                        <div className="content" >
                            
                            <div className="column">
                                <div data-qa-id="footer-heading" class="c-footer__title">
                                    <span>Ecolive</span>
                                </div >
                                <div style={{
    
                                backgroundColor:"lightgrey",
                                display:"grid",
                                
                                textAlign:"center"
                                 }}>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="">
                                        <span>About</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="">
                                        <span>Contact Us</span>
                                    </a>
                                </div>
                            </div>
                            <div  className="column">
                                <div data-qa-id="footer-heading" class="c-footer__title">
                                    <span>For patients</span>
                                </div>
                                <div style={{
    
                                backgroundColor:"lightgrey",
                                display:"grid",
                                textAlign:"center"
                                
                                 }}>
                                    <a data-qa-id="footer-item" target="_self" class="c-footer__item" href="#" rel="">
                                        <span>Doctors</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_self" class="c-footer__item" href="#" rel="">
                                        <span>Clinics</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_self" class="c-footer__item" href="#" rel="">
                                        <span>Hospitals</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_self" class="c-footer__item" href="#" rel="">
                                        <span>Appointment</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_self" class="c-footer__item" href="#" rel="">
                                        <span>Checkups</span>
                                    </a>
                                </div>
                            </div>
                            </div>
                            <div className="column">
                                <div data-qa-id="footer-heading" class="c-footer__title">
                                    <span>More</span>
                                </div>
                                <div style={{
    
                                backgroundColor:"lightgrey",
                                display:"grid",
                                
                                
                                 }}>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#contactus" rel="">
                                        <span>Help</span>
                                    </a>
                                    
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="">
                                        <span>Privacy Policy</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="">
                                        <span>Terms &amp; Conditions</span>
                                    </a>
                                    
                                </div>
                            </div>
                            <div className="column">
                                <div data-qa-id="footer-heading" class="c-footer__title">
                                    <span>Social Media</span>
                                </div>
                                <div style={{
    
                                backgroundColor:"lightgrey",
                                display:"grid",
                               
                                
                                 }}>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="//www.facebook.com/Ecolive" rel="nofollow">
                                        <span>Facebook</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="//twitter.com/Ecolive" rel="nofollow">
                                        <span>Twitter</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="nofollow">
                                        <span>LinkedIn</span>
                                    </a>
                                    <a data-qa-id="footer-item" target="_blank" class="c-footer__item" href="#" rel="nofollow">
                                        <span>Google+</span>
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                        
                               <div style=
                               {{backgroundColor:"lightgrey", textAlign:"center"}} className="Footer__copyright">
                                      <div className="Copyright">
                                           <span>Copyright © 2020, Ecolive. </span>
                                           <span>All rights reserved.</span>
                                        </div>
                                </div>
                    

</div>


                    
                </footer>
           
        </Aux>
    )
};
export default Footer;