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
    <div className="flex container col-span-2 py-10 mx-auto my-0 text-white font-semibold text-l ">
      <table className="my-0 mx-auto w-5/6 border-collapse border border-slate-500"> 
        <thead>
          <tr className="bg-indigo-900">
            <th className="border border-slate-600">Fecha</th>
            <th className="border border-slate-600">Nombre archivo</th>
            <th className="border border-slate-600">% procesado</th>
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
