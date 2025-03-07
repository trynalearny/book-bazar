import React ,{useEffect,useState} from 'react'
import BookCard from '../books/Bookscard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// import required modules
import { Pagination,Navigation } from 'swiper/modules';
const categories =["Choose a genre","Business","Fiction","Horror","Adventure","Marketing","Sci Fiction", "Fantasy","Mystery", "Thriller","Romance","Self Help" ,"Crime","Biography","Cooking",
  "Travel" ,"Children Book","Short Stories","Award Winner","Indian-literature","Technology"];
export const TopSeller = () => {
    
    const [selectedCategory,setSelectedCategory]=useState("Choose a genre");
    const {data: books = []} = useFetchAllBooksQuery();

  const filteredBooks=selectedCategory==="Choose a genre" ? books :books.filter(book=> book.category===selectedCategory.toLowerCase())

  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
        <div className='mb-8 flex items-center'>
        <select 
        onChange={(e)=> setSelectedCategory(e.target.value)}
        name="category" id="category"     className="border bg-white text-black dark:bg-black dark:text-white border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none"
>
           {
            categories.map((category,index)=>(
                <option key={index} value={category}>{category}

                </option>
            ))
           }
        </select>
        
    </div>
    <Swiper 
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180:{
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination,Navigation]}
        className="mySwiper"
      >
         {
      filteredBooks.length>0 && filteredBooks.map((book,index)=>(
        <SwiperSlide key={index}>
          <BookCard book={book}/></SwiperSlide>
        

      ))
    }
       
        
      </Swiper>
   
    </div>
  )
}
export default TopSeller