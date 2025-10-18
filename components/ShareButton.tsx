import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAddCollaboratorMutation } from '@/store/documentApi'


const ShareButton = ({ id }: { id?: string }) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [addCollaborator] = useAddCollaboratorMutation();

    if (!id) {
        console.error("Document ID is missing");
        return;
    }

    const handleShare = async () => {
        if (!email) return alert("Please enter an email");
        const data = {
            email,
            role
        }
        console.log("sharing item is : ", data);
        try {
            const newDoc = await addCollaborator({ id, data }).unwrap();
            console.log("Document updated!", newDoc);
        } catch (err) {
            console.error("Failed to add collaborator:", err);
            alert("Failed to share document. Please check console for details.");
        }
        finally {
            setEmail("");
            setRole("viewer");
            setIsDialogOpen(false);
        }
    }

    return (
        <>
            <button className='gradient-blue flex shadow-md text-white cursor-pointer p-2 rounded-xl h-7' onClick={() => { setIsDialogOpen(true) }}>
                Share
            </button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key == "Enter")
                                handleShare();
                        }}
                    />

                    <DialogFooter>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className={cn('text-sm text-white flex items-center justify-center rounded-sm bg-dark-350 outline-none cursor-pointer')}>
                                    {role} V
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                                <button onClick={() => setRole("viewer")}>Viewer</button>
                                <button onClick={() => setRole("editor")}>Editor</button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={handleShare} className='cursor-pointer'> Share </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ShareButton;
