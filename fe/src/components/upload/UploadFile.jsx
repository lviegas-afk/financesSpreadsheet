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
    <div>
      <h1>formulario para subir archivo</h1>
      <input
        type={"file"}
        onChange={(e) => {
          setFile({
            // Initially, no file is selected
            selectedFile: e.target.files[0],
          });
        }}
      />
      <button onClick={onFileUpload}>Upload!</button>
    </div>
  );
}

export default UploadFile;
