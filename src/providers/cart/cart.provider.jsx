import React, { createContext, useState, useEffect } from "react";

import { 
    addItemToCart, 
    removeItemFromCart, 
    clearOutItemFromCart, 
    getCartItemsTotalCount,
    getCartItemsTotalPrice 
} from "./cart.utils";

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemsFromCart: () => {},
    cartItemsCount: 0,
    totalPrice: 0
});

const CartProvider = ({ children }) => {
    const [ hidden, setHidden ] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item)); 
    const toggleHidden = () => setHidden(!hidden);
    const clearItemsFromCart = item => setCartItems(clearOutItemFromCart(cartItems, item));
  
    useEffect(() => {
       setCartItemsCount(getCartItemsTotalCount(cartItems));
       setTotalPrice(getCartItemsTotalPrice(cartItems));
    }, [cartItems]);

    return (
    <CartContext.Provider value={{
        hidden,
        toggleHidden,
        cartItems,
        cartItemsCount,
        totalPrice,
        addItem,
        removeItem,
        clearItemsFromCart
    }}>
        {children}
    </CartContext.Provider>
    )
}

export default CartProvider;