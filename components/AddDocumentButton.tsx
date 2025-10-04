'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';


const AddDocumentButton = () => {
    const router = useRouter();
    const { user, isSignedIn, isLoaded } = useUser();

    async function addDocumentHandler() {
        try {
            if (isLoaded && !isSignedIn) {
                router.push('/sign-in');
                return;
            }
            console.log('button clicked');
            const id = 23;
            router.push(`/document/${id}`);

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
