import { Button } from '@/components/ui/button';

import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
        <div className="flex justify-center p-50 gap-4 h-22">
            <h1 className='font-bold text-6xl'>
                Welcome
            </h1>
        </div>
        <div className="flex justify-center p-20 gap-4 h-16">
            <Link href='/main'>
              <Button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Get Started
              </Button>
            </Link>
        </div>
    </div>
  )
}

export default LandingPage;