"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { TbSunset2 } from "react-icons/tb";
import { RiMoonFoggyLine } from "react-icons/ri";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function ButtonTheme() {
    const { theme, setTheme } = useTheme();
    const handleSwitch = () => {
        const isDark = theme === 'dark';
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <button className="cursor-pointer w-fit" onClick={handleSwitch}>
                        {theme == 'dark' ? (
                            <RiMoonFoggyLine size={25} className="text-blue-600" />
                        ) : (
                            <TbSunset2 size={25} className="text-yellow-600" />
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="capitalize">{theme == 'dark' ? "dark mode" : "light mode"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}