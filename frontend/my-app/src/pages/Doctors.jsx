import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    specialty: "Neurologist",
    rating: 4.9,
    reviews: 110,
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    availability: false,
  },
  {
    name: "Dr. Kavita Joshi",
    specialty: "Cardiologist",
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
    specialty: "Cardiologist",
    rating: 4.7,
    reviews: 87,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    availability: false,
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
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 102,
    image: "https://randomuser.me/api/portraits/men/56.jpg",
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
  "All",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Gynecologist",
  "General Physician",
  "Dentist",
  "Oncologist",
];

const Doctors = () => {
  // using this speciality variable we will filter doctors - react router work
  // const {speciality} = useParams();  
  const [speciality, setSpeciality] = useState(null); // this is for temporary ,we will be using query params here 
  const [filterDoctors, setFilterDoctors] = useState(doctors);
  const [seeMore, toggleseeMore] = useState(false)

  const applyFilter = (category) => {
    if(category === "All"){
      setFilterDoctors(doctors);
      return;
    }
    setFilterDoctors(doctors.filter((doctor) => doctor.specialty==category));
  }

  return (
    <section className="bg-white m-auto md:w-[78vw] flex gap-x-5 pt-24 pb-10">
      {/* Filter */}
      <section className="sticky top-15 max-h-max p-5 transition-all bg-[#1E1E2F] rounded-xl">
        <span className="text-white">Browse through the doctors specialist.</span>

        <div className={`text-[#1E1E2F] ${seeMore ? "max-h-[80vh] overflow-y-scroll" : "max-h-[30vh] overflow-hidden"}`}>
          {doctorCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => applyFilter(category)}
              className={`block h-[40px] w-[95vw] sm:w-[230px] border pl-5 mb-3 rounded-md hover:bg-[#F2F5FF] text-start ${speciality === category ? 'bg-[#F2F5FF]' : 'bg-white'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <button onClick={() => toggleseeMore(prev => !prev)} className="cursor-pointer text-white pt-2">{seeMore ? "See Less" : "See More"}</button>
      </section>

      <div className="flex flex-wrap gap-5 justify-center px-5 ">
        {filterDoctors ? (
          filterDoctors.map((doctor, index) => (
            <Link>
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-primary rounded-lg shadow-sm text-black hover:-translate-y-[7px] transition-all duration-300"
              >
                <img
                  className="rounded-t-lg w-full h-[260px] object-cover border-b-1"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="p-5 pl-4 pb-1">
                  <p
                    className={`
                    ${doctor.availability ? "text-green-400" : "text-red-400"}
                    text-sm
                    `}
                  >
                    {doctor.availability ? "Available" : "Not Available"}
                  </p>

                  <a href="#">
                    <h5 className="mt-1 text-xl font-medium tracking-tight text-gray-900 ">
                      {doctor.name}
                    </h5>
                  </a>
                  <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )
          : (
            <p className="text-white">No Doctors</p>
          )}
      </div>
      {/* </section> */}
    </section>
  );
};

export default Doctors;



// hover and all done. just onclick functionality , data from api , and filter needs to be added + filter onclick color should reamin until 2nd click