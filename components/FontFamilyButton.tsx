import React from 'react'
import {ChevronDownIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'

const FontFamilyButton = () => {
  const editor = useSelector((state: RootState) => state.editor.editor);
  const [font, setFont] = useState("Arial")

  useEffect(() => {
    if (!editor) return

    const updateFont = () => {
      const currentFont = editor.getAttributes("textStyle").fontFamily
      setFont(currentFont || "Arial")
    }

    editor.on("update", updateFont)
    editor.on("selectionUpdate", updateFont)

    return () => {
      editor.off("update", updateFont)
      editor.off("selectionUpdate", updateFont)
    }
  }, [editor])
  
  const fonts = [
    { label: "Arial", value: "arial" },
    { label: "Times New Roman", value: "times new roman" },
    { label: "Georgia", value: "georgia" },
    { label: "Verdana", value: "verdana" },
    { label: "Courier New", value: "courier new" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[150px] shrink-0 flex items-center justify-center rounded-sm px-2 text-white bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80 ">
          <span className='truncate'>{font}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick = {() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            style={{fontFamily:value}}
            className={cn(
              "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
              font === value && "bg-neutral-200/80"
            )}
          >
            <span className='text-sm'> {label} </span> 
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FontFamilyButton;