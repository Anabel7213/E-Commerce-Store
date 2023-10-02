interface ContainerProps {
    children: React.ReactNode
}

export default function Container(props: ContainerProps) {
    return (
        <div className="mx-auto max-w-7xl">
            {props.children}
        </div>
    )
}