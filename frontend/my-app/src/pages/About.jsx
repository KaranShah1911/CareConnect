import React from 'react'

const About = () => {
  return (
    <div className='pt-32 flex flex-col items-center w-[80vw] m-auto mb-20'>
      {/* about us heading + left img + right text */}
      <div className='mb-20'>
        <div className='text-center text-2xl mb-10 font-semibold'>ABOUT US</div>
        <div className='flex justify-between gap-10 flex-wrap md:flex-nowrap'>
          {/* --------left img --------- */}
          <img 
          src="https://prescripto.vercel.app/assets/about_image-MG9zrc7b.png" alt="about-img"
          className='h-[400px] w-[400px] rounded-sm' />
          {/* right text */}
          <div className='flex flex-col gap-2 sm: justify-center'>
            <p className='text-2xl'>Welcome to <span className='font-bold text-[#5C67F2]'>CareConnect</span></p>
            <p> Your trusted companion for managing doctor appointments and health services with ease and efficiency. At CareConnect, we recognize the everyday challenges people face in booking appointments, finding the right specialist, and keeping track of medical interactions.</p>
            <p>CareConnect is dedicated to building a smart and user-friendly healthcare experience. By leveraging modern technology, we aim to simplify the way you connect with healthcare professionals — whether it’s your first consultation or follow-up care, we’re here for you at every stage.</p>

            <p className='mt-5 text-2xl font-medium'>Our Vision</p>
            <p>At CareConnect, our vision is to streamline healthcare access for everyone. We are committed to bridging the gap between patients and doctors through a seamless, reliable, and intuitive platform. Our goal is to empower individuals to take control of their health — anytime, anywhere.</p>
          </div>
        </div>
      </div>

      {/* three boxes */}
      <div className='mb-10'>
        <div className='text-xl font-medium mb-5'>WHY CHOOSE US : </div>
        <div className='flex flex-col sm:flex-row '>
          <div className='hover:bg-[#5C67F2] transition-all duration-400 border p-15 hover:text-white'>
            <p className='font-medium text-xl mb-4 '>EFFICIENCY</p>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='hover:bg-[#5C67F2] transition-all duration-400 border p-15 sm:border-x-0 hover:text-white'>
            <p className='font-medium text-xl mb-4 '>CONVENIENCE</p>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='hover:bg-[#5C67F2] transition-all duration-400 border p-15 hover:text-white'>
            <p className='font-medium text-xl mb-4 '>PERSONALIZATION</p>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About