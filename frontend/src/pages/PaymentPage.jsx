import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useAuth } from '../context/AuthContext';

import { useCreateOrderMutation } from '../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/features/cart/cartSlice";

const PaymentPage = () => {
    const dispatch = useDispatch(); // ✅ Initialize dispatch

    const navigate = useNavigate();
    const location = useLocation();
    const [createOrder] = useCreateOrderMutation();
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);    //todo use get user frm auth
    const {  currentUser} = useAuth()

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, '') // Remove non-digits
            .replace(/(\d{4})/g, '$1 ') // Add space every 4 digits
            .trim(); // Remove trailing space
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setCardNumber(formatted);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpiry(value);
    };

    const validateCard = (number) => {
        const cleaned = number.replace(/\s+/g, ''); // Remove spaces
        if (!/^\d+$/.test(cleaned) || cleaned.length < 13 || cleaned.length > 19) {
            return false; // Must be numeric and within 13-19 digits
        }
    
        let sum = 0;
        let shouldDouble = false;
    
        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);
    
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
    
            sum += digit;
            shouldDouble = !shouldDouble;
        }
    
        return sum % 10 === 0;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", { cardNumber, expiry, cvv, name }); // Debugging

        let newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Cardholder name is required";
        }

        if (!validateCard(cardNumber)) {
            newErrors.cardNumber = "Invalid card number";
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            newErrors.expiry = "Expiry must be MM/YY format";
        }

        if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
            newErrors.cvv = "CVV must be a 3-digit number";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const response = await fetch("http://localhost:5000/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cardNumber, expiry, cvv, name }),
        });

        const result = await response.json();
        console.log("Response:", result); // Check the response from backend

        if (result.success) {
            await createOrder(location.state.newOrder).unwrap();
            Swal.fire({
                title: "Payment Successful!",
                text: "Your order has been placed successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6",
            });
            dispatch(clearCart());
            navigate("/orders");
        } else {
            navigate("/payment-failure");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Enter Card Details</h2>
                
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

                <input 
                    type="text" 
                    placeholder="Cardholder Name" 
                    className="input-field border p-2 w-full"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="input-field border p-2 w-full"
                    value={cardNumber} 
                    onChange={handleCardNumberChange} 
                    maxLength="19"
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="input-field border p-2 w-full"
                    value={expiry} 
                    onChange={handleExpiryChange} 
                    maxLength="5"
                />
                {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}

                <input 
                    type="text" 
                    placeholder="CVV" 
                    className="input-field border p-2 w-full"
                    value={cvv} 
                    onChange={(e) => setCvv(e.target.value)} 
                    maxLength="3"
                />
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
