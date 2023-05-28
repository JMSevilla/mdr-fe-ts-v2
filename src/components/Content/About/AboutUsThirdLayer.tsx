import React from 'react'

const AboutUsThirdLayer = () => {
  return (
    <>
      <div className='m-4 md:m-10 px-0 md:px-5 justify justify-center items-center'>
        <h3 className="w-cover h-[82px] text-transparent font-extrabold text-[50px] px-0 md:px-10 text-center md:text-left bg-clip-text bg-gradient-to-r from-[#973B74] via-[#F3A006] to-[#973B74] md:w-fit">
            Who we are
        </h3>
      </div>
      <div className=" flex h-auto w-full items-center justify-center">
        <div className="m-6 md:m-20 w-[1233px] h-auto md:h-[358px] rounded-[71px] bg-gradient-to-tr from-transparent via-[#D22D6F] to-transparent p-[5px]">
          <div className="flex justify justify-center h-full w-full items-center rounded-[71px] bg-white">
            <p className='  text-black font-medium leading-7 md:leading-[50px] text-2xl md:text-2xl m-5 py-5 text-center md:text-left'>
            Our team is made up of talented individuals who are dedicated to providing the best possible service to our clients. We work closely together to ensure that our web systems are innovative, creative, and meet the needs of our clients. Our team members are constantly learning and growing, pushing the boundaries of what is possible with web systems.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-23rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678">
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
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
    </>
  )
}

export default AboutUsThirdLayer