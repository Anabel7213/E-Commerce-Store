import { Separator } from "./separator"

interface TextblockProps {
    title: string,
    description: string
}

export default function Textblock(props: TextblockProps) {
    return (
        <div className="flex flex-col gap-4 md:mx-16 my-16 sm:mx-8 text-center items-center">
            <h1 className="uppercase font-bold">{props.title}</h1>
            <p className="max-w-[800px] text-slate-500">{props.description}</p>
            <Separator className="mt-8"/>
        </div>
    )
}