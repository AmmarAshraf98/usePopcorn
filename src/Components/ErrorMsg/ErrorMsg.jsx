import React from "react";

export default function ErrorMsg({ message }) {
  return (
    <p className='loader'>
      <span>⛔</span> {message}
    </p>
  );
}
