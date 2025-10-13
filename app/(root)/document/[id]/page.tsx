"use client";
import Header from '@/components/Header'
import Editor from '@/components/Editor'
import Toolbar from "@/components/Toolbar";
import { useParams } from 'next/navigation';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useGetDocumentByIdQuery } from '@/store/documentApi';

const Document = () => {
  const params = useParams();
  const id = params?.id;

const { data, isLoading, isError } = useGetDocumentByIdQuery( id as string, { skip: !id } );


  if (isLoading) return <p>Loading document...</p>;
  if (isError || !data) return <p>Failed to load document</p>;
  
  return (
    <>
      <Header>
        <div className='flex items-center justify-center gap-2 w-fit'>
          <p className='document-title'>{data.title}</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Toolbar/>
      <Editor documentId={data._id} initialContent={data.content} />
    </>
  );
}

export default Document;


