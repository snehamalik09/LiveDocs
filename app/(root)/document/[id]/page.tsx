"use client";

import { ReactNode } from "react";
import Loader from '@/components/Loader'
import Header from '@/components/Header'
import Editor from '@/components/Editor'
import Toolbar from "@/components/Toolbar";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Document = () => {
  return (
    <>
      <Header>
        <div className='flex items-center justify-center gap-2 w-fit'>
          <p className='document-title'>This is fake document Title</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Toolbar/>
      <Editor />
    </>
  );
}

export default Document;


