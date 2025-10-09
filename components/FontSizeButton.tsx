import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MinusIcon, PlusIcon, TypeIcon } from 'lucide-react';
import { cn } from '@/lib/utils'
import { Input } from './ui/input';

const FontSizeButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);
    const [value, setValue] = useState(editor?.getAttributes('textStyle').fontSize ? editor.getAttributes("textStyle").fontSize.replace("px", "") : "16");

    useEffect(() => {
        if (!editor) return

        const updateFontSize = () => {
            const fontSize = editor.getAttributes("textStyle").fontSize;
            if (fontSize) setValue(fontSize.replace("px", ""))
        }

        editor.on("update", updateFontSize)
        editor.on("selectionUpdate", updateFontSize)

        return () => {
            editor.off("update", updateFontSize)
            editor.off("selectionUpdate", updateFontSize)
        }
    }, [editor])

    const onChange = (value: string) => {
        if (!editor) return;
        editor?.chain().focus().setFontSize(`${value}px`).run();
    }

    const decrease = () => {
        if (!editor) return;
        const newSize = Number(value) - 1;
        setValue(newSize.toString());
        editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }

    const increase = () => {
        if (!editor) return;
        const newSize = Number(value) + 1;
        setValue(newSize.toString());
        editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }

    return (

        <div className='flex items-center gap-1 px-2 py-1 rounded text-sm select-none'>
            <button className='px-2 py-1 bg-gray-200 cursor-pointer dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600' onClick={decrease}>
                <MinusIcon className='size-4' />
            </button>
            
            
            <Input className='w-14 text-center text-sm p-1 text-white outline-none border-none' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                if (e.key == "Enter"){
                    e.preventDefault();
                    onChange(value)
                }
            }} />
            <button className='px-2 py-1 bg-gray-200 cursor-pointer dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600' onClick={increase}>
                <PlusIcon className='size-4' />
            </button>
        </div>
    )
}

export default FontSizeButton;
