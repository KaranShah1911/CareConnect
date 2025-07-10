import React, { useEffect, useState } from "react";

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
  const [speciality,setSpeciality] = useState(null); // this is for temporary ,we will be using query params here 
  const [filterDoctors, setFilterDoctors] = useState([]);

  const applyFilter = () => {
    if(speciality) {
      setFilterDoctors(doctors.filter(doctor => doctor.specialty===speciality));
    }
    else {
      setFilterDoctors(doctors);
    }
  }

  useEffect(() => {
      console.log(speciality)
      applyFilter();
  }, [speciality])


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
              onClick={() => {
                speciality != category ? setSpeciality(category) : setSpeciality(null)
              }}
              className={`block h-[40px] w-[95vw] sm:w-[230px] border pl-5 mb-3 rounded-md hover:bg-[#F2F5FF] text-start ${speciality === category ? 'bg-[#F2F5FF]' : 'bg-white'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* doctors */}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 cursor-pointer h-fit">
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

          {filterDoctors ? (
            filterDoctors.map((doctor, index) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-primary rounded-lg shadow-sm text-black hover:translate-y-[-7px] transition-all duration-300"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-[260px] object-cover border-b-1"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </a>
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