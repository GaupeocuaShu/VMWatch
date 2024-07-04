import { create } from 'zustand';
import axiosClient from '../axios-client';

export const useCart = create((set, get) => ({
    cart: [],

    initializeCart: async () => {
        try {
            const { data } = await axiosClient.get("api/get-my-cart");
            set({ cart: data.data });
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    },
    // Calculate the total quantity of items in the cart
    getCartQuantity: () => {
        const state = get();
        return state.cart.reduce((acc, item) => acc + item.quantity, 0);
    },
    // Calculate the total price of items in the cart
    getCartTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + item.quantity * item.price, 0);
    },
    addToCart: async (newWatch) => {
        const state = get();
        const watchIndex = state.cart.findIndex((item) => item.id === newWatch.id);
        console.log(watchIndex);
        if (watchIndex !== -1) {
            const updatedCart = state.cart.map((item, index) => (
                index === watchIndex ? { ...item, quantity: item.quantity + 1, total: item.price * (item.quantity + 1) } : item
            ));
            const { cartItemID } = state.cart.find(e => e.id === newWatch.id);
            const { data } = await axiosClient.put(`api/${cartItemID}/increase-item-quantity`);
            console.log(data.data);
            return set({ cart: updatedCart });
        } else {
            // If the watch is not in the cart, add it with a quantity of 1 
            const { data } = await axiosClient.post(`api/add-to-cart`, newWatch);
            console.log(data);
            return set({ cart: [...state.cart, { ...newWatch, cartItemID: data.cartItemID, quantity: 1, total: newWatch.price }] });
        }
    },

    removeFromCart: async (watchID) => {
        const state = get();
        try {
            set((state) => ({
                cart: state.cart.filter((item) => item.id !== watchID)
            }));
            const { cartItemID } = state.cart.find(e => e.id === watchID);
            const { data } = await axiosClient.delete(`api/${cartItemID}/remove-from-cart`);
            console.log(data.data);
        } catch (error) {
            console.log(error)
        }

    },


    clearCart: () => set({ cart: [] }),

    decreaseItemQuantity: async (watchID) => {
        const state = get();
        const { cartItemID } = state.cart.find(e => e.id === watchID);
        try {
            set((state) => ({
                cart: state.cart.map((item) => item.id === watchID ? { ...item, total: item.total - item.price, quantity: item.quantity - 1 } : item)
            }));
            const { data } = await axiosClient.put(`api/${cartItemID}/decrease-item-quantity`);
        } catch (error) {
            console.log(error);
        };
    },

    increaseItemQuantity: async (watchID) => {
        const state = get();
        const { cartItemID } = state.cart.find(e => e.id === watchID);
        try {
            set((state) => ({
                cart: state.cart.map((item) => item.id === watchID ? { ...item, total: item.total + item.price, quantity: item.quantity + 1 } : item)
            }));
            const { data } = await axiosClient.put(`api/${cartItemID}/increase-item-quantity`);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        };
    },
}));

