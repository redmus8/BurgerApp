import React from "react";
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger=(props)=>{
    let ingredients=Object.keys(props.ingredients).map(x=>{
        return [...Array(props.ingredients[x])].map((_,i)=>{
           return  <BurgerIngredient key={x+i} type={x}/>
        })
        }
    ).reduce((arr,el)=>{
        return arr.concat(el);
    });
    if(ingredients.length===0){
        ingredients=<p>please start adding ingredients</p>
    }
    return( <div className={classes.Burger}>
            <BurgerIngredient type={"bread-top"}/>
        {ingredients}
            <BurgerIngredient type={"bread-bottom"}/>

    </div>);
}
 export default burger;
