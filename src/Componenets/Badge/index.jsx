import React from 'react'
//this page is for the status like pending and success or delivered
export default function Badge(props) {
  return (
    <span
        className={`inline-block py-1 px-4 rounded-full text-[11px] capitalize ${
            props.status === "pending" && "bg-primary text-white"
        } ${props.status === "confirm" && "bg-green-500 text-white"} ${
            props.status === "delevired" && "bg-green-700 text-white"
        }`}
        >
        {props.status}
    </span>
  )
}
