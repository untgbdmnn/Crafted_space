import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | Crafted Space",
    description: "Generated by create next app",
  };

interface Props {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
    <div className="w-full h-full p-5">{children}</div>
    )
}
