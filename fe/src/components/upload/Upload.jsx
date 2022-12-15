import React from 'react'
import UploadFile from "./UploadFile";
import UploadList from "./UploadList";

function Upload() {
  return (
    <div className='containter flex flex-col w-full p-10 grid grid-cols-3 gap-4 overflow-hidden'>
      <UploadFile/>  
      <UploadList/>  
    </div>
  )
}

export default Upload
