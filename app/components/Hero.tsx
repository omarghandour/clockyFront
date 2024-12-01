"use client";
import { ResponsiveSliderComponent } from "@/components/responsive-slider";

import Link from "next/link";
import { useState, useEffect } from "react";
// import { CarouselApi } from "@/components/carousel-api";
const Hero = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This will only run in the browser
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div
      className={`text-white backgroundd bg-blend-color-dodge md:bg-right bg-main bg-contain bg-no-repeat bg-center w-full flex flex-col items-center md:justify-center justify-evenly md:gap-12 mt-5 h-[488px] md:h-[600px]`}
    >
      <ResponsiveSliderComponent />
      {/* <div>
        <CarouselApi />
      </div> */}
    </div>
  );
};

export default Hero;

// <div className=" w-[90%] md:w-1/2 mt-5" style={{ textWrap: "pretty" }}>
//         <h1
//           style={{ textWrap: "pretty" }}
//           className="text-3xl md:text-5xl md:text-center my-2"
//         >
//           WELCOME TO{" "}
//           <span className="text-two font-bold text-4xl md:text-6xl">
//             {" "}
//             CLOCKY
//           </span>{" "}
//           <br />
//           THE LARGEST ONLINE WATCHES STORE IN EGYPT
//         </h1>

//         <p
//           style={{ textWrap: "pretty" }}
//           className="text-base font-normal md:text-center my-2"
//         >
//           Here you will find everything that suits you from watches from <br />
//           the latest modern and international <br /> brands for men and women
//         </p>

//         {/* <div className="my-20">
//           <Link
//             href={"/login"}
//             className={`px-3 py-6 bg-white text-black w-40 hover:bg-[#8b8b8b] ${
//               token ? "hidden" : ""
//             }`}
//           >
//             Create account
//           </Link>
//         </div> */}
//       </div>
//       <div className="flex gap-5 mt-6">
//         <Link href={"https://www.facebook.com/Clocky.Eg?mibextid=kFxxJD"}>
//           {/* facebook */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             viewBox="-5 0 20 20"
//           >
//             <g>
//               <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
//                 <g fill="#ffff" transform="translate(-385 -7399)">
//                   <g transform="translate(56 160)">
//                     <path d="M335.821 7259v-9h2.733l.446-4h-3.179v-1.948c0-1.03.027-2.052 1.466-2.052h1.458v-2.86c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7v2.3H329v4h2.923v9h3.898z"></path>
//                   </g>
//                 </g>
//               </g>
//             </g>
//           </svg>
//         </Link>
//         <Link
//           href={
//             "https://www.instagram.com/clocky.eg?igsh=b2R0MGhpNDFscjdq&utm_source=qr"
//           }
//         >
//           {/* instagram */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <g fill="#ffff">
//               <path
//                 fillRule="evenodd"
//                 d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
//                 clipRule="evenodd"
//               ></path>
//               <path d="M18 5a1 1 0 100 2 1 1 0 000-2z"></path>
//               <path
//                 fillRule="evenodd"
//                 d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 002.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 002.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 00-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 00-2.622 2.622zM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 00-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 001.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 001.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 00-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3z"
//                 clipRule="evenodd"
//               ></path>
//             </g>
//           </svg>
//         </Link>
//         <a
//           href="https://wa.me/201113283189?text=I'm%20interested%20in%20your%20services"
//           target="_blank"
//         >
//           {/*  WhatsApp */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="30"
//             height="30"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fill="#ffff"
//               d="M6.014 8.006c.114-.904 1.289-2.132 2.22-1.996V6.01c.907.172 1.625 1.734 2.03 2.436.286.509.1 1.025-.167 1.243-.361.29-.926.692-.808 1.095C9.5 11.5 12 14 13.23 14.711c.466.269.804-.44 1.092-.804.21-.28.726-.447 1.234-.171.759.442 1.474.956 2.135 1.534.33.276.408.684.179 1.115-.403.76-1.569 1.76-2.415 1.557C13.976 17.587 8 15.27 6.08 8.558c-.108-.318-.08-.438-.066-.552z"
//             ></path>
//             <path
//               fill="#ffff"
//               fillRule="evenodd"
//               d="M12 23c-1.224 0-1.9-.131-3-.5l-2.106 1.053A2 2 0 014 21.763V19.5c-2.153-2.008-3-4.323-3-7.5C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.691 16.477 3 14.733 3 12a9 9 0 119 9c-.986 0-1.448-.089-2.364-.396l-.788-.264L6 21.764V18.63z"
//               clipRule="evenodd"
//             ></path>
//           </svg>
//         </a>
//       </div>
