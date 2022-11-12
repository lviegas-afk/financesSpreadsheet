import React from "react";
import UploadDetail from "./UploadDetail";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {UploadContext} from '../../context/UploadContext'

function UploadList() {
  

  const context = useContext(UploadContext)

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/uploadList/lucas").then((response) => {
        context.setList(response.data);
    });
  }, []);

  return (
    <div className="container">
      <table> 
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre archivo</th>
            <th>% procesado</th>
          </tr>
        </thead>
        <tbody>
          {context.list.map((detail) => {
            return <UploadDetail value={detail} key={detail.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UploadList;
