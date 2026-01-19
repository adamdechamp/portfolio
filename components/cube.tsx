'use client'

const Cube = () => {

    return(
        
        <div className="tech float prevent-select flex min-h-screen flex-col items-center justify-center">
            <div className="master-cube">
                <div className="outside back">1</div>
                <div className="outside right">2</div>
                <div className="outside left">3</div>
                <div className="outside top">4</div>
                <div className="outside bottom">5</div>
                <div className="outside front">6</div>
            </div>
        </div>
        
    )
}

export default Cube;