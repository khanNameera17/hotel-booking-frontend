
import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import getConfig from 'next/config';
import Link from 'next/link';
import React from 'react';
import Banner from '../components/home/Banner';
import FeaturedRooms from '../components/home/FeaturedRooms';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import MainLayout from '../components/layout';
import config from "../config";

const backend_url = config.backend_url;
// const { publicRuntimeConfig } = getConfig();

function Home(props) {
  return (
    <MainLayout title='Beach Resort ― Home'>
      <Hero>
        <Banner
          title='luxurious rooms'
          subtitle='deluxe rooms starting at 299'
        >
          <Link href='/rooms' className='btn-primary'>
            our rooms
          </Link>
        </Banner>
      </Hero>
            {/* featured rooms */}
            <Skeleton loading={!props?.featuredRooms && !props?.error} paragraph={{ rows: 8 }} active>
        {props?.featuredRooms?.length === 0 ? (
          <Empty
            className='mt-5'
            description={(<span>Sorry! Any data was not found.</span>)}
          />
        ) : props?.error ? (
          <Result
            title='Failed to fetch'
            subTitle={props?.error?.message || 'Sorry! Something went wrong. App server error'}
            status='error'
          />
        ) : (
          <FeaturedRooms
            featuredRoom={props?.featuredRooms} 
          />
        )}
      </Skeleton>
      <Services />
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
 try {
   const response = await axios.get(`${backend_url}/all-rooms-list`);
   const featuredRooms = response?.data?.result?.data?.rows || [];

   return {
     props: {
       featuredRooms, // ✅ matches what Home expects
       error: null,
     },
   };
 } catch (err) {
   return {
     props: {
       featuredRooms: [], // ✅ keep naming consistent
       error: err?.response?.data?.message || err?.message || 'Something went wrong',
     },
   };
 }
};

export default Home;
// export async function getServerSideProps() {
//  try {
//    // Fetch data from the server-side API
//    const response = await axios.get(`${publicRuntimeConfig.API_BASE_URL}/api/v1/featured-rooms-list`);
//    const featuredRooms = response?.data?.result;

//    return {
//      props: {
//        featuredRooms,
//        error: null
//      }
//    };
//  } catch (err) {
//   return {
//     props: {
//       featuredRooms: null, // or rooms / room depending on the file
//       error: err?.response?.data?.message || err?.message || null
//     }
//   };
// }

// }