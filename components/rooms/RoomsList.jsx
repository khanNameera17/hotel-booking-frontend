import React from 'react';
import { v4 as uniqueId } from 'uuid';

export default function RoomList({ rooms }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className='flex justify-center items-center mt-20'>
        <h3 className='text-xl text-gray-500 font-medium'>
          Unfortunately, no rooms matched your search parameters.
        </h3>
      </div>
    );
  }

   return (
    <div className="rooms-container">
    {/* Hero
    <section className="rooms-hero">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Luxury Hotel Rooms</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Experience exceptional comfort and elegance in our carefully curated selection of premium accommodations
      </p>
    </section>
   */}
    {/* Room Cards */}
    {/* <section className="rooms-grid">
      {rooms.map((room) => (
        <div key={uniqueId()} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="img-container w-full h-48 overflow-hidden">
            <img
              src={room?.room_images?.[0]?.url || '/img/jpeg/room-1.jpeg'}
              alt={room.room_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-lg font-semibold">{room.room_name}</h3>
            <p className="text-sm text-gray-500 mt-1">{room.room_type}</p>
            <p className="text-md text-indigo-600 font-bold mt-2">₹ {room.room_price}</p>
            <p className="text-sm text-gray-600 mt-1">
              Size: {room.room_size} m² | Capacity: {room.room_capacity} person(s)
            </p>
          </div>
        </div>
      ))}
    </section> */}

<section className="rooms-grid">
  {rooms.map((room) => (
    <div key={uniqueId()} className="cards">
      <div className="img-container">
        <img
          src={room?.room_images?.[0]?.url || '/img/jpeg/room-1.jpeg'}
          alt={room.room_name}
        />
      </div>
      <div className="card-body">
        <h3>{room.room_name}</h3>
        <p className="type">{room.room_type}</p>
        <p className="price">₹ {room.room_price}</p>
        <p className="details">
          Size: {room.room_size} m² | Capacity: {room.room_capacity} person(s)
        </p>
      </div>
    </div>
  ))}
</section>

  </div>
  
  );
}
