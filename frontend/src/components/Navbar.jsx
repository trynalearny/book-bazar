import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext.jsx";
import { BsSun, BsMoon } from "react-icons/bs";
import { useFetchAllBooksQuery } from '../redux/features/books/booksApi.js';
import BookCard from '../pages/books/Bookscard';

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  
  // Fetch token and role from localStorage
  const [authToken, setAuthToken] = useState(null);
  const [role, setRole] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role"); // Admin/User role
    setAuthToken(storedToken);
    setRole(storedRole);
  }, []);

  const handleLogOut = () => {
    logout();
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("role"); // Clear role
    setAuthToken(null);
    setRole(null);
  };

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: books, error, isLoading } = useFetchAllBooksQuery();

  const filteredBooks = searchTerm
    ? books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookClick = () => {
    setSearchTerm('');
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center flex-wrap">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          <button
            onClick={toggleTheme}
            className="text-2xl p-2 rounded bg-gray-300 dark:bg-gray-700"
          >
            {theme === "light" ? <BsMoon /> : <BsSun />}
          </button>
          {/* Search input */}
          <div className="relative sm:w-72 w-full space-x-2 flex-grow">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
                {isLoading && <div className="px-4 py-2 text-gray-700">Loading...</div>}
                {error && <div className="px-4 py-2 text-gray-700">Error fetching books</div>}
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <div key={index} className="px-4 py-2 text-gray-700 hover:bg-gray-100 bg-gray-50 border-b border-gray-300" onClick={handleBookClick}>
                      <BookCard book={book} />
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-700">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2 mt-4 md:mt-0">
          <div className="flex space-x-4">
            <Link to="/about" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-yellow-500">About Us</Link>
            <Link to="/contact" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-yellow-500">Contact Us</Link>
            <Link to="/services" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-yellow-500">Services</Link>
            <Link to="/enquire" className="text-black dark:text-white hover:text-blue-500 dark:hover:text-yellow-500">Enquire</Link>
            
            
          </div>

          <div>
            {/* Check if user is logged in */}
            {currentUser || authToken ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User Avatar"
                    className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`}
                  />
                </button>
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-md z-40 bg-white text-black dark:bg-black dark:text-white font-bold text-xl">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // Show login button if no user is logged in
              <Link to="/Login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
            {/* Redirect users based on role */}
            {authToken && (
              <Link
                to={role === "admin" ? "/dashboard" : "/user-dashboard"}
                className="border-b-2 border-primary ml-4"
              >
                Dashboard
              </Link>
            )}
          </div>
          <Link to="/wishlist" className="relative">
            <HiOutlineHeart className="size-6 text-gray-600 hover:text-red-500" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length || 0}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
