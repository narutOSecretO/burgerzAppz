import React, { Component } from 'react';
import Aux from '../../hoc/Auxiallary';
import Button from '../UI/Button/Button';
class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('order summary will update');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map((el) => {
            return <li key={el}>
                <span style={{ textTransform: 'capitalize' }}>{el}</span>: {this.props.ingredients[el]}
            </li>
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to checkout?</p>
                <p>Total Price: <strong>{this.props.totPrice}</strong></p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelHandler}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinueHandler}>Continue</Button>
            </Aux>
        );

    }
}

export default OrderSummary;