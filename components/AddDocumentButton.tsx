'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useCreateDocumentMutation } from '@/store/documentApi';

interface AddDocumentButtonProps{
    refetch: () => void;
}

const AddDocumentButton: React.FC<AddDocumentButtonProps> = ({ refetch }) => {
    const router = useRouter();
    const { user, isSignedIn, isLoaded } = useUser();
    const [createDocument] = useCreateDocumentMutation();

    async function addDocumentHandler() {
        try {
            if (user && isSignedIn) {
                const body = {
                    title: "Untitled",
                    ownerId: user.id,
                    content: "",
                }
                const newDoc = await createDocument(body).unwrap();
                router.push(`/document/${newDoc?._id}`);
                refetch();
            }
            else {
                router.push('/sign-in');
                return;
            }
        }
        catch (err) {
            console.error("Failed to create room/document", err);
        }
    }

    return (
        <div>
            <Button onClick={addDocumentHandler} type="submit" className='gradient-blue flex gap-1 shadow-md text-white cursor-pointer'>
                <Image src='/assets/icons/add.svg' alt='add' width={24} height={24} />
                <p className='hidden sm:block'>Start a Blank Document </p>
            </Button>
        </div>
    )
}

export default AddDocumentButton
