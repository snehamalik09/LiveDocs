
import React from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'
import AddDocumentButton from '@/components/AddDocumentButton'

interface DocumentType {
  title: string;
  created: string;
};

const page = async () => {
  const user = await currentUser();
  const allDocuments: DocumentType[] = [];

  return (
    <div className='home-container'>
      <Header className='sticky left-0 top-0' >
        <div className='flex items-center gap-2 lg:gap-4'>
          <Image src='/assets/icons/bell.svg' alt='search' width={16} height={16} className='cursor-pointer' />
          <Image src='/assets/icons/bell.svg' alt='bell' width={16} height={16} className='cursor-pointer' />
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="gradient-blue flex shadow-md text-white cursor-pointer">
                <span className="hidden sm:block">Sign In</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </Header>

      {
        allDocuments.length > 0 ? (
          <div className='document-list-container '>
            <div className='!flex max-w-[780px] w-full !justify-between items-center text-white'>
              <h1 className='text-2xl font-bold'>All Documents</h1>
              <AddDocumentButton />
            </div>
            {allDocuments.map((data, index) => (
              <div key={index} className='document-list-item bg-dark-350 '>
                <div className='flex gap-4 lg:gap-8 items-center'>
                  <Image src='/assets/icons/doc.svg' alt='doc' width={60} height={60} className='bg-dark-500 rounded-lg p-1 md:p-2' />
                  <div className='flex flex-col gap-1'>
                    <p className='document-list-title font-bold text-xl text-white'>{data.title}</p>
                    <p className='text-xs text-[#d8d0d0]'>{data.created}</p>
                  </div>
                </div>
                <Image src='/assets/icons/delete.svg' alt='delete' width={24} height={24} className='cursor-pointer' />
              </div>
            ))}
          </div>
        ) : (
          <div className='document-list-empty bg-dark-350'>
            <Image src='/assets/icons/doc.svg' alt='doc' width={40} height={40} className='mx-auto' />
            <AddDocumentButton />
          </div>
        )
      }
    </div>
  )
}

export default page



