import React, { Component } from 'react';
import Auxiallary from '../../hoc/Auxiallary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withErrorHandler } from '../../hoc/withErrorHandler';
const ingredientPrice = {
    salad: 2,
    meat: 4,
    cheese: 3,
    bacon: 4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        axios.get('ingridients.json').then(response => {
            this.setState({ ingredients: response.data });
        }).catch(error => {
            this.setState({ error: true });
        })
    }
    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients).map((el) => {
            return updatedIngredients[el]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);
        this.setState({ purchaseable: sum > 0 });
    }
    addRemoveIngredientHandler = (type, btnName) => {
        let oldCount = this.state.ingredients[type];
        let oldPrice = this.state.totalPrice;
        let newCount, newPrice;
        let priceAddition = ingredientPrice[type];
        if (btnName === 'More') {
            newCount = oldCount + 1;
            newPrice = oldPrice + priceAddition;
        } else if (btnName === 'Less' && oldCount > 0) {
            newCount = oldCount - 1;
            newPrice = oldPrice - priceAddition;
        } else {
            return;
        }
        let updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = newCount;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    closeModal = () => {
        this.setState({ purchasing: false });
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                address: {
                    street: 'test'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('orders.son', order).then((response) => {
            console.log(response);
            this.setState({ loading: false, purchasing: false });
        }).catch(error =>
            this.setState({ loading: false, purchasing: false }));
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger = this.state.error ? 'Ingridients cannot be loaded' : <Spinner />
        if (this.state.ingredients) {
            (
                burger = <Auxiallary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addRemoveIngredient={this.addRemoveIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Auxiallary>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCancelHandler={this.purchaseCancelHandler}
                purchaseContinueHandler={this.purchaseContinueHandler}
                totPrice={this.state.totalPrice} />
        }

        return (
            <Auxiallary>
                {burger}
                <Modal show={this.state.purchasing} closeModal={this.closeModal}>
                    {orderSummary}
                </Modal>
            </Auxiallary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);