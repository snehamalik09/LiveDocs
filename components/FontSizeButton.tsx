import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Input } from './ui/input';

const FontSizeButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);
    const [value, setValue] = useState(editor?.getAttributes('textStyle').fontSize ? editor.getAttributes("textStyle").fontSize.replace("px", "") : "16");

    useEffect(() => {
        if (!editor) return;

        const updateFontSize = () => {
            const size = editor?.getAttributes("textStyle").fontSize;
            console.log("font size current : ", size);
            if (size) {
                setValue(size.replace("px", ""));
            } else {
                setValue("16");
            }
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
        const size = Number(value);
        if (isNaN(size) || size < 8 || size > 100) return;
        editor?.chain().focus().setFontSize(`${value}px`).run();
    }

    const decrease = () => {
        if (!editor) return;
        const newSize = Math.max(Number(value) - 1, 8);
        setValue(newSize.toString());
        editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }

    const increase = () => {
        if (!editor) return;
        const newSize = Math.min(Number(value) + 1, 100);
        setValue(newSize.toString());
        editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }

    return (

        <div className='h-7 flex items-center gap-1 px-2 py-1 rounded text-sm select-none'>
            <button className='min-w-5 h-5 flex justify-center items-center bg-gray-200 cursor-pointer dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600' onClick={decrease}>
                <MinusIcon className='size-4' />
            </button>


            <Input
                className='w-14 h-7 text-center text-sm text-white bg-dark-350
    outline-none border-none
    focus:outline-none focus:ring-0 focus:shadow-none
    active:outline-none active:ring-0 active:shadow-none'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        e.preventDefault();
                        onChange(value)
                    }
                }}
            />

            <button className='min-w-5 h-5 flex justify-center items-center bg-gray-200 cursor-pointer dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600' onClick={increase}>
                <PlusIcon className='size-4 ' />
            </button>
        </div>
    )
}

export default FontSizeButton;
