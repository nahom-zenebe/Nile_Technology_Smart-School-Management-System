import React,{useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import homepageimage from  "../images/homepageimage.png"
import man1 from  "../images/man1.jpg"
import man2 from  "../images/man2.jpg"
import man3 from  "../images/man3.jpg"
import man4 from  "../images/man4.jpg"
import man5 from  "../images/man5.jpg"
import { FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaLaptopCode, FaClipboardList ,FaPlus, FaMinus} from 'react-icons/fa'; // Importing relevant icons
import { FaMoneyBillWave } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
function Landingpage() {
    const [activeIndex, setActiveIndex] = useState(null); // Track the active question


  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); 
    } else {
      setActiveIndex(index); 
    }
  };

   
      
  return (
    <div>
        <Header/>
        <div className="max-w-6xl mx-auto px-4 py-8">
     
      <section className="py-20 flex mt-12 bg-grey-50 ">
     <div>
     <h1 className="text-4xl md:text-6xl line mr-40 font-bold text-gray-800 mt-6 mb-6">
  The Future of Smart School
  <br />
  <span className="block mt-2 mb-4">Management Is  <span className="text-green-700">Here .</span></span> 

</h1>


        <p className="text-xl text-gray-600 mb-8">
          Revolutionizing education with cutting-edge technology
        </p>
        <button className="bg-green-500 mt-5 mr-8 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
          Learn More
        </button>
        <button className="bg-green-500 mt-5 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
          Get Started
        </button>
        </div>
        <img src={homepageimage} className='w-2/4' alt="image of student"/>
      </section>

      <section className="py-16 mt-10">
      <h1 className="font-bold text-4xl text-center mb-10 text-gray-800"> Features</h1>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaChalkboardTeacher className="text-4xl mb-4 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Teacher Management
            </h3>
            <p className="text-gray-600">
              Easily manage teacher profiles, assignments, and class schedules, improving workflow and communication.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-green-100 p-4 rounded-full">
              <FaUsers className="text-4xl mb-4 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Student Management
            </h3>
            <p className="text-gray-600">
              Organize student data, attendance, grades, and performance reports seamlessly in one system.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-yellow-100 p-4 rounded-full">
              <FaCalendarAlt className="text-4xl mb-4 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Class Scheduling
            </h3>
            <p className="text-gray-600">
              Schedule classes, exams, and events efficiently, ensuring seamless coordination across the school.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-gray-100 p-4 rounded-full">
              <FaLaptopCode className="text-4xl mb-4 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Online Learning Integration
            </h3>
            <p className="text-gray-600">
              Support for online learning modules, enabling students to attend classes remotely and access resources.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-purple-100 p-4 rounded-full">
              <FaClipboardList className="text-4xl mb-4 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Task & Assignment Tracking
            </h3>
            <p className="text-gray-600">
              Track assignments, deadlines, and students' progress to ensure better academic management.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center">
            <div className="bg-gray-100 p-4 rounded-full">
            <FaMoneyBillWave  className="text-4xl mb-4 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
             Fee Managment system
            </h3>
            <p className="text-gray-600">
              Support for  fee managment system. help them to track the fee monthly and yearly with good statics chart and graph that show analytics
            </p>
          </div>

        </div>
      </div>
    </section>
      
    <section id="testimonials" className="py-16 border-2 border-black bg-green-300 rounded-lg mt-10">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Our Testimonials
    </h2>
    <p className="text-center text-gray-600 mb-8">
      Our Testimonials are the first to build a new and innovative system,
      which will help you grow your business.
    </p>

    {/* Swiper Component */}
    <Swiper
      spaceBetween={20} // Space between slides
      slidesPerView={1} // Number of slides visible at once
      breakpoints={{
        640: {
          slidesPerView: 2, // Shows 2 slides on larger screens
        },
        1024: {
          slidesPerView: 3, // Shows 3 slides on very large screens
        },
      }}
      loop={true} // Enable infinite loop
      autoplay={{ delay: 2500, disableOnInteraction: false }} // Autoplay with a delay of 2.5 seconds
    >
      {/* Static Testimonial 1 */}
      <SwiperSlide>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris."
          </p>
          <div className="flex items-center">
          <img src={man1} className='rounded-full w-12 h-12' alt="image of student"/>

            <div className="ml-4">
              <p className="font-semibold">John Doe</p>
              <p className="text-gray-500 text-sm">School Principal</p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Static Testimonial 2 */}
      <SwiperSlide>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "Excellent service, the system is very user-friendly and efficient."
          </p>
          <div className="flex items-center">
          <img src={man2} className='rounded-full w-12 h-12' alt="image of student"/>




            <div className="ml-4">
              <p className="font-semibold">Jane Smith</p>
              <p className="text-gray-500 text-sm">School Administrator</p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Static Testimonial 3 */}
      <SwiperSlide>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "A fantastic tool for managing school data with ease and accuracy."
          </p>
          <div className="flex items-center">
          <img src={man3} className='rounded-full w-12 h-12' alt="image of student"/>
            <div className="ml-4">
              <p className="font-semibold">Michael Johnson</p>
              <p className="text-gray-500 text-sm">Teacher</p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Static Testimonial 4 */}
      <SwiperSlide>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "A seamless experience, making administrative tasks much easier."
          </p>
          <div className="flex items-center">
          <img src={man4} className='rounded-full w-12 h-12' alt="image of student"/>
            <div className="ml-4">
              <p className="font-semibold">Emily White</p>
              <p className="text-gray-500 text-sm">Administrative Assistant</p>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Static Testimonial 5 */}
      <SwiperSlide>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "I highly recommend this system for schools looking to streamline operations."
          </p>
          <div className="flex items-center">
          <img src={man5} className='rounded-full w-12 h-12' alt="image of student"/>
            <div className="ml-4">
              <p className="font-semibold">Daniel Lee</p>
              <p className="text-gray-500 text-sm">School Director</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</section>


