'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let currentLocation = "front";
let Xpos = true;
let Ypos = true;




const Cube = () => {
    useEffect(() => {
        const cube = document.getElementById("master-cube");

        window.addEventListener("mousedown", e => {
            x = e.clientX;
            y = e.clientY;
            console.log(x, y);
        });

        window.addEventListener("mouseup", e => {
            x2 = e.clientX - x;
            y2 = e.clientY - y;
            console.log(x2, y2);
            spin(currentLocation);
        });

        function spin(location: string) {
            const locations = [["front",0],["back",180],["left",-90],["right",90],["top",-90],["bottom",90]];
            const index = locations.findIndex(loc => loc[0] === location);
            if(cube != null){
                if(x2 < 0 || y2 < 0){
                    if(x2 < 0){
                        x2 = -1*x2;
                        Xpos = false;
                    }
                    if(y2 < 0){
                        y2 = -1*y2;
                        Ypos = false;
                    }
                }
                if(x2 > y2){
                    console.log("Y axis");
                    if(rotate(x2,Xpos) > 90 || rotate(x2,Xpos) < -90){
                        cube.style.transform = "rotateY("+(180+index)+"deg)";
                        currentLocation = "back";
                        Xpos = true
                    }
                    else if(rotate(x2,Xpos) <= 90 && rotate(x2,Xpos) > 0){
                        cube.style.transform = "rotateY("+(-90+index)+"deg)";
                        currentLocation = "left";
                        Xpos = true
                    }
                    else if(rotate(x2,Xpos) < 0 && rotate(x2,Xpos) >= -90){
                        cube.style.transform = "rotateY("+(90+index)+"deg)";
                        currentLocation = "right";
                        Xpos = true
                    }
                }
                else {
                    console.log("X axis");
                    if(rotate(y2,Ypos) > 90 || rotate(y2,Ypos) < -90){
                        cube.style.transform = "rotateX("+(180+index)+"deg)";
                        currentLocation = "back";
                        Ypos = true
                    }
                    else if(rotate(y2,Ypos) <= 90 && rotate(y2,Ypos) > 0){
                        cube.style.transform = "rotateX("+(-90+index)+"deg)";
                        currentLocation = "top";
                        Ypos = true
                    }
                    else if(rotate(y2,Ypos) < 0 && rotate(y2,Ypos) >= -90){
                        cube.style.transform = "rotateX("+(90+index)+"deg)";
                        currentLocation = "bottom";
                        Ypos = true
                    }
                }
            }
        }

        function rotate(coord: number,pos: boolean){
            coord = Math.floor((coord/2)/90)*90;
            if(!pos){
                coord = -1*coord;
            }
            console.log(coord);

            return(coord)
        }
    }, []);

    return(
        
        <div className="tech prevent-select flex min-h-300 flex-col items-center justify-center">
            <div className="master-cube" id="master-cube">
                <div className="outside back content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            BACK
                        </Button>
                    </Link>
                </div>
                <div className="outside right content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            RIGHT
                        </Button>
                    </Link>
                </div>
                <div className="outside left content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            LEFT
                        </Button>
                    </Link>
                </div>
                <div className="outside top content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            TOP
                        </Button>
                    </Link>
                </div>
                <div className="outside bottom content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            BOTTOM
                        </Button>
                    </Link>
                </div>
                <div className="outside front content-center">
                    <Link href='/main'>
                        <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            FRONT
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}

export default Cube;