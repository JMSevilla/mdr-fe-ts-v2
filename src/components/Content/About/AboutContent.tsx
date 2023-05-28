import React from 'react'
import  { useRouter } from 'next/router'


const AboutContent = () => {
  const Router = useRouter()
  return (
    <>
      <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem] ">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678">
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
        <h3 className="p-4 cursor-pointer">
          <a onClick={() => Router.push('/')}>
            <span aria-hidden="true">&larr;</span> Home
          </a>
        </h3>
        <div className="flex justify-center items-center h-0 w-full">
          <img
            className="w-[200px] items-center md:w-[305px]"
            src="drlogo.png"
            alt="Digital Resolve logo"
          />
        </div>
      </div>
      <div className="h-[60vh] md:h-[85vh] w-full">
        <div className="flex justify-center items-center mx-auto max-w-6xl py-32 sm:py-48 lg:py-56 flex-col">
          <p className="text-3xl text-center tracking-tight font-semibold md:text-5xl">
            Empowering businesses for the digital age
          </p>
          <p className="text-2xl text-center tracking-tight md:text-4xl">
            with our innovative web systems
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutContent 