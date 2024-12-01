import React from "react";
import ContactForm from "../components/ContactForm";

const page: React.FC = () => {
  return (
    <div className="min-h-screen rounded paddingX flex flex-col mx-auto md:47flex justify-around mt-20 bg-gray-100 p-6">
      <div className="">
        <p className="w-full text-main text-pretty font-bold">
          The interests of our customers are always the top priority for us, so
          we hope you will enjoy our services as much as we enjoy making them
          available to you.
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export default page;
// {/* <div className="max-w-7xl mx-auto bg-white rounded-lg  p-8">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Support
//         </h1>

//         <p className="text-lg text-gray-600 mb-8 text-center">
//           Need help? Reach out to us via phone or email, and we’ll get back to
//           you as soon as possible!
//         </p>

//         {/* FAQ Section */}
//         {/* <div className="mb-12">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Frequently Asked Questions
//           </h2>
//           <ul className="space-y-4">
//             <li className="border-b pb-4">
//               <h3 className="text-xl font-medium text-gray-700">
//                 How do I reset my password?
//               </h3>
//               <p className="text-gray-600">
//                 You can reset your password by going to the account settings
//                 page and clicking{" "}
//                 <a href="tel:+201113283189">Forgot password.</a>
//               </p>
//             </li>
//             <li className="border-b pb-4">
//               <h3 className="text-xl font-medium text-gray-700">
//                 Where can I view my orders?
//               </h3>
//               <p className="text-gray-600">
//                 You can view all your orders on the order history page under
//                 your account dashboard.
//               </p>
//             </li>
//             <li className="border-b pb-4">
//               <h3 className="text-xl font-medium text-gray-700">
//                 How can I contact support?
//               </h3>
//               <p className="text-gray-600">
//                 You can reach us through the options below.
//               </p>
//             </li>
//           </ul>
//         </div> */}

//         {/* Contact Options */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">
//             Contact Us
//           </h2>
//           <div className="space-y-6">
//             {/* Call Option */}
//             <div className="flex items-center space-x-4  p-4 rounded-lg ">
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-indigo-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 5.707l5.793 5.793a1 1 0 01.293.707v3.293a2 2 0 002 2h5a2 2 0 002-2V12a1 1 0 01.293-.707l5.793-5.793A1 1 0 0022 3.293l-5.793 5.793a1 1 0 01-.707.293h-3.293a2 2 0 01-2-2V4.414A1 1 0 0010.707 3L3.293 3.293A1 1 0 003 5.707z"
//                 />
//               </svg> */}
//               <div>
//                 <p className="text-lg font-semibold text-gray-700">Call Us</p>
//                 <p className="text-gray-600">
//                   For immediate assistance, give us a call at:
//                 </p>
//                 <a
//                   href="tel:+201113283189"
//                   className="text-indigo-600 hover:underline"
//                 >
//                   +201113283189
//                 </a>
//               </div>
//             </div>

//             {/* Email Option */}
//             <div className="flex items-center space-x-4  p-4 rounded-lg ">
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-indigo-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 12H8m-4 4h16V8H4v8zM2 6h20v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
//                 />
//               </svg> */}
//               <div>
//                 <p className="text-lg font-semibold text-gray-700">Email Us</p>
//                 <p className="text-gray-600">
//                   Feel free to send us an email, and we’ll get back to you
//                   shortly:
//                 </p>
//                 <a
//                   href="mailto:support@example.com"
//                   className="text-indigo-600 hover:underline"
//                 >
//                   support@example.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
