import React from 'react';
import MediaSlider from '../components/MediaSlider';

const doctors = [
    {
        name: "Dr. Anjali Sharma",
        specialty: "Cardiologist",
        rating: 4.9,
        reviews: 124,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Dr. Rahul Verma",
        specialty: "Dermatologist",
        rating: 4.8,
        reviews: 98,
        image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        name: "Dr. Meera Nair",
        specialty: "Neurologist",
        rating: 4.7,
        reviews: 89,
        image: "https://randomuser.me/api/portraits/women/48.jpg",
    },
];

const sectors = [
  { name: "Skin Specialist", icon: "🧴" },
  { name: "Hair Specialist", icon: "💇‍♀️" },
  { name: "Gynecologist", icon: "🩺" },
  { name: "Dentist", icon: "🦷" },
  { name: "Cardiologist", icon: "❤️" },
  { name: "Orthopedic", icon: "🦴" },
  { name: "Pediatrician", icon: "👶" },
  { name: "Neurologist", icon: "🧠" },
];


const testimonials = [
  {
    name: "Riya Sharma",
    role: "Software Engineer",
    feedback:
      "CareConnect made it so easy to book a dermatologist appointment. The process was seamless and super quick!",
    image: "https://randomuser.me/api/portraits/women/48.jpg", // Replace with real images or use a placeholder
  },
  {
    name: "Ankit Mehta",
    role: "College Student",
    feedback:
      "I was able to consult a gynecologist for my sister without waiting in queues. Great platform!",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    name: "Dr. Neha Kapoor",
    role: "Pediatrician",
    feedback:
      "As a healthcare professional, I found CareConnect to be efficient and trustworthy for patient connections.",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

const HomePage = () => {
    return (
        <div className="bg-white text-[#1F2937] font-sans">
            {/* Hero Section */}
            <section className="bg-[#F2F5FF] flex gap-5 items-center">
                {/* <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10"> */}
                {/* Left: Media Slider */}
                <div className="w-full md:w-1/2">
                    <MediaSlider />
                    {/* Replace with your slider component or images */}
                    {/* <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Doctor Preview" className="rounded-xl shadow-lg" /> */}  
                </div>

                {/* Right: Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#5C67F2] mb-4">
                        Connect with Trusted Doctors, Instantly
                    </h1>
                    <p className="text-lg text-[#6B7280] max-w-xl">
                        CareConnect helps you find the right specialists and book appointments with ease — anytime, anywhere.
                    </p>
                    <div className="mt-8">
                        <button className="bg-[#5C67F2] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-600 transition">
                            Book Your Appointment
                        </button>
                    </div>
                </div>
                {/* </div> */}
            </section>



            {/* Features Section */}
            <section className="py-16 px-6 bg-white">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#5C67F2] mb-4 text-center">
                    Why CareConnect
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                    <div>
                        <h3 className="text-xl font-semibold text-[#5C67F2] mb-2">24/7 Access</h3>
                        <p className="text-[#6B7280]">Book or consult anytime — day or night.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-[#5C67F2] mb-2">Top Verified Doctors</h3>
                        <p className="text-[#6B7280]">All specialists are verified and reviewed.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-[#5C67F2] mb-2">Instant Booking</h3>
                        <p className="text-[#6B7280]">Fast and secure appointment scheduling.</p>
                    </div>
                </div>
            </section>
            <p className='w-[80%] h-[2px] rounded-full bg-[#5C67F2] mx-auto'></p>

            {/* Categories we serve */}
            <section className="py-20 px-6 bg-white text-center" id="sectors">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#5C67F2] mb-4">
                    Sectors We Serve
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                    Connect with verified specialists across various medical sectors from the comfort of your home.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {sectors.map((sector, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition flex flex-col items-center gap-3"
                        >
                            <div className="text-4xl">{sector.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                {sector.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Top Doctors Section */}
            <section className="py-16 px-6 bg-[#F2F5FF]">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#5C67F2] mb-4">Top Rated Doctors</h2>
                    <p className="text-[#6B7280]">Highly reviewed and recommended by patients</p>
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                    {doctors.map((doc, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
                            <img
                                src={doc.image}
                                alt={doc.name}
                                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                            />
                            <h4 className="text-lg font-semibold text-[#1F2937]">{doc.name}</h4>
                            <p className="text-[#5C67F2]">{doc.specialty}</p>
                            <p className="text-sm text-[#6B7280] mt-2">⭐ {doc.rating} | {doc.reviews} reviews</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials section */}
            <section className="py-20 px-6 bg-white text-center" id="testimonials">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#5C67F2] mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                Real stories from real users who found the care they needed through CareConnect.
              </p>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {testimonials.map((user, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover mb-4"
                    />
                    <h3 className="font-semibold text-lg text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{user.role}</p>
                    <p className="text-gray-600 italic">"{user.feedback}"</p>
                  </div>
                </div>
              ))}
            </div>
            </section>

        </div>
    );
};

export default HomePage;
