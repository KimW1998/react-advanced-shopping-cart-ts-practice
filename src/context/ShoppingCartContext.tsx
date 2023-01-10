import { createContext, ReactNode, useContext, useState } from 'react';

import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  queantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuatity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCardItems] = useLocalStorage<CartItem[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.queantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuatity(id: number) {
    return cartItems.find((item) => item.id === id)?.queantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCardItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, queantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, queantity: item.queantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCardItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.queantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, queantity: item.queantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCardItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuatity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
