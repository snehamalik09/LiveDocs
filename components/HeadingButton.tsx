import React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { cn } from '@/lib/utils'
import { type Level } from '@tiptap/extension-heading'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'

const HeadingButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);

    const [heading, setHeading] = useState("Normal Text")

    useEffect(() => {
        if (!editor) return

        const getCurrentHeading = () => {
            for (let level = 1; level <= 5; level++) {
                if (editor?.isActive("heading", { level })){
                    setHeading(`Heading ${level}`);
                    return;
                }
            }
            setHeading('Normal Text');
        }

        editor.on("update", getCurrentHeading)
        editor.on("selectionUpdate", getCurrentHeading)

        return () => {
            editor.off("update", getCurrentHeading)
            editor.off("selectionUpdate", getCurrentHeading)
        }
    }, [editor])

    const headings = [
        { label: "Normal text", value: 0, fontSize: '16px' },
        { label: "Heading 1", value: 1, fontSize: '32px' },
        { label: "Heading 2", value: 2, fontSize: '24px' },
        { label: "Heading 3", value: 3, fontSize: '20px' },
        { label: "Heading 4", value: 4, fontSize: '18px' },
        { label: "Heading 5", value: 5, fontSize: '16px' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm px-2 text-white bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80">
                    <span className='truncate'>{heading}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <button
                        onClick={() => {
                            if (value === 0)
                                editor?.chain().focus().setParagraph().run();
                            else
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
                        }}
                        key={value}
                        style={{ fontSize }}
                        className={cn(
                            "flex items-center cursor-pointer gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-300/80",
                            (value === 0 && !editor?.isActive("heading")) || (editor?.isActive("heading", { level: value })) && "bg-neutral-200/80"
                        )}
                    >
                        <span> {label} </span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default HeadingButton;

