import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UploadContext } from "../../context/UploadContext";

function UploadFile() {
  const [file, setFile] = useState({
    // Initially, no file is selected
    selectedFile: null,
  });

  const context = useContext(UploadContext);

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", file.selectedFile, file.selectedFile.name);

    // Details of the uploaded file
    console.log(formData);

    // Request made to the backend api
    // Send formData object
    axios
      .post("http://localhost:5000/api/uploadFile", formData)
      .then((response) => {
        //actualizo el state
        axios
          .get("http://127.0.0.1:5000/api/uploadList/lucas")
          .then((response) => {
            context.setList(response.data);
          });
      });
  };
  return (
    <div className="flex items-center p-2 font-semibold text-l overflow-scroll no-scrollbar w-auto">
      <div className="flex items-center p-2 h-2/6 border-double border-4 border-sky-500 rounded-lg w-full">
        <div className="my-0 mx-auto">
          <input
            type={"file"}
            onChange={(e) => {
              setFile({
                // Initially, no file is selected
                selectedFile: e.target.files[0],
              });
            }}
          />
        </div>
        <div className="my-0 mx-auto w-full py-1 flex">
          <div
            role="button"
            className="py-2 flex items-center box-content bg-blue-500 hover:bg-blue-600 rounded my-0 mx-auto w-2/5"
            onClick={onFileUpload}
          >
            <div className="items-center my-0 mx-auto text-white">
              <span>Subir!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
