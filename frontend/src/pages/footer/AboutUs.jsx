import React from 'react';
import bannerImg from '../../assets/Featured-image.webp';
import backgroundImg from '../../assets/background.jpg';
import coverImg from "../../assets/banner.png"
const AboutUs = () => {
  return (
    <div className="bg-cover bg-center py-8 px-4 sm:px-6 lg:py-12 lg:px-8" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="max-w-7xl mx-auto bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 py-12 px-8 rounded-lg shadow-lg ">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-3xl font-roboto">About Us</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-black-300 sm:mt-4 font-roboto">
            Welcome to Book Bazaar! We are passionate about connecting readers with their next great read.
          </p>
        </div>
        <div className="mt-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-roboto">Our Mission</h3>
              <p className="mt-4 text-lg text-black-500 dark:text-black-300 font-roboto">
                At Book Bazaar, we believe in the power of stories to inspire, educate, and entertain. Our mission is to provide a diverse and inclusive selection of books for every reader.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 font-roboto">Our Values</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-lg text-black-500 dark:text-gray-300 font-roboto">- Diversity and Inclusion</li>
                <li className="text-lg text-black-500 dark:text-gray-300 font-roboto">- Customer Satisfaction</li>
                <li className="text-lg text-black-500 dark:text-gray-300 font-roboto">- Quality and Excellence</li>
              </ul>
            </div>
            <div className="mt-10 lg:mt-0 animate-fadeIn">
              <img className="mx-auto rounded-lg shadow-lg" src={bannerImg} alt="Banner Image"/>
            </div>
          </div>
          <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="animate-fadeIn">
              <img className="mx-auto rounded-lg shadow-lg" src={coverImg} alt="Banner Image"/>
            </div>
            <div className="mt-10 lg:mt-0">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-roboto">Our Story</h3>
              <p className="mt-4 text-lg text-black-500 dark:text-black-300 font-roboto">
                Founded in 2021, Book Bazaar started as a small, family-owned bookstore. Today, we have grown into a thriving online community of book lovers, with a catalog that spans genres, formats, and languages.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 font-roboto">Join Us</h3>
              <p className="mt-4 text-lg text-black-500 dark:text-black-300 font-roboto">
                Whether you're a lifelong reader or just discovering the joy of books, we're here to help you find your next favorite read. Join us in celebrating the magic of books!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
