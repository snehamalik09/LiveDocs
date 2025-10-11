import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ImageButton = () => {
    const editor = useSelector((state: RootState) => state.editor.editor);
    const [imgUrl, setImgUrl] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (!editor) return;

        const updateColor = () => {
            const value = editor.getAttributes("image").src || "";
            setImgUrl(value);
        };

        editor.on("update", updateColor);
        editor.on("selectionUpdate", updateColor);

        return () => {
            editor.off("update", updateColor);
            editor.off("selectionUpdate", updateColor);
        };
    }, [editor]);


    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
        setImgUrl("");
    }

    const upload = () => {
        const input = document.createElement('input');
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement)?.files?.[0];
            if (file) {
                const url = URL.createObjectURL(file);
                onChange(url);
            }
        }

        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imgUrl) {
            onChange(imgUrl);
            setIsDialogOpen(false);
            setImgUrl("");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('text-sm text-white h-7 min-w-7 flex items-center justify-center rounded-sm bg-dark-350 outline-none cursor-pointer  hover:bg-dark-300/80')}>
                    <ImageIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='cursor-pointer'>
                <DropdownMenuItem onClick={upload} >
                    <UploadIcon className='size-4 mr-2' />
                    Upload
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <SearchIcon className='size-4 mr-2' />
                    Paste image url
                </DropdownMenuItem>
            </DropdownMenuContent>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image Url</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert Img url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter")
                                handleImageUrlSubmit();
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}> Insert </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DropdownMenu>


    )
}

export default ImageButton;
