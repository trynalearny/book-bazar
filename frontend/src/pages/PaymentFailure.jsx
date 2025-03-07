import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailure = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-red-600">Payment Failed ❌</h2>
                <p className="text-gray-600 mt-2">Something went wrong. Please try again.</p>
                <Link to="/payment" className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-lg">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default PaymentFailure;
