import { createContext, useState } from "react";

export const UploadContext = createContext();

export function UploadContextProvider(props) {
  const [list, setList] = useState([]);
  
  return (
    <UploadContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {props.children}
    </UploadContext.Provider>
  );
}
