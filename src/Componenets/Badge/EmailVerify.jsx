import React from 'react';

export default function EmailVerifyBadge({ status }) {
  const isVerified = status === true || status === "true";
  const isNotVerified = status === false || status === "false";

  return (
    <span
      className={`inline-block py-1 px-3 rounded-full text-[11px] capitalize font-medium ${
        isVerified
          ? "bg-green-500 text-white"
          : isNotVerified
          ? "bg-red-500 text-white"
          : "bg-gray-400 text-white"
      }`}
    >
      {isVerified ? "Verified" : isNotVerified ? "Not Verified" : "Unknown"}
    </span>
  );
}
