import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: HeaderProps) => {
  return (
    <header
      className={`header bg-dark-100 text-white border-b-2 border-[#6B7280] flex items-center justify-between px-4 py-2 relative ${className}`}
    >
      <Link href='/' className='flex items-center'>
        <Image
          src='/assets/icons/logo.svg'
          alt='logo'
          width={120}
          height={32}
          className='hidden md:block'
        />
        <Image
          src='/assets/icons/logo-icon.svg'
          alt='logo'
          width={32}
          height={32}
          className='md:hidden'
        />
      </Link>

        {children}

    </header>
  );
};

export default Header;
