import React, { useState } from "react";
import Footer from "../../../frontend/src/components/Footer";
import homepageimage from "../assets/homepageimage.png";
import man1 from "../assets/man1.webp";
import man2 from "../assets/man1.webp";
import man3 from "../assets/man1.webp";
import man4 from "../assets/man1.webp";
import man5 from "../assets/man1.webp";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaLaptopCode,
  FaClipboardList,
  FaPlus,
  FaMinus,
  FaMoneyBillWave,
  FaStar,
  FaQuoteLeft,
  FaQuestion,
  FaAngleDown,
  FaAngleUp,
  FaLightbulb,
  FaShieldAlt,
  FaCogs,
  FaComments,
  FaUniversity
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";

function Landingpage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigator = useNavigate();

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax transformations
  const featuresY = useTransform(smoothScrollYProgress, [0.1, 0.3], [100, 0]);
  const featuresOpacity = useTransform(smoothScrollYProgress, [0.1, 0.3], [0, 1]);
  const testimonialScale = useTransform(smoothScrollYProgress, [0.3, 0.5], [0.8, 1]); 
  const faqRotate = useTransform(smoothScrollYProgress, [0.5, 0.7], [5, 0]);

  // FAQ animation variants
  const faqContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#1f2937",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      marginTop: "0.5rem",
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: { 
        duration: 0.2,
        ease: "easeInOut" 
      }
    }
  };

  // Get FAQ icon based on index
  const getFaqIcon = (index) => {
    const icons = [
      <FaQuestion className="text-green-400" />,
      <FaComments className="text-blue-400" />,
      <FaCogs className="text-purple-400" />,
      <FaUniversity className="text-yellow-400" />,
      <FaShieldAlt className="text-red-400" />
    ];
    return icons[index % icons.length];
  };

  const features = [
    {
      icon: <FaChalkboardTeacher className="text-4xl text-blue-400" />,
      title: "Teacher Management",
      description:
        "Manage teacher profiles, assignments, and schedules efficiently.",
    },
    {
      icon: <FaUsers className="text-4xl text-green-400" />,
      title: "Student Management",
      description:
        "Organize student data, attendance, grades, and reports in one place.",
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-yellow-400" />,
      title: "Class Scheduling",
      description:
        "Easily schedule classes, exams, and events with proper coordination.",
    },
    {
      icon: <FaLaptopCode className="text-4xl text-blue-400" />,
      title: "Online Learning Integration",
      description: "Support for remote learning and access to digital resources.",
    },
    {
      icon: <FaClipboardList className="text-4xl text-purple-400" />,
      title: "Task & Assignment Tracking",
      description:
        "Track assignments, deadlines, and student progress effortlessly.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-blue-400" />,
      title: "Fee Management System",
      description: "Track monthly and yearly fees with analytics and charts.",
    },
  ];

  const faqs = [
    {
      q: "What is a Smart School Management System?",
      a: "It's software that streamlines admin, academics, and communication in schools.",
      icon: <FaQuestion />
    },
    {
      q: "How does it improve communication in schools?",
      a: "Through announcements, notifications, messaging, and progress reports.",
      icon: <FaComments />
    },
    {
      q: "What features are included?",
      a: "Attendance, grades, schedules, profiles, communication tools, and reports.",
      icon: <FaCogs />
    },
    {
      q: "Is it customizable for different schools?",
      a: "Yes, it suits primary, secondary, and higher education institutions.",
      icon: <FaUniversity />
    },
    {
      q: "How secure is the system?",
      a: "Data is encrypted, backed up, and protected with access control.",
      icon: <FaShieldAlt />
    },
  ];

  // Custom variants for feature cards
  const featureCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: i * 0.1,
        duration: 0.8
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Testimonial card variants
  const testimonialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: i * 0.15,
        duration: 0.6
      }
    })
  };

  // Staggered text animation for headings
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large animated gradient orbs */}
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-green-500/10 to-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="url(#smallGrid)"/>
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating animated elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-green-400/20"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full border-2 border-blue-400/20"
          animate={{ 
            y: [0, 30, 0],
            x: [0, -15, 0],
            rotate: [0, -360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "linear"
          }}
        />
        
        {/* Small particle elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <Header />

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          className="min-h-screen flex flex-col-reverse md:flex-row items-center pt-28 pb-16 px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The Future of Smart School Management
              <br />
              <span className="block mt-2">
                System Is <span className="text-green-400">Here.</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Revolutionizing education with cutting-edge technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigator("/teacher")}
                className="bg-green-500 hover:bg-green-600 w-40 text-white font-bold py-3 px-6 rounded-lg"
              >
                Learn More
              </button>
              <button
                onClick={() => navigator("/login")}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 w-40 ml-0 sm:ml-10 text-white font-bold py-3 px-6 rounded-lg"
              >
                Login
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={homepageimage}
              alt="Student"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <motion.div 
            style={{ y: featuresY, opacity: featuresOpacity }}
            className="max-w-7xl mx-auto px-6"
          >
            {/* Animated heading */}
            <motion.h2 
              className="text-4xl font-bold text-center mb-4 text-white"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {Array.from("Our Features").map((letter, i) => (
                <motion.span 
                  key={i} 
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-12 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={featureCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700/50 text-center transition-all duration-300 hover:border-green-400/30"
                >
                  <motion.div 
                    className="bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-full mb-6 mx-auto flex justify-center items-center w-20 h-20 border border-gray-600"
                    whileHover={{ 
                      rotate: [0, 10, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          {/* Content container */}
          <motion.div 
            className="max-w-6xl mx-auto px-6"
            style={{ scale: testimonialScale }}
          >
            {/* Animated heading */}
            <motion.h2 
              className="text-4xl font-bold text-center mb-4 text-white"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {Array.from("Our Testimonials").map((letter, i) => (
                <motion.span 
                  key={i} 
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <motion.p 
              className="text-center text-gray-300 mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Trusted by school administrators, teachers, and staff around the globe.
            </motion.p>
            
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay, EffectCoverflow]}
              className="mt-10"
            >
              {[man1, man2, man3, man4, man5].map((img, i) => (
                <SwiperSlide key={i} className="max-w-sm">
                  <motion.div 
                    custom={i}
                    variants={testimonialVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative bg-gray-800/60 backdrop-blur-sm p-8 pt-10 rounded-2xl m-4 border border-gray-700/50 overflow-hidden"
                    style={{
                      boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.5), 0 8px 24px -12px rgba(0, 0, 0, 0.4)"
                    }}
                    whileHover={{
                      boxShadow: "0 30px 70px -10px rgba(0, 0, 0, 0.6), 0 20px 40px -15px rgba(0, 0, 0, 0.5)",
                      y: -5,
                      borderColor: "rgba(74, 222, 128, 0.3)",
                      transition: { duration: 0.3, type: "spring", stiffness: 150 }
                    }}
                  >
                    {/* Background pattern */}
                    <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-70"></div>
                      <svg className="absolute top-0 left-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,0 L100,0 C50,50 50,50 0,100 Z" fill="#4ade80" fillOpacity="0.2"></path>
                      </svg>
                    </div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-4 right-6">
                      <FaQuoteLeft className="text-4xl text-green-400/30" />
                    </div>
                    
                    {/* Rating stars */}
                    <div className="relative z-10 flex mb-6">
                      {[...Array(5)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx, duration: 0.3 }}
                        >
                          <FaStar className="text-yellow-400 text-lg mx-0.5" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <p className="relative z-10 text-gray-300 italic mb-6">
                      "This system is intuitive, reliable, and transformed how
                      we manage education. The features are comprehensive and the support is excellent."
                    </p>
                    <div className="flex items-center mt-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-green-400/30 shadow-md"
                      >
                        <img
                          src={img}
                          alt="testimonial"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="ml-4">
                        <p className="font-semibold text-white">Sarah Johnson</p>
                        <p className="text-sm text-gray-400">School Principal, Lincoln Academy</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <motion.div 
            className="max-w-5xl mx-auto px-6"
            style={{ rotate: faqRotate }}
          >
            {/* Animated Heading */}
            <motion.h2 
              className="text-4xl font-bold text-center mb-4 text-white"
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {Array.from("Frequently Asked Questions").map((letter, i) => (
                <motion.span 
                  key={i} 
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h2>
            
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-4 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            
            <motion.p 
              className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Get answers to the most common questions about our school management system
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 gap-6 md:gap-8"
              variants={faqContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {faqs.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={faqItemVariants}
                  whileHover="hover"
                  className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg overflow-hidden border border-gray-700/50 border-l-4 border-l-green-500"
                >
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAnswer(idx)}
                  >
                    {/* Icon container with animated background */}
                    <motion.div 
                      className="bg-gray-700 p-3 rounded-full mr-4 flex-shrink-0"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(74, 222, 128, 0.2)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div 
                        animate={activeIndex === idx ? 
                          { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : 
                          { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 0.5 }}
                        className="text-xl"
                      >
                        {faqs[idx].icon}
                      </motion.div>
                    </motion.div>
                    
                    {/* Question */}
                    <h3 className="text-lg font-semibold text-white flex-grow">
                      {item.q}
                    </h3>
                    
                    {/* Animated toggle icon */}
                    <motion.div
                      animate={activeIndex === idx ? 
                        { rotate: 180, backgroundColor: "rgba(74, 222, 128, 0.2)" } : 
                        { rotate: 0, backgroundColor: "rgba(55, 65, 81, 1)" }
                      }
                      className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 ml-4"
                    >
                      {activeIndex === idx ? 
                        <FaAngleUp className="text-green-400" /> : 
                        <FaAngleDown className="text-gray-400" />
                      }
                    </motion.div>
                  </div>
                  
                  {/* Animated answer */}
                  <AnimatePresence>
                    {activeIndex === idx && (
                      <motion.div
                        key={`answer-${idx}`}
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="pl-16"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <div className="mt-2 text-gray-300 bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-lg border-l-2 border-green-500/50 flex items-start">
                            <FaLightbulb className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                            <p>{item.a}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Landingpage;
