import Image from "next/image";

export const Loader = () => {
    return(
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image 
                    alt="logo"
                    fill
                    src="/PC_logo5.png"
                />
            </div>
            <p className="test-sm text-muted-foreground">
                Alfred is thinking....
            </p>
        </div>
    );
};