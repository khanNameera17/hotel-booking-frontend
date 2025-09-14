import React from 'react';
import Link from 'next/link';

export default function Room({ room }) {
  return (
    <article className="room">
      <div className="img-container">
        <img
          src={room?.images?.[0]?.url || '/img/jpeg/room-1.jpeg'}
          alt={room?.name || 'room'}
        />
        <div className="room-price">${room?.price}</div>
      </div>
      <div className="room-footer">
        <h4>{room?.name}</h4>
        <p>{room?.room_description || ''}</p>
        <p>Capacity: {room?.room_capacity || 1} person(s)</p>
        <p>Size: {room?.size || 0} m²</p>
        <p>Type: {room?.type || 'single'}</p>
        <p>
          Pets Allowed: {room?.petsAllowed ? 'Yes' : 'No'} | Breakfast Included: {room?.breakfastIncluded ? 'Yes' : 'No'}
        </p>
        <Link href={`/rooms/${room?._id}`} className="btn-primary">
          View Details
        </Link>
      </div>
    </article>
  );
}
