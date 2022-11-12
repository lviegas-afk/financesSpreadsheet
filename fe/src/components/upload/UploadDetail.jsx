import React from "react";

function UploadDetail(props) {
  return (
    <tr>
      <td>{props.value.date}</td>
      <td>{props.value.filename}</td>
      <td>{props.value.process} %</td>
    </tr>
  );
}

export default UploadDetail;
