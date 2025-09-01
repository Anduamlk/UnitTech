"use client";

import { useState, useRef,useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Youtube, Linkedin, Github,  Twitter,  Mail,  Phone, } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { FaLaptopCode, FaGlobe, FaNetworkWired, FaMobileAlt, FaServer, FaDatabase ,FaIndustry} from "react-icons/fa";
import { FaHospital, FaShoppingCart, FaMoneyBill, FaPlane } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

interface Industry {
  name: string;
  icon: JSX.Element;
  description: string;
}

interface NavbarProps {
  vertical?: boolean; 
  onLinkClick?: () => void; 
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 200]);
    const [isOpen, setIsOpen] = useState(false);
  const heroTextY = useTransform(scrollY, [0, 600], [0, 50]);

  const [activeIndustry, setActiveIndustry] = useState<number>(0);

  const [ctaRef, ctaInView] = useInView({ threshold: 0.3 });
  const industries: Industry[] = [
  {
    name: "Healthcare Software Development",
    icon: <FaHospital className="text-2xl" />,
    description: `At Uni Tech IT Solutions, we deliver cutting-edge healthcare software solutions backed by deep industry expertise and thorough research. Our experienced team designs and develops innovative applications aimed at improving patient care and streamlining healthcare operations.

We focus on creating high-quality, scalable, and secure solutions that not only leverage the latest technologies but also provide excellent return on investment. Beyond development, we partner closely with our clients, offering expert guidance on industry trends and delivering future-ready solutions that address healthcare challenges and eliminate redundancies.

Our technical team specializes in building reliable, compliant, and robust web applications that adhere to HIPAA regulations. From concept to deployment, we provide a comprehensive range of healthcare software services designed to meet the unique needs of each client. Over the years, we have successfully delivered applications that exceed client expectations, helping healthcare organizations operate more efficiently and effectively.`
  },
  {
    name: "Retail Software Development",
    icon: <FaShoppingCart className="text-2xl" />,
    description: `At Uni Tech IT Solutions, we deliver modern retail software solutions designed to optimize operations and enhance the customer experience. Our expertise spans e-commerce platforms, inventory management, POS systems, and customer engagement tools, helping businesses stay competitive in a fast-evolving market.

We focus on building scalable, secure, and user-friendly applications that streamline workflows, boost sales, and improve customer satisfaction. Our team partners with clients to understand their unique business needs, delivering customized solutions that drive efficiency and growth.

From conceptualization to deployment, we provide a full suite of retail software services that empower organizations to operate smarter, faster, and more profitably.`
  },
  {
    name: "Banking Application",
    icon: <FaMoneyBill className="text-2xl" />,
    description: `At Uni Tech IT Solutions, we deliver cutting-edge banking software solutions designed to enhance security, efficiency, and customer satisfaction. Our expertise includes secure online banking platforms, mobile banking apps, transaction processing systems, and financial analytics dashboards.

We focus on building robust, scalable, and compliant applications that empower banks and financial institutions to streamline operations, mitigate risks, and deliver superior services to their customers. Our team collaborates closely with clients to develop customized solutions that meet the demands of today’s digital banking environment.

From design to deployment, we provide a full suite of banking software services that ensure reliability, security, and future-ready technology for financial institutions.`
  },
  {
    name: "Travel",
    icon: <FaPlane className="text-2xl" />,
    description: `At Uni Tech IT Solutions, we offer end-to-end travel software solutions designed to simplify and enhance the travel experience. Our expertise includes online travel booking platforms, flight and hotel reservation systems, and customer-focused travel management solutions.

We create scalable, user-friendly, and secure applications that empower travel agencies, tour operators, and travel service providers to streamline operations, manage bookings efficiently, and deliver an exceptional experience to travelers.

Our team works closely with clients to deliver customized, innovative solutions that meet the dynamic demands of the travel industry, ensuring reliability, efficiency, and future-ready technology.`
  },
  {
    name: "IT & Software Services",
    icon: <FaLaptopCode className="text-2xl" />,
    description: `At Uni Tech IT Solutions, we provide custom software development, SaaS platforms, cloud solutions, and IT consulting tailored for diverse industries.

Our team delivers scalable, secure, and efficient technology solutions that help businesses modernize operations, optimize processes, and achieve measurable growth.

We partner with clients to understand their unique challenges, offering innovative, future-ready solutions that ensure competitive advantage and long-term success.`
  },
  {
    name: "Manufacturing",
    icon: <FaIndustry className="text-2xl" />,
    description:  `At Uni Tech IT Solutions, we deliver smart manufacturing solutions, including automation software, ERP systems, and production analytics.

Our expertise helps manufacturers optimize operations, reduce downtime, and improve production efficiency through intelligent, data-driven solutions.

We work closely with clients to implement scalable, future-ready systems that drive innovation, enhance productivity, and ensure sustainable growth in the manufacturing sector.`
  },
];

  const cards = [
    {
      color: "blue",
      bg: "bg-blue-200",
      icon: <FaLaptopCode className="text-blue-700 text-3xl sm:text-4xl" />,
      title: "Software Development & Implementation",
      desc: `We deliver high-quality software solutions tailored specifically to your business needs. Our team ensures seamless implementation, minimizing disruption and maximizing efficiency.`,
    },
    {
      color: "green",
      bg: "bg-green-200",
      icon: <FaGlobe className="text-green-700 text-3xl sm:text-4xl" />,
      title: "Website Design & Development",
      desc: `Our expert team creates modern, responsive, and user-friendly websites tailored to your business goals. We focus on seamless user experience, fast performance, and mobile optimization.`,
    },
    {
      color: "purple",
      bg: "bg-purple-200",
      icon: <FaNetworkWired className="text-purple-700 text-3xl sm:text-4xl" />,
      title: "ERP System Development & Implementation",
      desc: `Implement powerful ERP systems designed to streamline your business processes and unify operations across all departments, boosting productivity and collaboration.`,
    },
    {
      color: "yellow",
      bg: "bg-yellow-200",
      icon: <FaMobileAlt className="text-yellow-700 text-3xl sm:text-4xl" />,
      title: "Mobile App Development",
      desc: `Build intuitive and scalable mobile applications for Android and iOS to expand your business reach and engage users with modern UI/UX and robust performance.`,
    },
    {
      color: "red",
      bg: "bg-red-200",
      icon: <FaServer className="text-red-700 text-3xl sm:text-4xl" />,
      title: "Server Hosting & Configuration",
      desc: `Reliable server hosting and configuration services ensuring optimal uptime, security, and performance for your IT infrastructure.`,
    },
    {
      color: "teal",
      bg: "bg-teal-200",
      icon: <FaDatabase className="text-teal-700 text-3xl sm:text-4xl" />,
      title: "Database Administration",
      desc: `Efficient database administration services to maintain, optimize, and secure your critical business data with integrity, scalability, and security.`,
    },
  ];

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 400) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
function Navbar({ vertical = false, onLinkClick }: NavbarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuItems: Record<string, string[]> = {
    "Software solution": [
      "Software Development",
      "ERP System Software Technology",
      "Database Development",
      "Social Media App and Web Development",
      "Mobile Application Development",
      "Business Process Outsourcing – BPO",
      "Cloud Server Management and Consulting",
      "Shortcode SMS Messaging",
      "Business and IT Consulting Service",
      "UAT – Software Testing",
    ],
    "Our product": [
      "Accounting & Finance",
      "Customer Centric CRM",
      "HR, Payroll & Attendance Management",
      "Project Management",
      "Manufacturing",
      "Purchase Order Management",
      "Sales And Marketing",
      "Warehouse – Inventory Management",
      "Vehicle Fleet Management",
      "Gaming Software",
    ],
    "Website services": [
      "Web Based Solutions",
      "Website System",
      "Website Design",
      "Web Portal Development",
      "Content Management System – CMS",
      "Ecommerce Development",
      "UX User Interface Design",
      "Search Engine Optimization",
      "Local SEO",
      "SEO Audit",
      "SEO Report",
    ],
  };

  return (
    <ul
      className={`${
        vertical ? "flex flex-col space-y-4 text-gray-900" : "flex space-x-8 text-gray-900"
      } font-medium text-lg`}
    >
      {/* Home */}
      <li className="relative group">
        <Link
          href="#home"
          onClick={onLinkClick}
          className="font-semibold capitalize tracking-wide transition-colors duration-300 hover:text-yellow-400"
        >
          Home
        </Link>
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
      </li>

      {/* Dropdown Menus */}
      {Object.keys(menuItems).map((menu) => (
        <li
          key={menu}
          className="relative group"
          onMouseEnter={() => !vertical && setOpenMenu(menu)}
          onMouseLeave={() => !vertical && setOpenMenu(null)}
        >
          <button
            onClick={() => vertical && setOpenMenu(openMenu === menu ? null : menu)}
            className="font-semibold capitalize tracking-wide transition-colors duration-300 hover:text-yellow-400"
          >
            {menu}
          </button>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>

          {/* Dropdown */}
          {openMenu === menu && (
            <div
              className={`absolute z-50 mt-2 p-3 border rounded-md shadow-lg ${
                vertical
                  ? "relative w-full mt-1"
                  : "left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
              }`}
              style={{
                backgroundImage: "url('/wave.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="w-full h-full bg-white/60 p-2 rounded-md overflow-auto">
                <ul
                  className={`${
                    vertical
                      ? "flex flex-col space-y-2 text-gray-900"
                      : "grid grid-cols-3 gap-4 text-sm text-gray-900 h-full"
                  }`}
                >
                  {menuItems[menu].map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        onClick={onLinkClick}
                        className="block px-2 py-1 rounded-md capitalize hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      ))}

      {/* Static Links */}
      {["About", "Website hosting"].map((link) => (
        <li key={link} className="relative group">
          <Link
            href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
            onClick={onLinkClick}
            className="font-semibold capitalize tracking-wide transition-colors duration-300 hover:text-yellow-400"
          >
            {link}
          </Link>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
        </li>
      ))}
    </ul>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 font-[Poppins]">
{/* Top Small Header */}
<div className="w-full bg-gradient-to-r from-[#9EDBC5] to-[#c9f0df] text-sm py-2 px-4 shadow-md">
  <div className="container mx-auto flex justify-between items-center">
    
    {/* Left: Phone + Email */}
    <div className="flex space-x-6">
      <div className="flex items-center space-x-2 text-gray-800 font-semibold">
        <Phone className="w-5 h-5" />
        <span>+251-973149018</span>
      </div>
      <div className="flex items-center space-x-2 text-gray-800 font-semibold">
        <Mail className="w-5 h-5" />
        <span>info@unitechit.com</span>
      </div>
    </div>

    {/* Right: Social Media */}
    <div className="flex space-x-4 ml-auto">
      <Link
        href="#"
        className="text-gray-800 hover:text-purple-600 transition-colors duration-200"
        aria-label="YouTube"
      >
        <Youtube className="w-6 h-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-800 hover:text-purple-600 transition-colors duration-200"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-6 h-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-800 hover:text-purple-600 transition-colors duration-200"
        aria-label="Twitter"
      >
        <Twitter className="w-6 h-6" />
      </Link>
      <Link
        href="#"
        className="text-gray-800 hover:text-purple-600 transition-colors duration-200"
        aria-label="GitHub"
      >
        <Github className="w-6 h-6" />
      </Link>
    </div>

  </div>
</div>
                                                                   
<motion.header
  className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-md"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 min-h-[70px] md:min-h-[90px]">
    {/* Logo + Title */}
    <div className="flex items-center space-x-3 md:space-x-4">
      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] flex items-center justify-center">
        <Image src="/unitech.png" alt="Unitech Logo" width={70} height={70} className="object-contain" />
      </div>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-yellow-300 bg-clip-text text-transparent">
        UNITECH IT SOLUTIONS
      </h1>
    </div>

    {/* Desktop Navbar */}
    <div className="max-[1400px]:hidden">
      <Navbar />
    </div>

    {/* Hamburger Button */}
    <div className="hidden max-[1400px]:flex">
      <button
        className="text-white focus:outline-none z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  </div>

  {/* Dropdown for Hamburger click */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg z-40 origin-top max-[1400px]:block"
      >
        <div className="px-6 py-4">
          <Navbar vertical onLinkClick={() => setIsOpen(false)} />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>



    {/* ===== HERO SECTION ===== */}
    <section className="relative w-full overflow-hidden py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-100">
      <motion.div
        className="relative w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
            Uni Tech IT Company
            <br />
            <span className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-semibold">
              (ዩኒቴክ አይቲ ሶሉሽንስ)
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-xl mx-auto md:mx-0">
            Looking for top software tech companies in Ethiopia?  
            We specialize in ERP Solutions, Website Design, and Software Development.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0">
            With years of experience delivering innovative digital solutions, Uni Tech IT Company has become a trusted partner for businesses seeking efficient and scalable systems. Whether you need ERP, a user-friendly website, or custom software, we provide solutions that help businesses thrive in Ethiopia’s tech landscape.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 justify-center md:justify-start">
            <Link
              href="#get-started"
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              href="#learn-more"
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-3xl border-2 border-yellow-400 text-yellow-300 font-semibold hover:bg-yellow-500 hover:text-white transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src="/bbr.png"
            alt="Unitech Services"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg object-contain drop-shadow-2xl"
          />
        </div>
      </motion.div>
    </section>


 <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-gray-100 to-white text-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Heading */}
   <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-blue-700 drop-shadow-sm leading-snug">
  Empowering Your Business with the Right Technology
</h2>
<p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
  Better UI and Best Mode for Your Business Growth
</p>


        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 bg-white/70 backdrop-blur-md shadow-[0_5px_25px_rgba(0,0,0,0.1)] rounded-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 relative overflow-hidden flex flex-col items-center text-center border border-gray-200"
            >
              {/* Icon with Circle */}
              <div className="mb-6 flex justify-center relative">
                <div className={`${card.bg} rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative z-10`}>
                  {card.icon}
                </div>
                <div className={`${card.bg} absolute w-28 h-28 sm:w-36 sm:h-36 opacity-20 rounded-full top-[-15px] left-[-15px] z-0`}></div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-black">{card.title}</h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-800 mb-6 line-clamp-4 sm:line-clamp-none">
                {card.desc}
              </p>

              {/* CTA Button */}
              <button className="mt-auto px-4 sm:px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white transition-all text-sm sm:text-base">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-full h-[70px] sm:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f8fafc"
            d="M0,192L60,197.3C120,203,240,213,360,218.7C480,224,600,224,720,213.3C840,203,960,181,1080,176C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>

{/* Why Work With Us Section */}
<section
  className="relative w-full py-20 px-6 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/g.jpg')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

  <motion.div
    className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-[1400px] mx-auto"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {/* Left Image */}
    <div className="flex justify-center md:justify-start">
      <img
        src="/u.jpg"
        alt="Why Choose Unitech"
        className="w-full max-w-md md:max-w-lg object-contain rounded-xl shadow-md"
      />
    </div>

    {/* Right Content */}
    <div className="flex flex-col gap-6 text-center md:text-left bg-white/70 p-8 rounded-2xl shadow-md">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
        Why Work With <span className="text-blue-600">UniTech?</span>
      </h2>

      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
        We offer{" "}
          website design, web development, software development, ERP,
          online marketing, web hosting
       
        and web application development at fair market pricing — with a
        quicker turnaround than most other companies.
      </p>

      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
        Thanks to our in-house expertise and the ability to leverage
        modern technologies, we efficiently meet a wide array of demands.
        We’re not just good at what we do — we’re passionate about
        delivering excellence. Our efficiency allows us to provide
        high-quality services while keeping our work competitively priced.
      </p>
    </div>
  </motion.div>
</section>
<section
  className="w-full py-16 border-t border-gray-200 relative"
  style={{
    backgroundImage: "url('/bb.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Light Blue Overlay */}
  <div className="absolute inset-0 bg-blue-400/40 backdrop-blur-sm"></div>

  {/* Content */}
  <div className="relative max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12">
    {/* Text */}
    <div className="text-center md:text-left max-w-xl">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4">
        Focus on Your Business – <span className="text-blue-700"></span>
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        At Uni Tech IT Solutions, we empower professionals to enhance their skills and advance their careers. Don’t miss this opportunity to grow with us.
      </p>
    </div>

    {/* Button */}
    <div>
      <a
        href="#register"
        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-300 hover:text-gray-900 transition-all duration-300"
      >
        Contact Us Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>

  </div>
</section>



{/* Industries We Serve Section */}
<section className="w-full py-24 bg-gray-50">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0">
    {/* Section Header */}
 <div className="text-center mb-12 px-4 sm:px-6 lg:px-0">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4">
     Uni Tech IT Serving All Major Industries Across Ethiopia
  </h2>

  <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
    Uni Tech IT provides secure, scalable website and software solutions for a wide range of industries, from retail and healthcare to banking and travel. We specialize in delivering technology that meets the unique needs of each sector. The following industries benefit from our website and software services.
  </p>
</div>


    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
      {/* Left Categories */}
      <div className="flex flex-col gap-4">
        {industries.map((industry, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndustry(idx)}
            className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 text-left shadow-sm ${
              activeIndustry === idx
                ? "bg-blue-300 text-black shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-black hover:shadow-md"
            }`}
          >
            <span className="text-2xl">{industry.icon}</span>
            <span className="font-semibold text-lg">{industry.name}</span>
          </button>
        ))}
      </div>

      {/* Right Description */}
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg flex flex-col justify-start">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{industries[activeIndustry].name}</h3>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          {industries[activeIndustry].description}
        </p>
      </div>
    </div>
  </div>
</section>



{/* Premium Clients Section */}
<section className="w-full py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200">
  <div className="max-w-[1400px] mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
      Some Of Our <span className="text-smiblod">Powering Client Successes with Best-in-Class Partners </span>
    </h2>

    {/* Marquee Effect */}
    <div className="overflow-hidden relative">
      <div className="flex gap-20 animate-marquee">
        {/* Example Logos */}
        <img
          src="/niss.jpg"
          alt="NISS"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/insa.jpg"
          alt="INSA"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/mii.jpg"
          alt="MiT"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/med.jpg"
          alt="Ministry of Education"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/ai.jpg"
          alt="AI"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />

        {/* Duplicate for smooth infinite scroll */}
        <img
          src="/niss.jpg"
          alt="NISS"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/insa.jpg"
          alt="INSA"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/mii.jpg"
          alt="MiT"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/med.jpg"
          alt="Ministry of Education"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/ai.jpg"
          alt="AI"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  </div>
</section>
{/* Premium Clients Section */}
<section className="w-full py-20 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200">
  <div className="max-w-[1400px] mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
     
    </h2>

    {/* Marquee Effect */}
    <div className="overflow-hidden relative">
      <div className="flex gap-20 animate-marquee">
        {/* AWS Logo */}
        <img
          src="/aws.png"
          alt="AWS"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        {/* Databricks Logo */}
        <img
          src="/db.jpg"
          alt="Databricks"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        {/* Google Cloud Logo */}
        <img
          src="/gc.jpg"
          alt="Google Cloud"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
         <img
          src="/az.jpg"
          alt="Azure"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
         {/* Microsoft Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Microsoft"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/ka.jpg"
          alt="Kaspersky"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        {/* Duplicate for smooth infinite scroll */}
           <img
          src="/aws.png"
          alt="AWS"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/db.jpg"
          alt="Databricks"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
         {/* Google Cloud Logo */}
        <img
          src="/gc.jpg"
          alt="Google Cloud"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/az.jpg"
          alt="Azure"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
         {/* Microsoft Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
          alt="Microsoft"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
        <img
          src="/ka.jpg"
          alt="Kaspersky"
          className="h-24 object-contain hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
  </div>
</section>


{/* Tailwind Custom Animation */}
<style jsx>{`
  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 25s linear infinite;
  }

  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`}</style>



<section className="relative py-20 px-6 bg-blue-50" id="contact">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
    
    {/* Contact Form */}
    <div className="bg-white rounded-3xl shadow-2xl p-10">
      <h3 className="text-4xl font-bold text-blue-700 mb-8">Get in Touch</h3>
      <form className="grid gap-6">
        <input
          type="text"
          placeholder="Your Name"
          className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition shadow hover:shadow-md"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition shadow hover:shadow-md"
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition shadow hover:shadow-md resize-none"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-800 transition transform hover:scale-105 shadow-lg hover:shadow-2xl"
        >
          Send Message
        </button>
      </form>
    </div>

    {/* Google Map */}
    <div className="overflow-hidden rounded-3xl shadow-2xl h-96 md:h-full">
      <iframe
        title="Uni Tech IT Company Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.123456789!2d38.2345678!3d5.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sUni%20Tech%20IT%20Company!5e0!3m2!1sen!2set!4v1693400000000!5m2!1sen!2set"
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

  </div>
</section>


 <footer className="relative [background-color:rgba(152,230,169,0.9)] text-black pt-32 pb-12 px-6 md:px-20 overflow-hidden">

      {/* Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        
        {/* Company Info */}
        <div>
          <h2 className="font-bold text-3xl mb-4">UNITECH IT SOLUTIONS</h2>
          <p className="text-gray-800 mb-4">
            Delivering world-class IT services and solutions for sustainable digital transformation.
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition-colors">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="font-bold mb-3 text-lg">Company</h5>
          <ul className="space-y-2 text-gray-800">
            <li><a href="#about" className="hover:text-green-700 transition-colors">About</a></li>
            <li><a href="#services" className="hover:text-green-700 transition-colors">Services</a></li>
            <li><a href="#portfolio" className="hover:text-green-700 transition-colors">Portfolio</a></li>
            <li><a href="#team" className="hover:text-green-700 transition-colors">Team</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold mb-3 text-lg">Quick Links</h5>
          <ul className="space-y-2 text-gray-800">
            <li><a href="#blog" className="hover:text-green-700 transition-colors">Blog</a></li>
            <li><a href="#careers" className="hover:text-green-700 transition-colors">Careers</a></li>
            <li><a href="#faq" className="hover:text-green-700 transition-colors">FAQ</a></li>
            <li><a href="#support" className="hover:text-green-700 transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="font-bold mb-3 text-lg">Contact</h5>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2"><MdPhone className="text-green-700" /> +251-973149018</li>
            <li className="flex items-center gap-2"><MdEmail className="text-green-700" /> info@unitechit.com</li>
            <li className="flex items-center gap-2"><MdLocationOn className="text-green-700" /> Addis Ababa, Ethiopia</li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-black/30 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-700 text-sm">
        <p>© 2025 UNITECH IT SOLUTIONS PLC. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#privacy" className="hover:text-green-700 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-green-700 transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>

    </div>
  );
}
