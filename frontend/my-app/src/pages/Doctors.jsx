import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

<FaArrowRight />


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
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
  },
  {
    name: "Dr. Rohit Shetty",
    specialty: "Dentist",
    rating: 4.9,
    reviews: 120,
    image: "https://randomuser.me/api/portraits/men/66.jpg",
    availability: true,
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

const DoctorsperPage = 9;

const Doctors = () => {
  const [specialty, setSpecialty] = useState("All");
  const [filterDoctors, setFilterDoctors] = useState(doctors);
  const [seeMore, toggleseeMore] = useState(false);
  const [currentPage , setcurrentPage] = useState(1);
  const [start , setStart] = useState((currentPage-1)*DoctorsperPage);
  const [end , setEnd] = useState(DoctorsperPage);

  const NoofDoctors = filterDoctors.length;
  const NoofPages = Math.ceil(NoofDoctors / DoctorsperPage);



  const applyFilter = (category) => {
    setSpecialty(category)
    if (category === "All") {
      setFilterDoctors(doctors);
    }else{
      setFilterDoctors(doctors.filter((doctor) => doctor.specialty == category));
    }
    handlePageChange(1);
  }

  const handlePageChange = (page)=>{
    setcurrentPage(page);
    setStart(DoctorsperPage*(page-1));
    setEnd(page*DoctorsperPage);
  }

  return (
    <section className="bg-white flex flex-col items-center pb-5">
      {/* Filter */}
      <div className="m-auto md:w-[78vw] flex gap-x-5 pb-10">
        <section className="sticky top-24 max-h-max p-5 transition-all bg-white rounded-xl shadow-sm border border-gray-200">
  <span className="text-gray-800 font-medium text-sm">
    Browse through the doctor's specialty:
  </span>

  <div className={`mt-4 ${seeMore ? "max-h-[80vh] overflow-y-scroll" : "max-h-[30vh] overflow-hidden"}`}>
    {doctorCategories.map((category, index) => (
      <button
        key={index}
        onClick={() => applyFilter(category)}
        className={`block h-[40px] w-[95vw] sm:w-[230px] border pl-4 pr-2 mb-3 rounded-md text-start text-sm transition-all
          ${
            specialty === category
              ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
      >
        {category}
      </button>
    ))}
  </div>

  <button
    onClick={() => toggleseeMore((prev) => !prev)}
    className="text-sm text-blue-600 mt-2 hover:underline"
  >
    {seeMore ? "See Less" : "See More"}
  </button>
</section>


        <div className="flex flex-wrap gap-5 justify-center px-5 ">
          {filterDoctors ? (
            filterDoctors.slice(start , end).map((doctor, index) => (
              <Link to={`/appointment?doctorId=${index}`}>
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

                    <h5 className="mt-1 text-xl font-medium tracking-tight text-gray-900 ">
                      {doctor.name}
                    </h5>
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
      </div>

      {/* Pagination Component */}
      <div className="flex items-center gap-2">
        <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage === 1} className="flex items-center gap-2 border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"><FaArrowLeft /><span>Previous</span></button>
        {
          Array(NoofPages).keys().map((ind) => <button onClick={()=>handlePageChange(ind+1)} key={ind} className={`border-1 rounded-md p-2 cursor-pointer ${currentPage===ind+1 ? "bg-[#5C67F2] text-white" : ""}`}>{ind+1}</button>)
        }
        <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage === NoofPages} className="flex items-center border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"><span>Next</span><FaArrowRight /></button>
      </div>
    </section>
  );
};

export default Doctors;



// hover and all done. just onclick functionality , data from api , and filter needs to be added + filter onclick color should reamin until 2nd click