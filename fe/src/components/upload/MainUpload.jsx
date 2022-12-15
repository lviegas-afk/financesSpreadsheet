import React from 'react'
import Upload from './Upload'
import { UploadContextProvider } from '../../context/UploadContext'

export default function MainUpload() {
  return (
    <UploadContextProvider>
      <Upload />
    </UploadContextProvider>
  );
}
