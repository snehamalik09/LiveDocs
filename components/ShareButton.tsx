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
import Loader from './Loader'
import { ChevronDown } from 'lucide-react'

const ShareButton = ({ id }: { id?: string }) => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sharingInProgress, setSharingInProgress] = useState(false);
    const [addCollaborator] = useAddCollaboratorMutation();

    if (sharingInProgress) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <Loader />
            </div>
        );
    }

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
            setSharingInProgress(true);
            setEmail("");
            setRole("viewer");
            setIsDialogOpen(false);
            const newDoc = await addCollaborator({ id, data }).unwrap();
            console.log("Document updated!", newDoc);
        } catch (err) {
            setEmail("");
            setRole("viewer");
            setIsDialogOpen(false);
            console.error("Failed to add collaborator:", err);
            alert("Failed to share document. Please check console for details.");
        }

        finally {
            setSharingInProgress(false);
        }
    }

    return (
        <>
            <button className='gradient-blue flex shadow-md text-white cursor-pointer px-4 rounded-xl h-7' onClick={() => { setIsDialogOpen(true) }}>
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
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button className="cursor-pointer flex gap-1 justify-center items-center">
                                    <p className="m-0 leading-none">{role}</p>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>


                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                                <button className=' hover:bg-neutral-300/80 hover:rounded-lg' onClick={() => setRole("viewer")}>Viewer</button>
                                <button className=' hover:bg-neutral-300/80 hover:rounded-lg' onClick={() => setRole("editor")}>Editor</button>
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
