import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem active link="/">
            Burger Builder
        </NavigationItem>
        <NavigationItem>
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;