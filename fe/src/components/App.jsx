import { UploadContextProvider } from "../context/UploadContext";
import Upload from './upload/Upload'

function App() {
  return (
    <>
      <UploadContextProvider>
        <Upload />
      </UploadContextProvider>
    </>
  );
}

export default App;
