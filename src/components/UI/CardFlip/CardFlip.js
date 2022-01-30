import ReactCardFlip from 'react-card-flip';
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { faCentercode } from '@fortawesome/free-brands-svg-icons';




const CardFlip  = () => {
    const[isFlipped, setIsFlipped] = useState(false);

    const handleClick = () =>{
        setIsFlipped(!isFlipped);
    };
    return (
      <div>
       <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div style={{backgroundColor:"skyblue", height:500 ,color:"#ffff", display:"flex",justifyContent:"center",alignItems:"center"}}>
           <h5>Our DNA is to do whatever we can do to help the ecology which could range from   avoiding usage of chemicals or plastics, recycling waste, planting more trees, keeping good health by adopting naturopathy/yoga, promoting organic food or preservative-less food products etc.
           </h5><button style={{
               alignItems: "center",
              color:"black",
              backgroundColor:"lightblue",
              justifyContent:"center"}}
            onClick={handleClick}>Click Here</button>
            <div>
                   <img src={require('../../Assets/Images/medcon.jpg') } height={500} width={800}/>
                   </div>

          </div>
   
          <div style={{backgroundColor:"lightblue", height:500, color:"#ffff",display:"flex",justifyContent:"center",alignItems:"center"}}>
         <h5> Ecoliving is to live in harmony with nature. This is no longer optional but an imperative that must be followed if we are to leave the world inhabitable for future generations.
         </h5><button style={{
              alignItems: "center",
              color:"black",
              backgroundColor:"skyblue",
              justifyContent:"center"
            }}

            onClick={handleClick}>Click Here</button>
            <div>
                   <img src={require('../../Assets/Images/syringe-and-pills-on-blue-background-3786157.jpg') } height={500} width={500}/>
                   </div>
          </div>
        </ReactCardFlip>
        
        
        </div>
      )
};

export default CardFlip;

