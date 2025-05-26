import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeFromCart, clearCart} from "../features/cart/cartSlice"

const CartPage = ()=>{
    const cartItems = useSelector(state => state.cart.cartItems || [])
    const dispatch = useDispatch()
    
    return(
        <div className="w-2/3 min-h-80 flex flex-col gap-2  pt-10">
            <h1 className="text-4xl pb-10 ">Your Cart</h1>
            {cartItems.length === 0? (
                <p>Your cart is empty</p>
            ):(
                <div>
                    <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                    <ul>
                        {cartItems.map(item=>(
                            <li key={item._id}>
                                    <hr />
                                    <div className="bg-amber-400 flex p-4 justify-between">
                                        <div className="w-20 rounded-4xl">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="flex flex-col gap-2 items-center">
                                            {item.title} 
                                            <p>{item.brand}</p>
                                            <p>Quantity : {item.quantity}</p>
                                            <button
                                            className="bg-red-500 hover:text-blue-500 rounded-xl text-white p-3"
                                            onClick={()=> dispatch(removeFromCart(item._id))}>Remove</button>
                                        </div>
                                        <div>
                                            <p>₹{item.price}</p>
                                        </div>
                                    </div>
                                    <hr />
                                </li>
                         ))}
                    </ul>
                    
                </div>
            )}
        </div>
    )
}
export default CartPage