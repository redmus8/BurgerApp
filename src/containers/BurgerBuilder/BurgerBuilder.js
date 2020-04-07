import React, {Component} from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing:false
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type]++;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);

    };
    removeIngredientHandler = (type) => {
        const updatedIngredients = {...this.state.ingredients}
        if (updatedIngredients[type] > 0) updatedIngredients[type]--;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    };

    updatePurchase(updatedIngredients) {
        const ingredients = {...updatedIngredients};
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    };

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    };
   purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    };
   purchaseContinueHandler=()=>{
        alert("bye bye");
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary  price={this.state.totalPrice} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>

                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               disabled={disabledInfo}
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;

