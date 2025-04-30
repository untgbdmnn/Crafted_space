"use client";

import React from 'react'
import { HiLanguage } from "react-icons/hi2";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function ToggleLanguage() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className='cursor-pointer'>
                        <HiLanguage size={24} />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Languages</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
