import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.More} onClick={() => props.addRemoveIngredient(props.type, 'More')}>More</button>
            <button className={classes.Less} onClick={() => props.addRemoveIngredient(props.type, 'Less')} disabled={props.disabled}>Less</button>
        </div>
    )

}

export default buildControl;