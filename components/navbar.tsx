"use client";
import React, { useState } from 'react'
import { ButtonTheme } from './toggle-theme';
import { ToggleLanguage } from './toggle-language';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/navigation';

export function PrivateNavbar() {
    const router = useRouter();
    const [state, setState] = useState({
        hovered: false,
        open_menu: false,
    })

    const handleHover = (value: boolean) => {
        setState(prevState => ({
            ...prevState, hovered: value
        }))
    }

    return (
        <div className='top-1 sticky w-full h-full'>
            <div className='w-full flex items-center justify-between py-1.5 px-3 rounded-sm backdrop-blur-lg bg-foreground/20'>
                <h1 className='cursor-pointer font-bold text-base lg:text-lg w-fit' onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                    {state.hovered ? "Untung Budiman" : "Crafted Space"}
                </h1>
                <div className='flex items-center space-x-2 justify-center'>
                    <ButtonTheme />
                    <ToggleLanguage />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <BiMenuAltRight size={24} className='cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' side='bottom'>
                            <DropdownMenuItem className='cursor-pointer' onClick={() => router.push('/registered/profile')}>Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </div>
    )
}
