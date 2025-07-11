import React from 'react'

const Contact = () => {
  return (
    <div className='pt-32 sm:w-[80vw] m-auto mb-24'>
      <div className='font-semibold text-center text-4xl mb-10'>CONTACT US</div>
      <div className='flex justify-center gap-10'>
        <img src="https://www.suburbanortho.com/wp-content/uploads/2023/09/contact-us-img.webp" 
        alt="contact-img"
        className='hidden sm:block h-[400px] w-[400px]' />
        <div className='mt-5'>
          <div className='mb-10'>
            <p className='text-3xl font-medium mb-5'>OUR OFFICE</p>
            <div>
              <p>🏢  123 Health Street</p>
              <p>📍 Mumbai, India- 400 019</p>  
            </div>
          </div>

          <div>
            <p className='text-3xl font-medium mb-5'>Contact Information </p>
            <div>
            </div>
              <p>📞 Phone: <a href="tel:+919876543210" className="hover:text-gray-500">+91 98765 43210</a></p>
              <p>✉️ Email: <a href="mailto:support@careconnect.com" className="hover:text-gray-500">support@careconnect.com</a></p> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact