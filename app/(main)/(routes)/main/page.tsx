import Cube from "@/components/cube";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import Starfield from "react-starfield";


const MainPage = () => {

    return(
        <>
        <div>
           
            <Script src="@/components/scripts/cube"/>
            <Starfield
                starCount={3000}
                starColor={[255 , 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
            />
            <div className="mb-1 space-y-4 w-full content-center">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Welcome
                </h2>
                <p className="mb-0 text-muted-foreground text-center font-light text-sm md:text-lg">
                    Choose a Path or Roll the Dice.
                </p>
                <div className="flex justify-center p-20 gap-4 h-16">
                    <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Roll
                    </Button>
                </div>
            </div>
            <div className="prevent-select flex min-h-screen flex-col items-center justify-top">
                <Cube />
            </div>
        </div>
        </>
    );
}


export default MainPage;