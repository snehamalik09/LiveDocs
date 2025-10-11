import React from 'react'
import {type ColorResult, CirclePicker} from 'react-color';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'

const TextColorButton = () => {
  const editor = useSelector((state: RootState) => state.editor.editor);
  const [color, setColor] = useState("#000000")

  useEffect(() => {
  if (!editor) return;

  const updateColor = () => {
    const value = editor.getAttributes("textStyle").color || "#000000";
    setColor(value);
  };

  editor.on("update", updateColor);
  editor.on("selectionUpdate", updateColor);

  return () => {
    editor.off("update", updateColor);
    editor.off("selectionUpdate", updateColor);
  };
}, [editor]);


  const onChange = (color:ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-between rounded-sm px-2 text-white bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80">
          <span className='text-sm'>A</span>
          <div className='h-0.5 w-full' style={{backgroundColor:color}} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2.5">
        <CirclePicker onChange={onChange} color={color} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TextColorButton;