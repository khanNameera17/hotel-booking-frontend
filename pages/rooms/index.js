import { Empty, Result, Skeleton } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Banner from '../../components/home/Banner';
import Hero from '../../components/home/Hero';
import MainLayout from '../../components/layout';
import RoomFilter from '../../components/rooms/RoomsFilter';
import RoomList from '../../components/rooms/RoomsList';
import config from "../../config";

const backend_url = config.backend_url;

function Rooms({ rooms, error }) {
  const [ourRooms, setOurRooms] = useState([]); // All rooms from backend
  const [ourFilteredRooms, setOurFilteredRooms] = useState([]); // Filtered rooms

  // Initialize rooms once props are received
  useEffect(() => {
    if (rooms?.length) {
      setOurRooms(rooms);          // All rooms
      setOurFilteredRooms(rooms);  // Initially show all
    }
  }, [rooms]);

  return (
    <MainLayout title='Beach Resort ― Rooms'>
      <Hero hero='roomsHero'>
        <Banner title='our rooms'>
          <Link className='btn-primary' href='/'>
            return home
          </Link>
        </Banner>
      </Hero>

      <Skeleton loading={!rooms && !error} paragraph={{ rows: 10 }} active>
        {error ? (
          <Result
            title='Failed to fetch'
            subTitle={error || 'Something went wrong. App server error'}
            status='error'
          />
        ) : ourFilteredRooms.length === 0 ? (
          <Empty
            className='mt-10'
            description={<span>Sorry! No rooms were found.</span>}
          />
        ) : (
          <>
            <RoomFilter
              ourRooms={ourRooms}                     // pass all rooms for filtering
              setOurFilteredRooms={setOurFilteredRooms} // filtered rooms will update this
            />
            <RoomList
              rooms={ourFilteredRooms}               // display filtered rooms
            />
          </>
        )}
      </Skeleton>
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get(`${backend_url}/all-rooms-list`);
    const rooms = response?.data?.result?.data?.rows || []; // rooms array

    return {
      props: {
        rooms,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        rooms: [],
        error: err?.response?.data?.message || err?.message || 'Something went wrong',
      },
    };
  }
};

export default Rooms;
