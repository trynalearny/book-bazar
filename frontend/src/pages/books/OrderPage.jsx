import React from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
    const { currentUser } = useAuth();
    const location = useLocation();
    const newOrder = location.state?.newOrder; // Get newly placed order

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error getting orders data</div>;

    // ✅ Remove duplicate orders using a Map
    const uniqueOrders = new Map([...orders, newOrder].filter(Boolean).map(order => [order._id, order]));
    const updatedOrders = newOrder 
    ? [...orders.filter(order => order._id !== newOrder._id), newOrder] 
    : orders;



    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
            {updatedOrders.length === 0 ? (
                <div>No orders found!</div>
            ) : (
                <div>
                    {updatedOrders.map((order, index) => (
                        <div key={order._id} className="border-b mb-4 pb-4">
                            <p className="p-1 bg-secondary text-white w-10 rounded mb-1"># {index + 1}</p>
                            <h2 className="font-bold">Order ID: {order._id}</h2>
                            <p className="font-semibold mt-2">Name: {order.name}</p>
                            <p className="font-semibold mt-2">Email: {order.email}</p>
                            <p className="font-semibold mt-2">Phone: {order.phone}</p>
                            <p className="font-semibold mt-2">Total Price: Rs.{order.totalPrice}</p>
                            <p className="font-semibold mt-2">Payment Method: {order.paymentMethod}</p>

                            <h3 className="font-semibold mt-2">Address:</h3>
                            <p>
                                {order.address.city}, {order.address.state}, {order.address.country},{" "}
                                {order.address.zipcode}
                            </p>
                            <h3 className="font-semibold mt-2">Products Id:</h3>
                            <ul>
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
