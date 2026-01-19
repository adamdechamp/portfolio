import Cube from "@/components/cube";



const MainPage = () => {

    return(
        <div>
            <div className="mb-1 space-y-4 w-full content-center">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Welcome
                </h2>
                <p className="mb-0 text-muted-foreground text-center font-light text-sm md:text-lg">
                    Start schedualing your life now.
                </p>
            </div>
            <div className="prevent-select flex min-h-screen flex-col items-center justify-top">
                <Cube />
            </div>
        </div>
    );
}


export default MainPage;