import Image from "next/image";
import Watch from "../../public/watch.png";
import Trash from "../../public/trash-blank-alt-svgrepo-com.svg";
const Payment = () => {
  return (
    <div className="md:w-4/5 sm:h-full md:flex md:justify-around md:flex-col flex flex-col items-center mx-auto p-20 gap-4">
      <div className=" border-t-2 border-[#D4AF39] w-20 p-1 font-medium "></div>
      <h2 className="text-[#2E2E2E]">PAYMENT METHOD</h2>
      <div className="w-full">
        <div>
          <input
            type="text"
            name="first-name"
            placeholder="First name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-9"
          />
        </div>
        <div>
          <input
            type="text"
            name="last-name"
            placeholder="Last name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-9"
          />
        </div>
        <div className="flex justify-evenly">
          <input
            placeholder="City"
            type="text"
            name="city"
            className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-9 "
          />

          <select
            className="text-[#434343] w-2/3 py-2 px-9 rounded-md mt-1"
            name="Governorate"
          >
            <option value="">Governorate</option>
            <option value="cairo">Cairo</option>
            <option value="giza">Giza</option>
            <option value="alexandria">Alexandria</option>
            <option value="aswan">Aswan</option>
            <option value="asyut">Asyut</option>
            <option value="beheira">Beheira</option>
            <option value="beni-suef">Beni Suef</option>
            <option value="dakahlia">Dakahlia</option>
            <option value="damietta">Damietta</option>
            <option value="faiyum">Faiyum</option>
            <option value="gharbia">Gharbia</option>
            <option value="ismailia">Ismailia</option>
            <option value="kafr-el-sheikh">Kafr El Sheikh</option>
            <option value="luxor">Luxor</option>
            <option value="matruh">Matruh</option>
            <option value="minya">Minya</option>
            <option value="monufia">Monufia</option>
            <option value="new-valley">New Valley</option>
            <option value="north-sinai">North Sinai</option>
            <option value="port-said">Port Said</option>
            <option value="qalyubia">Qalyubia</option>
            <option value="qena">Qena</option>
            <option value="red-sea">Red Sea</option>
            <option value="sharqia">Sharqia</option>
            <option value="sohag">Sohag</option>
            <option value="south-sinai">South Sinai</option>
            <option value="suez">Suez</option>
          </select>
        </div>
        <div>
          <input
            placeholder="Detailed address"
            type="text"
            name="address"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-9"
          />
        </div>
        <div>
          <input
            placeholder="Phone"
            type="text"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-9"
          />
        </div>
        <div>
          <label className="flex items-center  mt-4">
            <input
              type="checkbox"
              className="h-4 w-4  border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-[#434343]">
              Save this information for next time
            </span>
          </label>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex justify-center  mt-4">
            Shipping method
          </h3>
          <div className="space-y-2">
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="shipping"
                value="giza-cairo"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-[#434343]">
                Giza & Cairo - EGP 100
              </span>
            </label>
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="shipping"
                value="alex-mansura-fayom"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-[#434343]">
                Alex & Mansura & Fayom - EGP 200
              </span>
            </label>
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="shipping"
                value="aswan-menla-luxor"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-[#434343]">
                Aswan & Menia & Luxor - EGP 300
              </span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="shipping"
                value="zagaig-tanta"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-[#434343]">
                Zagazig & Tanta - EGP 150
              </span>
            </label>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex justify-center">
            Payment
          </h3>
          <div className="space-y-2">
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="payment"
                value="credit-card"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Credit card</span>
            </label>
            <label
              className={`flex items-center p-4 border rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="payment"
                value="pay-via-credit"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                Pay via (credit / wallets / credit cards)
              </span>
            </label>
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="payment"
                value="cod"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                Cash on delivery (COD)
              </span>
            </label>
            <label
              className={`flex items-center p-4 border  rounded-md cursor-pointer hoverr`}
            >
              <input
                type="radio"
                name="payment"
                value="insta"
                className="h-4 w-4  border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                Instapay - انستاباى
              </span>
            </label>
            <button className="bg-main text-[#FFFFFF] w-full p-3 rounded-md text-lg  font-normal">
              COMBLETE ORDER
            </button>
          </div>
        </div>
      </div>
      <span className=" border-t-2 border-two  w-20 px-1 font-medium "></span>
      <h2 className="text-xl font-medium text-[#2E2E2E]">MY CART</h2>
      <div className=" flex flex-col gap-6 md:flex-row w-full ">
        {/* First Item */}
        <div className="flex flex-row items-center justify-around mx-auto border md:w-1/2 rounded-md">
          <div className="w-24">
            <Image
              src={Watch}
              alt="Jazzmaster"
              className="w-[230px] h-[230px] object-contain mb-4"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium text-[#2E2E2E]">Jazzmaster</h3>
            <p className="text-two text-lg">EGP 1050</p>
            <div className="flex items-center mt-4 space-x-4">
              <button className="text-gray-700 text-lg">-</button>
              <span className="text-gray-900">1</span>
              <button className="text-gray-700 text-lg ">+</button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#D4AF37"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 6l-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 01-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 01-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0l-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 00-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 00-.803.578c-.243.29-.374.684-.636 1.471L8 6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center border justify-around md:w-1/2 mx-auto rounded-md">
          <div className="w-24">
            <Image
              src={Watch}
              alt="Jazzmaster"
              className="w-[230px] h-[230px] object-contain mb-4"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium text-[#2E2E2E]">Jazzmaster</h3>
            <p className="text-two text-lg">EGP 1050</p>
            <div className="flex items-center mt-4 space-x-4">
              <button className="text-gray-700 text-lg">-</button>
              <span className="text-gray-900">1</span>
              <button className="text-gray-700 text-lg ">+</button>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#D4AF37"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 6l-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 01-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 01-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0l-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 00-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 00-.803.578c-.243.29-.374.684-.636 1.471L8 6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Summary */}
      <div className="flex justify-between items-center gap-10 mb-6">
        <span className="text-[#2E2E2E] text-base font-normal">2 items</span>
        <span className="text-[#2E2E2E] text-xl font-medium">EGP 2900</span>
      </div>

      {/* Buy All Button */}
      <button className="w-80 bg-main text-[#FFFFFF] py-3 flex justify-center rounded-md">
        BUY ALL
      </button>
    </div>
  );
};
export default Payment;