<section id="faq" className="py-16 mt-10 ">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        
        {/* Question 1 */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(1)}
          >
            <h3 className="font-semibold text-lg mb-2">What is a Smart School Management System?</h3>
            <div className="text-xl text-gray-600">
              {activeIndex === 1 ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === 1 && (
            <p className="text-gray-600">
              A Smart School Management System is a software application designed to streamline and automate various administrative, academic, and communication tasks in schools, making them more efficient and data-driven.
            </p>
          )}
        </div>

        {/* Question 2 */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(2)}
          >
            <h3 className="font-semibold text-lg mb-2">How does it improve communication in schools?</h3>
            <div className="text-xl text-gray-600">
              {activeIndex === 2 ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === 2 && (
            <p className="text-gray-600">
              The system enables easy communication between students, teachers, parents, and administrators. It includes features like announcements, notifications, messaging, and progress reports, improving collaboration and involvement in the school community.
            </p>
          )}
        </div>

        {/* Question 3 */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(3)}
          >
            <h3 className="font-semibold text-lg mb-2">What features are included in the Smart School Management System?</h3>
            <div className="text-xl text-gray-600">
              {activeIndex === 3 ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === 3 && (
            <p className="text-gray-600">
              The system typically includes features such as attendance tracking, grade management, timetable management, student and teacher profiles, communication tools, and reporting tools for data analysis and decision-making.
            </p>
          )}
        </div>

     
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(4)}
          >
            <h3 className="font-semibold text-lg mb-2">Is it customizable for different types of schools?</h3>
            <div className="text-xl text-gray-600">
              {activeIndex === 4 ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === 4 && (
            <p className="text-gray-600">
              Yes, the Smart School Management System can be customized to suit the specific needs of various types of schools, whether it is primary, secondary, or higher education institutions. The software can be tailored to accommodate unique processes and requirements.
            </p>
          )}
        </div>

        {/* Question 5 */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleAnswer(5)}
          >
            <h3 className="font-semibold text-lg mb-2">How secure is the system for student and staff data?</h3>
            <div className="text-xl text-gray-600">
              {activeIndex === 5 ? <FaMinus /> : <FaPlus />}
            </div>
          </div>
          {activeIndex === 5 && (
            <p className="text-gray-600">
              The system ensures data security through encryption and regular backups, keeping sensitive student and staff information safe. Additionally, user access control is implemented to restrict unauthorized access to data.
            </p>
          )}
        </div>

      </div>
    </section>
    </div>
        <Footer/>
    </div>
  )
}

export default Landingpage