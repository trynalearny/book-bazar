import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { addToWishlist, removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice';
import {HiOutlineHeart,HiHeart } from "react-icons/hi2";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const wishlist = useSelector((state) => state.wishlist.wishlist);

    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    const isInWishlist = book ? wishlist.some((item) => item._id === book._id) : false;

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(book._id)); // Use book._id to remove from wishlist
        } else {
            dispatch(addToWishlist(book)); // Add book to wishlist
        }
    };

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happending to load book info</div>
  return (
    <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="mb-8"
                    />
                </div>

                <div className=' font-bold mb-5'>
                    <p className="text-700 mb-2"> <strong>Author:</strong> {book.author && book.author !== 'admin' ? book.author : 'Unknown'}</p>
                    <p className="text-700 mb-4">
                        <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-700 mb-4 capitalize">
                        <strong>Category:</strong> {book?.category}
                    </p>
                    <p className=" text-700 mb-4">
            Rs.{book?.newPrice} <span className="line-through text-700 mb-4">Rs.{book?.oldPrice}</span>
            </p>
                    <p className="text-700"><strong>Description:</strong> {book.description}</p>
                </div>

                <div className="flex items-center gap-4">
    <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1">
        <FiShoppingCart />
        <span>Add to Cart</span>
    </button>
    <button onClick={handleWishlistToggle} className="text-red-500 text-2xl">
        {isInWishlist ? <HiHeart /> : <HiOutlineHeart />}
    </button>
</div>

            </div>
        </div>
  )
}

export default SingleBook