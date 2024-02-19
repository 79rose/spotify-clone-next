"use client";

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
   
    const router = useRouter();
        const {onOpen} = useAuthModal();
    const handleLogout = () => {
        // logout user
    }
    return (
        <div className={twMerge(`
            bg-gradient-to-b 
            from-emerald-800
            p-6
            h-fit
            `,
            className
        )}>
            <div className='
            w-full mb-4 flex justify-between items-center
            '>
                <div className='
                hidden md:flex gap-x-2 items-center
                '>
                    <button
                        onClick={() => router.back()}
                        className=' rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretLeft size={35}></RxCaretLeft>
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className=' rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
                    >
                        <RxCaretRight size={35}></RxCaretRight>
                    </button>
                </div>
                <div className='flex gap-2'>
                      <div className='flex md:hidden items-center gap-x-2'>
                    <button className='
                      rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition
                    '>
                        <HiHome className='text-black' size={20}></HiHome>
                    </button>
                </div>
                 <div className='flex md:hidden items-center gap-x-2'>
                    <button className='
                      rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition
                    '>
                        <BiSearch className='text-black' size={20}></BiSearch>
                    </button>
                </div>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    <>
                     <div>
                            <Button
                                onClick={() => {onOpen() }}
                                className='bg-transparent text-neutral-300 font-medium'>
                              Sign Up  
                        </Button>
                        </div>
                     <div>
                            <Button
                                onClick={() => { onOpen()}}
                                className='bg-white px-6 py-2 '>
                              Log in 
                        </Button>
                    </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;