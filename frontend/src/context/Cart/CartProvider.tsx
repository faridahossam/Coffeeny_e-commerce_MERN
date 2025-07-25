/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/BaseURL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCart = async () => {
      const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("Fetch to get user cart. Please try again");
      }
      const cart = await response.json();
      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: any;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );
      setCartItems(cartItemsMapped);
      setTotalAmount(cart.totalAmount);
    };
    fetchCart();
  }, [token]);

  const addItemToCart = async (productId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("Failed to add to cart");
      }
      const cart = await response.json();
      if (!cart) {
        setError("Failed to parse cart data");
      }
      const cartItemsMapped = cart.items.map(
        ({
          product,
          quantity,
          unitPrice,
        }: {
          product: any;
          quantity: any;
          unitPrice: number;
        }) => ({
          productId: product._id,
          title: product.title,
          image: product.image,
          quantity,
          unitPrice,
        })
      );
      setCartItems([...cartItemsMapped]);
      setTotalAmount(cart.totalAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const updateItemInCart = async (productId: string, quantity: number) => {
     try {
       const response = await fetch(`${BASE_URL}/cart/items`, {
         method: "PUT",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
           productId,
           quantity: quantity,
         }),
       });

       if (!response.ok) {
         setError("Failed to update the cart");
       }
       const cart = await response.json();
       if (!cart) {
         setError("Failed to parse cart data");
       }
       const cartItemsMapped = cart.items.map(
         ({
           product,
           quantity,
           unitPrice,
         }: {
           product: any;
           quantity: any;
           unitPrice: number;
         }) => ({
           productId: product._id,
           title: product.title,
           image: product.image,
           quantity,
           unitPrice,
         })
       );
       setCartItems([...cartItemsMapped]);
       setTotalAmount(cart.totalAmount);
     } catch (error) {
       console.error(error);
     }
  };


  const removeItemFromCart = async (productId: string) => {
     try {
       const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });

       if (!response.ok) {
         setError("Failed to delete item from cart");
       }
       const cart = await response.json();
       if (!cart) {
         setError("Failed to parse cart data");
       }
       const cartItemsMapped = cart.items.map(
         ({
           product,
           quantity,
           unitPrice,
         }: {
           product: any;
           quantity: any;
           unitPrice: number;
         }) => ({
           productId: product._id,
           title: product.title,
           image: product.image,
           quantity,
           unitPrice,
         })
       );
       setCartItems([...cartItemsMapped]);
       setTotalAmount(cart.totalAmount);
     } catch (error) {
       console.error(error);
     }
  }
  const clearCart = async () => {
       try {
         const response = await fetch(`${BASE_URL}/cart`, {
           method: "DELETE",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });

         if (!response.ok) {
           setError("Failed to delete the cart");
         }
         const cart = await response.json();
         if (!cart) {
           setError("Failed to parse cart data");
         }
         setCartItems([]);
         setTotalAmount(0);
       } catch (error) {
         console.error(error);
       }
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addItemToCart,
        updateItemInCart,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
