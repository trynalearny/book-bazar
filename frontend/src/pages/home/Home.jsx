import React from 'react'
import Banner from "./Banner";
import { TopSeller } from './TopSeller';
import Recommend from './Recommend';
import News from './news';
const Home = () => {
  return (
    <>
    <Banner/>
    <TopSeller/>
    <Recommend/>
    <News/>
  
    </>
  )
}
export default Home