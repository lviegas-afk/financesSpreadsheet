import React from "react";

function Navbar() {
  return (
    <div className="bg-blue-500 p-4 flex items-center justify-between">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">El logo de la aplicacion?</span>
      </div>
      <div className="flex items-center">
        <img src="https://robohash.org/lucas" alt="User" className="w-10 h-10 rounded mr-4" />
        <span className="text-white font-semibold text-xl tracking-tight">
          John Doe
        </span>
      </div>
    </div>
  );
}

export default Navbar;
