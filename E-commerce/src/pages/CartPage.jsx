import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {removeFromCart, clearCart , increaseQuantity , decreaseQuantity} from "../features/cart/cartSlice"
import {useNavigate} from 'react-router-dom'

//   const cartItems = useSelector((state) => state.cart.cartItems);

const CartPage = ()=>{
    const cartItems = useSelector(state => state.cart.cartItems || [])
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const handleCheckout = async () => {
  if (!token || !user?.id) {
    navigate("/login");
    return;
  }

  const orderData = {
    userId: user.id,
    cartItems,
    totalAmount: totalPrice + 49,
  };

  try {
    await axios.post("http://localhost:5000/api/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(clearCart()); // Optional: clear cart after placing order
    alert("Order confirmed!");
    navigate("/thank-you");
  } catch (error) {
    console.error("Order failed", error);
    alert("Something went wrong while placing the order.");
  }
};

    
    return(
        <div className="min-h-80 flex flex-col gap-2 pt-10">
            <h1 className="text-4xl pb-10 ">Your Cart</h1>
            {cartItems.length === 0? (
                <p>Your cart is empty</p>
            ):(
                <div className="flex w-full justify-center">
                    <div className="w-2/3">
                        <button 
                        className="text-xl pb-3 pl-2"
                        onClick={() => dispatch(clearCart())}>Clear Cart</button>
                    <ul>
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                    <hr
                                    className="text-gray-600 h-0.5"
                                    />
                                    <div className="flex p-4 justify-between ">
                                        <div className="w-20 rounded-4xl">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            {item.title} 
                                            <p>brand: {item.brand}</p>
                                            <div className="p-2">
                                                <p>Quantity : </p>
                                                <button
                                                onClick={() => dispatch(decreaseQuantity(item._id))}
                                                className="bg-gray-300 px-2 rounded"
                                                >
                                                −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                onClick={() => dispatch(increaseQuantity(item._id))}
                                                className="bg-gray-300 px-2 rounded"
                                                >
                                                +
                                                </button>
                                            </div>
                                            <button
                                            className="bg-red-500 hover:text-blue-500 rounded-xl text-white p-3"
                                            onClick={()=> dispatch(removeFromCart(item._id))}>Remove</button>
                                        </div>
                                        <div>
                                            <p>₹{item.price}</p>
                                        </div>
                                    </div>
                                    <hr
                                    className="p-1"
                                    />
                                </li>
                         ))}
                    </ul>
                    </div>
                    <div className="bg-blue-900 text-white mt-10 p-10 ml-4 items-center space-y-6 mb-2">
                        <h3 className="text-3xl pb-10">Order Summary</h3>
                        <p>Items total: ₹{totalPrice.toLocaleString()} </p>
                        <p>Shipping: ₹49 (PAN India) </p>
                        <p>Cart Total: ₹{(totalPrice + 49).toLocaleString()}</p>
                        <button
                        className="bg-yellow-400 rounded-3xl p-3 hover:bg-yellow-300 font-bold"
                         onClick={handleCheckout}
                        >Proceed to buy</button>
                    </div>
                </div>
                
            )}
        </div>
    )
}
export default CartPage