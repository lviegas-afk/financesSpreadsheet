import React from 'react'
import UploadFile from "./UploadFile";
import UploadList from "./UploadList";

function Upload() {
  return (
    <div className='container mx-auto'>
      <UploadFile/>  
      <UploadList/>  
    </div>
  )
}

export default Upload
