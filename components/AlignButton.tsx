import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, Link2Icon } from 'lucide-react';
import { cn } from '@/lib/utils'

const AlignButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);



    const onChange = (value: string) => {
        if (!editor) return;
        editor?.chain().focus().setTextAlign(value).run();
    }

    const alignments = [
        { label: "Align Left", value: "left", icon: AlignLeftIcon },
        { label: "Align Center", value: "center", icon: AlignCenterIcon },
        { label: "Align Right", value: "right", icon: AlignRightIcon },
        { label: "Justify", value: "justify", icon: AlignJustifyIcon },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('text-sm cursor-pointer text-white h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-2--/80')}>
                    <AlignLeftIcon className='size-4 ' />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button key={value} onClick={() => onChange(value)}
                        className=' flex justify-between cursor-pointer items-center ' >
                        <Icon className='size-4' />
                        <span>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AlignButton;
