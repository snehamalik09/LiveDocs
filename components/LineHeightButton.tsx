import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, Link2Icon, ListCollapseIcon } from 'lucide-react';
import { cn } from '@/lib/utils'

const LineHeightButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);

    const onChange = (value: string) => {
        if (!editor) return;
        editor?.chain().focus().setLineHeight(value).run();
    }

    const lineHeights = [
        { label: "Default", value: "normal"},
        { label: "Single", value: "1"},
        { label: "1.15", value: "1.15"},
        { label: "1.5", value: "1.5"},
        { label: "Double", value: "2"},
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('text-sm text-white h-7 min-w-7 flex items-center justify-center rounded-sm bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80')}>
                    <ListCollapseIcon className='size-4 ' />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeights.map(({ label, value }) => (
                    <button key={value} onClick={() => onChange(value)}
                        className=' flex justify-between cursor-pointer items-center hover:bg-neutral-300/80' >
                        <span >{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LineHeightButton;
