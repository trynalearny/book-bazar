import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import { removeFromWishlist } from '../redux/features/wishlist/wishlistSlice';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../utils/getImgUrl'

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleMoveToCart = (book) => {
    dispatch(addToCart(book));
    dispatch(removeFromWishlist(book._id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((book) => (
            <div key={book._id} className="border p-4 rounded-lg shadow-md">
              <Link to={`/books/${book._id}`}>
              <img
                src={`${getImgUrl(book?.coverImage)}`}
                alt=""
                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
                <h3 className="text-lg font-semibold">{book.title}</h3>
              </Link>
              <p className="text-gray-600">Rs.{book.newPrice}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(book)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => dispatch(removeFromWishlist(book._id))}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
