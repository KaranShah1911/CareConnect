import React from "react";

// dummy doctors data
const doctors = [
  {
    name: "Dr. Anjali Sharma",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 124,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    availability: true,
  },
  {
    name: "Dr. Rahul Verma",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 98,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    availability: false,
  },
  {
    name: "Dr. Meera Nair",
    specialty: "Neurologist",
    rating: 4.7,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    availability: true,
  },
  {
    name: "Dr. Arjun Singh",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 110,
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    availability: false,
  },
  {
    name: "Dr. Kavita Joshi",
    specialty: "Psychiatrist",
    rating: 4.6,
    reviews: 95,
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    availability: true,
  },
  {
    name: "Dr. Suresh Iyer",
    specialty: "Gynecologist",
    rating: 4.8,
    reviews: 105,
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    availability: true,
  },
  {
    name: "Dr. Priya Reddy",
    specialty: "Orthopedic",
    rating: 4.7,
    reviews: 87,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    availability: false,
  },
  {
    name: "Dr. Vikram Desai",
    specialty: "ENT Specialist",
    rating: 4.5,
    reviews: 78,
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    availability: true,
  },
  {
    name: "Dr. Sneha Kulkarni",
    specialty: "General Physician",
    rating: 4.6,
    reviews: 90,
    image: "https://randomuser.me/api/portraits/women/54.jpg",
    availability: false,
  },
  {
    name: "Dr. Rohan Mehta",
    specialty: "Ophthalmologist",
    rating: 4.8,
    reviews: 102,
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    availability: true,
  },
  {
    name: "Dr. Ananya Pillai",
    specialty: "Urologist",
    rating: 4.7,
    reviews: 88,
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    availability: true,
  },
  {
    name: "Dr. Neeraj Saxena",
    specialty: "Oncologist",
    rating: 4.9,
    reviews: 130,
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    availability: false,
  },
  {
    name: "Dr. Swati Deshmukh",
    specialty: "Gastroenterologist",
    rating: 4.6,
    reviews: 84,
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    availability: true,
  },
  {
    name: "Dr. Aman Kapoor",
    specialty: "Pulmonologist",
    rating: 4.7,
    reviews: 92,
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    availability: false,
  },
  {
    name: "Dr. Tanya Gupta",
    specialty: "Nephrologist",
    rating: 4.5,
    reviews: 75,
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    availability: true,
  },
  {
    name: "Dr. Deepak Chawla",
    specialty: "Endocrinologist",
    rating: 4.8,
    reviews: 100,
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    availability: true,
  },
  {
    name: "Dr. Richa Bhatt",
    specialty: "Rheumatologist",
    rating: 4.4,
    reviews: 70,
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    availability: false,
  },
  {
    name: "Dr. Abhay Singh",
    specialty: "Physiotherapist",
    rating: 4.6,
    reviews: 80,
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    availability: true,
  },
  {
    name: "Dr. Snehal Pawar",
    specialty: "Homeopathic Doctor",
    rating: 4.5,
    reviews: 76,
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    availability: false,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
];
// dummy category data
const doctorCategories = [
  "Cardiologist",
  "Dermatologist",
  "Dentist",
  "Neurologist",
  "Pediatrician",
  "Psychiatrist",
  "Gynecologist",
  "Orthopedic",
  "ENT Specialist",
  "General Physician",
  "Ophthalmologist",
  "Urologist",
  "Oncologist",
  "Gastroenterologist",
  "Pulmonologist",
  "Nephrologist",
  "Endocrinologist",
  "Rheumatologist",
  "Physiotherapist",
  "Homeopathic Doctor",
];
const Doctors = () => {
  return (
    <div className="bg-white m-auto md:w-[78vw]">
      {/* <div>Doctors</div> */}

      <p className="pt-28">Browse through the doctors specialist.</p>

      {/* filter + doctors info */}
      <section className="flex gap-x-5 mt-5 mb-10">
        
        {/* filer */}
        <div>
          {doctorCategories.map((category, index) => (
            <button
              key={index}
              className="block h-[40px] w-[230px] border pl-5 mb-3 rounded-md hover:bg-[#F2F5FF] text-start"
            >
              {category}
            </button>
          ))}
        </div>

        {/* doctors */}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 cursor-pointer">
          {/* dummy card */}
          {/* <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 text-white">
                <a href="#">
                <img class="rounded-t-lg" src="/logo.png" alt="" />
                </a>
                <div class="p-5">
                <p>{true ? "available" : "not available"}</p>

                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Name
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    category of work
                </p>
                </div>
            </div> */}

          {doctors ? (
            doctors.map((doctor, index) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-primary rounded-lg shadow-sm text-black hover:translate-y-[-7px] transition-all duration-500"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-[260px] object-cover"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </a>
                <div className="p-5">
                  <p
                    className={
                      doctor.availability ? "text-green-400" : "text-red-400"
                    }
                  >
                    {doctor.availability ? "Available" : "Not Available"}
                  </p>

                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {doctor.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            ))
          ) 
          : (
            <p>No Doctors</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Doctors;



// hover and all done. just onclick functionality , data from api , and filter needs to be added + filter onclick color should reamin until 2nd click