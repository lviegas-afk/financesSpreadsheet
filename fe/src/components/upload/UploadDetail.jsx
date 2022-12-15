import React from "react";

function UploadDetail(props) {
  return (
    <tr className={"hover:bg-violet-400 " + (props.value.id % 2 ? "bg-indigo-400" : "bg-indigo-300")}>
      <td className="border border-slate-700">{props.value.date}</td>
      <td className="border border-slate-700">{props.value.filename}</td>
      <td className="border border-slate-700">
        <span className="block text-center mx-auto my-0">
          {props.value.process} %
        </span>
      </td>
    </tr>
  );
}

export default UploadDetail;
