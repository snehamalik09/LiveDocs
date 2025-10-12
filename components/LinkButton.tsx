import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'
import {Link2Icon } from 'lucide-react';
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

const LinkButton = () => {
  const editor = useSelector((state: RootState) => state.editor.editor);
  const [value, setValue] = useState("");

  useEffect(() => {
  if (!editor) return;

  const updateColor = () => {
    const value = editor.getAttributes("link").href || "#000000";
    setValue(value);
  };

  editor.on("update", updateColor);
  editor.on("selectionUpdate", updateColor);

  return () => {
    editor.off("update", updateColor);
    editor.off("selectionUpdate", updateColor);
  };
}, [editor]);


  const onChange = (href:string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
    setValue("");
  }
  
  return (
    <DropdownMenu onOpenChange={(open) => {
        if(open){
            setValue(editor?.getAttributes('link').href || "");
        }
    }}>
      <DropdownMenuTrigger asChild>
        <button className={cn('text-sm text-white h-7 min-w-7 flex items-center justify-center rounded-sm bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80')}>
          <Link2Icon className='size-4 '/>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2.5 flex items-center gap-2">
        <Input placeholder="https://example.com"  value={value} onChange={(e) => setValue(e.target.value)} />
        <Button className='cursor-pointer' onClick={()=>onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinkButton;
