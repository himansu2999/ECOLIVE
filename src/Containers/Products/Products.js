import React,{Component} from 'react';
import classes from './Products.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Card from '../../components/UI/Card/Cards';

class Products extends Component{
    state={
        inputs:{
            one:{
                name:"ecolive",
                cost: "45"
            },
            two:{
                name:"eco",
                cost: "15"
            },
            three:{
                name:"live",
                cost: "25"
            }
        }
    }
    render(){
        let inputArray = [];
        for(let key in this.state.inputs){
            inputArray.push({
                id:key,
                input : this.state.inputs[key]
            })
        }
        let inputs = inputArray.map(inputsElement=>{
            return <Card key={inputsElement.key} name={inputsElement.input.name} cost ={inputsElement.input.cost} />
    })
        return(
            <Aux>
                <div className={classes.Productsa}>
                    {inputs}
                </div>
            </Aux>
        )
    }
};
export default Products;