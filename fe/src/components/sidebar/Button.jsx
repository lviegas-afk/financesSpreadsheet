import React from 'react'
import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <Link to={props.url}>
      <div className="w-full py-1 flex ">
        <div
          role="button"
          className="py-2 w-4/5 flex items-center box-content bg-blue-500 hover:bg-blue-600 rounded my-0 mx-auto">
          <div className="items-center my-0 mx-auto">
            <span>{props.display}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
