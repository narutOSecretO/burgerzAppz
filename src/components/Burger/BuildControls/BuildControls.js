import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
]

const buildControls = (props) => {
    return (

        <div className={classes.BuildControls}>
            <p>Price : <strong>{props.price}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    type={ctrl.type}
                    disabled={props.disabled[ctrl.type]}
                    addRemoveIngredient={props.addRemoveIngredient}
                />
            ))}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>Order Now</button>
        </div>
    )
}

export default buildControls;