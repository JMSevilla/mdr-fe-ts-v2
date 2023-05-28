import React from 'react'
import UncontrolledCard from '@/components/Cards/Card'
import AboutUsCardContent from './AboutUsCardContent'


const AboutUsSecondLayer = () => {
  return (
    <div className="w-full h-auto ">
      <div className="flex flex-col md:flex-row">  
          <div className=" w-full md:w-2/4 h-auto ">
              <h3 className="text-black font-extrabold text-4xl m-5 py-5 text-center md:text-left">
                Our Mission
              </h3>
              <div className="justify justify-center items-center">
                <p className="m-2 p-4 md:m-9 mt-6 md:mt-14 font-medium leading-7 md:leading-[50px] text-black text-2xl md:text-2xl text-center md:text-left">
                  At Digital Resolve we aim to help business owners digitize their businesses with our innovative and creative web systems. We are a team of experts dedicated to ensuring that the systems our clients request meet their expectations and help them achieve their goals.
                </p>
              </div>
          </div>
            <div className="w-full md:w-2/4 h-auto bg-gradient-to-br from-[#973B74] to-[#B65D4F]">
              <h3 className="text-white font-extrabold text-4xl m-5 py-5 text-center md:text-left">
                Who we are
              </h3>
              <div className="justify justify-center">
                <p className=" m-2 p-4 md:m-9 mt-6 md:mt-14 font-medium leading-7 md:leading-[50px] text-white text-2xl md:text-2xl text-center md:text-left">
                  We are a team of innovative and creative individuals. Our team members come from diverse backgrounds and bring a wealth of experience and expertise to the table. We are passionate about helping businesses thrive in the digital age by providing top-of-the-line web systems and exceptional customer service.
                </p>
              </div>
            </div>

      </div>
    </div>
  )
}

export default AboutUsSecondLayer