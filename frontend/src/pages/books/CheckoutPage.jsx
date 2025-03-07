import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { Link, useNavigate  } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from'sweetalert2';
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
const CheckoutPage = () => {
    const dispatch = useDispatch(); // ✅ Initialize dispatch

    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);    //todo use get user frm auth
    const {  currentUser} = useAuth()

    const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
        } = useForm()
        const [createOrder, {isLoading, error}] = useCreateOrderMutation();

        const [isChecked,setIsChecked]=useState(false);
        const [paymentMethod, setPaymentMethod] = useState("cod"); // Default to Cash on Delivery

        const navigate =  useNavigate()
        const onSubmit=async(data)=> {
          
            const newOrder= {
                name:data.name,
                email:currentUser?.email,
                address: {
                    city: data.city,
                    country: data.country,
                    state: data.state,
                    zipcode: data.zipcode
            
                },
                phone: data.phone,
                productIds: cartItems.map(item => item?._id),   
                totalPrice: totalPrice,
                paymentMethod: paymentMethod 

            }
            if (paymentMethod === "card") {
                navigate("/payment", { state: { newOrder } }); // Pass order details to payment page
                return;
            }
            
            
            if (paymentMethod === "cod") {
                try {
                    const orderResponse = await createOrder(newOrder).unwrap();
                    Swal.fire({
                        title: "Order Confirmed!",
                        text: "Your order has been placed successfully.",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                    });
                    dispatch(clearCart());
                    navigate("/orders", { state: { newOrder: orderResponse } }); // Pass new order data
                } catch (error) {
                    console.error("Error placing an order", error);
                    alert("Failed to place an order");
                }
            } 
        };
        if(isLoading) return <div>Loading....</div> 


        //below part the payment gateway part which needs to be chnaged and edited card payment



  return (
    <section><div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-lg mx-auto">
        <div>
            <div>
            
            <p className="text-gray-500 mb-2">Total Price: Rs.{totalPrice}</p>
            <p className="text-gray-500 mb-6">Items: {cartItems.length > 0 ? cartItems.length : 0}</p>
            <div className="pricing-details">
                            <h3 className="text-lg font-medium text-gray-600">Pricing Details</h3>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        {item.title}: Quantity: {item.quantity}, Price: Rs.{item.newPrice * item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
            </div>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                        <div className="text-gray-600">
                            <p className="font-medium text-lg">Personal Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-5">
                                    <label htmlFor="full_name">Full Name</label>
                                    <input
                                        {...register ("name",{required: true})}
                                        type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                                </div>

                                <div className="md:col-span-5">
                                    <label html="email">Email Address</label>
                                    <input
                                         {...register ("email",{required: true})}
                                        type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" 
                                        disabled
                                        defaultValue={currentUser?.email}
                                        placeholder="email@domain.com" />
                                </div>
                                <div className="md:col-span-5">
                                    <label html="phone">Phone Number</label>
                                    <input
                                      {...register ("phone",{required: true})}
                                        type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                </div>

                                <div className="md:col-span-3">
                                    <label htmlFor="address">Address / Street</label>
                                    <input
                                       {...register ("address",{required: true})}
                                        type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="city">City</label>
                                    <input
                                        {...register ("city",{required: true})}
                                        type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="country">Country / region</label>
                                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input
                                            {...register ("country",{required: true})}
                                            name="country" id="country" placeholder="Country" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="state">State / province</label>
                                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                        <input 
                                        {...register ("state",{required: true})}
                                        
                                        name="state" id="state" placeholder="State" className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"  />
                                        <button  className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                        <button tabIndex="-1" className="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                            <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-1">
                                    <label htmlFor="zipcode">Zipcode</label>
                                    <input 
                                   {...register ("zipcode",{required: true})}
                                    type="text" name="zipcode" id="zipcode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                </div>
                                <div className="md:col-span-5">
                                            <p className="font-medium text-lg mt-4">Payment Method</p>
                                            <div className="flex gap-4">
                                                <label className="flex items-center">
                                                    <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} className="mr-2" />
                                                    Cash on Delivery
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="mr-2" />
                                                    Pay with Card
                                                </label>
                                            </div>
                                        </div>

                                <div className="md:col-span-5 mt-3">
  <div className="inline-flex items-center">
    <input 
      onChange={(e) => setIsChecked(e.target.checked)}
      type="checkbox" 
      name="billing_same" 
      id="billing_same" 
      className="form-checkbox" 
    />
    <label htmlFor="billing_same" className="ml-2">
      I agree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> 
      and <Link className='underline underline-offset-2 text-blue-600'>Shopping Policy.</Link>
    </label>
  </div>
</div>
                        <div className="md:col-span-5 text-right">
                                            <button disabled={!isChecked} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
                                            </button>
                                        </div>

                            </div>
                        </div>
                    </form>
                </div>
            

           
        </div>

        
    </div>
</div></section>
  )
}

export default CheckoutPage