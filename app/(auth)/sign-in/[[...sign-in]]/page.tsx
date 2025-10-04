import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className='auth-page bg-dark-100'>
        <SignIn/>
    </main>
  )
}