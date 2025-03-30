"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<string>("");
  // const [url, setUrl] = useState("");
  const pathname = usePathname();
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("Loading"); // Set loading state immediately
    setMessage(""); // Clear previous messages
    setEmail(""); // Clear
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Subscription successful! Check your email.");
        setIsLoading("Done");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Subscription failed.");
        setIsLoading("Error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsLoading("Error");
    }
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setUrl(window?.location?.pathname);
  //   }
  //   console.log("f");
  // }, []);
  // console.log(pathname);

  return (
    <footer id="contactus" className="bg-main text-white py-10">
      <div
        className={`paddingX mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ${
          pathname === "/checkout" ? "hidden" : ""
        }`}
      >
        {/* Contact Information */}
        <div>
          <div className="border-l border-two pl-5">

            <h3 className="text-lg font-bold mb-4 text-two">CALL US NOW</h3>
            <Link href={"tel:+201113283189"}>
              <p className="font-bold">
                <span className="font-bold">+201113283189</span>
              </p>
            </Link>
          </div>
          <div className="border-l border-two pl-5">
            <h3 className="text-lg font-bold mt-6 mb-4 text-two">
              SEND A MESSAGE
            </h3>
            <Link href={"mailto:support@clockyeg.com"}>
              <p className="font-bold">
                Email: <span className="font-bold">support@clockyeg.com</span>
              </p>
            </Link>
          </div>
        </div>

        {/* Other Pages */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-two border-b border-two">
            OTHER PAGES
          </h3>
          <ul className=" space-y-2 flex md:flex-col md:items-start md:gap-5 items-center justify-between">
            <li>
              <a href="/" className="hover:underline font-bold">
                Home
              </a>
            </li>
            {/* <li>
              <a href="/news" className="hover:underline font-bold">
                News
              </a>
            </li> */}
            <li>
              <a href="/aboutus" className="hover:underline font-bold">
                About Us
              </a>
            </li>
            <li>
              <a href="#brands" className="hover:underline font-bold">
                Categories
              </a>
            </li>
            <li>
              <a href="/support" className="hover:underline font-bold">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        {/* <div>
          <h3 className="text-lg font-bold mb-4 text-two">QUICK LINKS</h3>
          <ul className=" space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Chairs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tables
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Work station
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Executive desks
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Employee desks
              </a>
            </li>
          </ul>
        </div> */}

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-two">NEWSLETTER</h3>
          <form
            onSubmit={handleSubscribe}
            className="flex items-center space-x-2 mb-4"
          >
            <input
              type="email"
              placeholder="name@example.com"
              className="p-2 w-full rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {isLoading !== "Loading" ? (
              <Button
                type="submit"
                className="bg-two text-main hover:bg-white hover:text-main font-bold p-2 rounded-md disabled:bg-black disabled:text-white"
                // disabled={isLoading === "Loading" || isLoading === "Done"}
              >
                {/* {isLoading === "Loading" ? "Loading" : ""} */}SUBSCRIBE
              </Button>
            ) : (
              <Button disabled={isLoading === "Loading"} className="text-two">
                <LoaderCircle
                  className="-ms-1 me-2 animate-spin text-two"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Loading
              </Button>
            )}
          </form>
          {message && <p>{message}</p>}
          <p className="mb-4">
            Get the scoop & stay in the loop! Sign up for email alerts to get
            exclusive offers and deals.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <Link href={"https://www.facebook.com/Clocky.Eg?mibextid=kFxxJD"}>
              {/* facebook */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="-5 0 20 20"
              >
                <g>
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="none"
                    strokeWidth="1"
                  >
                    <g fill="#ffff" transform="translate(-385 -7399)">
                      <g transform="translate(56 160)">
                        <path d="M335.821 7259v-9h2.733l.446-4h-3.179v-1.948c0-1.03.027-2.052 1.466-2.052h1.458v-2.86c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7v2.3H329v4h2.923v9h3.898z"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </Link>

            <Link
              href={
                "https://www.instagram.com/clocky.eg?igsh=b2R0MGhpNDFscjdq&utm_source=qr"
              }
            >
              {/* instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
              >
                <g fill="#ffff">
                  <path
                    fillRule="evenodd"
                    d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M18 5a1 1 0 100 2 1 1 0 000-2z"></path>
                  <path
                    fillRule="evenodd"
                    d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 002.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 002.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 00-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 00-2.622 2.622zM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 00-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 001.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 001.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 00-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3z"
                    clipRule="evenodd"
                  ></path>
                </g>
              </svg>
            </Link>
            <a
              href="https://wa.me/201113283189?text=I'm%20interested%20in%20your%20services"
              target="_blank"
            >
              {/*  WhatsApp */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffff"
                  d="M6.014 8.006c.114-.904 1.289-2.132 2.22-1.996V6.01c.907.172 1.625 1.734 2.03 2.436.286.509.1 1.025-.167 1.243-.361.29-.926.692-.808 1.095C9.5 11.5 12 14 13.23 14.711c.466.269.804-.44 1.092-.804.21-.28.726-.447 1.234-.171.759.442 1.474.956 2.135 1.534.33.276.408.684.179 1.115-.403.76-1.569 1.76-2.415 1.557C13.976 17.587 8 15.27 6.08 8.558c-.108-.318-.08-.438-.066-.552z"
                ></path>
                <path
                  fill="#ffff"
                  fillRule="evenodd"
                  d="M12 23c-1.224 0-1.9-.131-3-.5l-2.106 1.053A2 2 0 014 21.763V19.5c-2.153-2.008-3-4.323-3-7.5C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm-6-4.37l-.636-.593C3.691 16.477 3 14.733 3 12a9 9 0 119 9c-.986 0-1.448-.089-2.364-.396l-.788-.264L6 21.764V18.63z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-8 pt-4 text-center ">
        <p className="space-x-2">
          <a href="/policy" className="hover:underline">
            Privacy Policy
          </a>
          <span>||</span>
          <a href="/returnpolicy" className="hover:underline">
            Return Policy
          </a>
        </p>
        <p className="mt-4">
          &copy; 2025
          <Link href={"https://blackwaveseg.com"} className="text-two">
            BW
          </Link>
          , Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
