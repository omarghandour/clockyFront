import React from "react";
import Nav from "../components/Nav";

const page = () => {
  return (
    <div className="min-h-dvh bg-main md:p-8 flex flex-col items-center text-pretty">
      {/* <Nav /> */}
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg md:p-8 mt-20">
        {/* English Section */}
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Copyright Information
          </h1>
          <p className="mb-4">
            © {new Date().getFullYear()} Clocky Watches. All rights reserved.
            This website and its content, including but not limited to text,
            images, graphics, and code, are the property of Clocky Watches.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Usage of Content:
          </h2>
          <p className="mb-4">
            The content of this website is protected by copyright laws. You may
            not reproduce, distribute, or use any part of this website&#39;s
            content without prior written consent from Clocky Watches.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us:</h2>
          <p className="mb-4">
            If you have any questions regarding copyright or would like to
            request permission to use our content, please contact us via:
          </p>
          <ul className="list-none mb-6">
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+201113283189" className="text-blue-600 underline">
                01113283189
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@clocky.com"
                className="text-blue-600 underline"
              >
                info@clocky.com
              </a>
            </li>
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-8" />

        {/* Arabic Section */}
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-900 text-right">
          <h1 className="text-3xl font-bold mb-6 text-center">
            معلومات حقوق الطبع والنشر
          </h1>
          <p className="mb-4">
            © {new Date().getFullYear()} شركة كلوكي للساعات. جميع الحقوق محفوظة.
            إن هذا الموقع الإلكتروني ومحتواه، بما في ذلك النصوص والصور والرسوم
            البيانية والرموز البرمجية، هو ملك لشركة كلوكي للساعات.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">استخدام المحتوى:</h2>
          <p className="mb-4">
            إن محتوى هذا الموقع محمي بموجب قوانين حقوق الطبع والنشر. لا يجوز لك
            إعادة إنتاج أو توزيع أو استخدام أي جزء من محتوى هذا الموقع دون
            الحصول على موافقة خطية مسبقة من شركة كلوكي للساعات.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">التواصل معنا:</h2>
          <p className="mb-4">
            إذا كان لديك أي استفسارات بخصوص حقوق الطبع والنشر أو ترغب في طلب إذن
            لاستخدام محتوى موقعنا، يرجى التواصل معنا عبر:
          </p>
          <ul className="list-none mb-6">
            <li>
              <strong>الهاتف:</strong>{" "}
              <a href="tel:+201113283189" className="text-blue-600 underline">
                01113283189
              </a>
            </li>
            <li>
              <strong>البريد الإلكتروني:</strong>{" "}
              <a
                href="mailto:info@clocky.com"
                className="text-blue-600 underline"
              >
                info@clocky.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
