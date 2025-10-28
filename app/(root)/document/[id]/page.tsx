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
import { useUser } from '@clerk/nextjs';
import AccessDenied from '@/components/AccessDenied';
import EditableTitle from '@/components/EditableTitle';

const Document = () => {
  const params = useParams();
  const id = params?.id;
  const { user } = useUser();

  const { data, isLoading, isError } = useGetDocumentByIdQuery(id as string, { skip: !id });


  if (isLoading) return <p>Loading document...</p>;
  if (isError || !data) return <p>Failed to load document</p>;

  const isAuthorized =
    data.ownerId === user?.id ||
    data.collaborators?.some(
      (c: any) => c.userId === user?.id || c.email === user?.primaryEmailAddress?.emailAddress
    );


  if (!isAuthorized) {
    return <AccessDenied/>
  }

  return (
    <>
      <Header>
        <EditableTitle id={data._id} initialTitle={data.title} />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>

      <Toolbar />
      <Editor documentId={data._id} initialContent={data.content} />
    </>
  );
}

export default Document;


