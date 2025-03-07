import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-green-600">Payment Successful! 🎉</h2>
                <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
                <Link to="/" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-lg">
                    Return to Home
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
