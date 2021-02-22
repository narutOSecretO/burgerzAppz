import React from 'react';
import Auxiallary from '../../hoc/Auxiallary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar';
const layout = (props) => (
    <Auxiallary>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxiallary>
);

export default layout;