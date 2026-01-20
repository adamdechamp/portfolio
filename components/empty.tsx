import Image from "next/image";


interface EmptyProps {
     label: string;
}

export const Empty = ({ label }: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image 
                    alt="Empty"
                    fill
                    src="/globe.svg"
                />
            </div>
            <p className="text-muted-foreground font-light mt-4">
                {label}
            </p>
        </div>
    );
}