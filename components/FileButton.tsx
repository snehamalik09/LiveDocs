import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'

const FileButton = () => {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[150px] shrink-0 flex items-center justify-center rounded-sm px-2 text-white bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80 ">
          File
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 cursor-pointer">
        <Link href="/">
            Home
        </Link>
        <p>Save</p>
        <p>Download</p>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FileButton;