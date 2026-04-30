import { createAction } from "../../utils/reducer/reducer";
import CART_ACTION_TYPES from "./cart.types";

const addCartItem = (cartItems, productToAdd, quantity = 1) => {
  const { id, size } = productToAdd;
  const isProductExist = cartItems.find(
    (item) => item.id === id && item.size === size
  );
  if (isProductExist) {
    return cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const { id, size } = productToRemove;
  const isProductExist = cartItems.find(
    (item) => item.id === id && item.size === size
  );
  if (!isProductExist) {
    return cartItems;
  }
  if (isProductExist.quantity === 1) {
    return cartItems.filter(
      (cartItem) => !(cartItem.id === id && cartItem.size === size)
    );
  }
  if (isProductExist) {
    return cartItems.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

const deleteCartItem = (cartItems, productToDelete) => {
  const { id, size } = productToDelete;
  return cartItems.filter(
    (cartItem) => !(cartItem.id === id && cartItem.size === size)
  );
};

export const addToCart = (cartItems, productToAdd, quantity = 1) => {
  const newCartItems = addCartItem(cartItems, productToAdd, quantity);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItem = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsOpen = (boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_OPEN, boolean);
};
