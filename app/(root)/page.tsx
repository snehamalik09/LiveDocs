
'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import AddDocumentButton from '@/components/AddDocumentButton'
import DocumentSkeleton from '@/components/DocumentSkeleton'
import { useGetAllDocumentsByIdQuery } from '@/store/UserApi'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { data: allDocuments, isLoading, isError, refetch } = useGetAllDocumentsByIdQuery(
    user?.id || "",
    { skip: !isLoaded || !user }
  );

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

      {isLoading && <DocumentSkeleton />}

      {
        allDocuments && allDocuments.length > 0 && !isLoading ? (
          <div className='document-list-container '>
            <div className='!flex max-w-[780px] w-full !justify-between items-center text-white'>
              <h1 className='text-2xl font-bold'>All Documents</h1>
              <AddDocumentButton refetch={refetch} />
            </div>
            {allDocuments.map((data, index) => (
              <div key={index} className='document-list-item bg-dark-350 cursor-pointer' onClick={() => router.push(`/document/${data._id}`)}>
                <div className='flex gap-4 lg:gap-8 items-center'>
                  <Image src='/assets/icons/doc.svg' alt='doc' width={60} height={60} className='bg-dark-500 rounded-lg p-1 md:p-2' />
                  <div className='flex flex-col gap-1'>
                    <p className='document-list-title font-bold text-xl text-white'>{data.title}</p>
                    <p className='text-xs text-[#d8d0d0]'>
                      {new Date(data.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true, 
                      })}
                    </p>
                  </div>
                </div>
                <Image src='/assets/icons/delete.svg' alt='delete' width={24} height={24} className='cursor-pointer' />
              </div>
            ))}
          </div>
        ) : !isLoading && (
          <div className='document-list-empty bg-dark-350'>
            <Image src='/assets/icons/doc.svg' alt='doc' width={40} height={40} className='mx-auto' />
            <AddDocumentButton refetch={refetch} />
          </div>
        )
      }
    </div>
  )
}

export default Page


// ToDO
// deploy clerk to production
// webhook for delete and update
// fontsize api is getting triggered unlimited times
// save button, download button functionality
// do we have to store document on cloudinary?
// viewer editor permissions are not added yet
// my personal gmail id is sending email for collaboration
