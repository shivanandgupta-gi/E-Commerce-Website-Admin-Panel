import React from 'react';

export default function Badge({ status }) {
  return (
    <span
      className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize ${
        status === "pending"
          ? "bg-blue-500 text-white"
          : status === "confirm"
          ? "bg-green-500 text-white"
          : status === "delivered"
          ? "bg-green-700 text-white"
          : "bg-gray-400 text-white"
      }`}
    >
      {status}
    </span>
  );
}
