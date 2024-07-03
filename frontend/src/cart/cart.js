import { create } from 'zustand';

export const useCart = create((set, get) => ({
    cart: [],

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
    addToCart: (newWatch) => set((state) => {
        const watchIndex = state.cart.findIndex((item) => item.id === newWatch.id);
        console.log(watchIndex);
        if (watchIndex !== -1) {
            // If the watch is already in the cart, increase its quantity
            const updatedCart = state.cart.map((item, index) => (
                index === watchIndex ? { ...item, quantity: item.quantity + 1, total: item.price * (item.quantity + 1) } : item
            ));
            return { cart: updatedCart };
        } else {
            // If the watch is not in the cart, add it with a quantity of 1
            return { cart: [...state.cart, { ...newWatch, quantity: 1, total: newWatch.price }] };
        }
    }),

    removeFromCart: (watchID) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== watchID)
    })),

    clearCart: () => set({ cart: [] }),

    decreaseItemQuantity: (watchID) => set((state) => ({
        cart: state.cart.map((item) => item.id === watchID ? { ...item, total: item.total - item.price, quantity: item.quantity - 1 } : item),
    })),

    increaseItemQuantity: (watchID) => set((state) => ({
        cart: state.cart.map((item) => item.id === watchID ? { ...item, total: item.total + item.price, quantity: item.quantity + 1 } : item),
    }))
}));

