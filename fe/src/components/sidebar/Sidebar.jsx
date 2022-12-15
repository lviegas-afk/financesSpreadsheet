import React from 'react'
import Button from './Button'

export function Sidebar() {
  return (
    <div className="w-64">
      <div className="flex flex-col flex-1 text-white font-semibold text-l tracking-tight pt-10">
        <Button display="Inicio" url="/" />
        <Button display="Upload" url="/upload" />
        <Button display="Progresion" url="/chart" />
        <Button display="Verduleria" url="/verduleria" />
        <Button display="G-Doc" url="/google-doc" />
      </div>
    </div>
  );
}

export default Sidebar;