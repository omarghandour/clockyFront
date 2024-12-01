"use client";
import Link from "next/link";
import React, { useState } from "react";

const PrivacyPolicy: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  return (
    <div className="p-6  w-full mt-20 md:mt-12 flex flex-col items-end bg-white shadow-md rounded-lg text-main">
      <button
        onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        className="px-4 py-2 bg-main text-two rounded hover:bg-two hover:text-main"
        aria-label={`Switch to ${
          language === "en" ? "Arabic" : "English"
        } language`}
      >
        {language === "en" ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
      </button>

      {language === "en" ? (
        <div className="space-y-4">
          <div
            className={`flex items-center mb-4 ${
              language === "en" ? "justify-center" : "justify-end gap-5"
            }`}
          >
            <h1 className="text-2xl font-bold">
              {language === "en"
                ? "Clocky Watches Privacy Policy"
                : "سياسة الخصوصية لشركة كلوكي للساعات"}
            </h1>
          </div>
          <p>
            At Clocky Watches, we are committed to protecting the privacy of our
            customers and visitors. This policy explains how we collect, use,
            and protect the personal information you provide when visiting our
            website.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Information Collection:</strong> We collect personal
              information you provide when registering on our site, making a
              purchase, or subscribing to our newsletter. This may include your
              name, email, postal address, phone number, and payment
              information.
            </li>
            <li>
              <strong>Use of Information:</strong> The information we collect is
              used to:
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Process orders and provide requested services.</li>
                <li>Improve the user experience on our website.</li>
                <li>Send updates about our products and services.</li>
                <li>Respond to customer inquiries and provide support.</li>
              </ul>
            </li>
            <li>
              <strong>Protection of Information:</strong> We take appropriate
              security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction,
              including encryption and firewalls.
            </li>
            <li>
              <strong>Sharing of Information:</strong> We will not sell, rent,
              or share your personal information with third parties without your
              consent, except as required by law or to protect our legal rights.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your
              experience on our website. You can set your browser to refuse
              cookies, but this may affect some site functionalities.
            </li>
            <li>
              <strong>Your Rights:</strong> You have the right to access,
              correct, or delete your personal information. If you wish to
              exercise these rights, please contact us at the information
              provided below.
            </li>
            <li>
              <strong>Changes to the Privacy Policy:</strong> We may update the
              privacy policy periodically. Changes will be posted on this page,
              and we encourage you to review the policy regularly.
            </li>
          </ol>
          <p>
            <strong>Contact Information:</strong> If you have any questions or
            concerns about the privacy policy, please contact us at:
          </p>
          <p>
            Email:{" "}
            <Link href={"mailto:info@clocky.com"} className="text-two">
              info@clocky.com
            </Link>
          </p>
          <Link href={"tel:+201113283189"}>
            <p className="font-bold">
              Contact Us:{" "}
              <span className="font-bold text-two">+201113283189</span>
            </p>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 text-right leading-relaxed" dir="rtl">
          <div
            className={`flex items-center mb-4 justify-center  ${
              language !== "ar" ? "" : "gap-5"
            }`}
          >
            <h1 className="text-2xl font-bold">
              {language !== "ar"
                ? "Clocky Watches Privacy Policy"
                : "سياسة الخصوصية لشركة كلوكي للساعات"}
            </h1>
          </div>
          <p>
            نحن في شركة كلوكي للساعات نلتزم بحماية خصوصية عملائنا وزوار موقعنا.
            توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية التي
            تقدمها لنا عند زيارة موقعنا.
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>جمع المعلومات:</strong> نقوم بجمع المعلومات الشخصية التي
              تقدمها لنا عند التسجيل في موقعنا، أو عند إجراء عملية شراء، أو عند
              الاشتراك في النشرة الإخبارية. قد تشمل هذه المعلومات الاسم، وعنوان
              البريد الإلكتروني، والعنوان البريدي، ورقم الهاتف، ومعلومات الدفع.
            </li>
            <li>
              <strong>استخدام المعلومات:</strong> نستخدم المعلومات التي نجمعها
              للأغراض التالية:
              <ul className="list-disc list-inside mr-4 space-y-1">
                <li>معالجة الطلبات وتقديم الخدمات المطلوبة.</li>
                <li>تحسين تجربة المستخدم على موقعنا.</li>
                <li>إرسال تحديثات حول منتجاتنا وخدماتنا.</li>
                <li>الرد على استفسارات العملاء وتقديم الدعم.</li>
              </ul>
            </li>
            <li>
              <strong>حماية المعلومات:</strong> نحن نتخذ إجراءات أمنية مناسبة
              لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو
              الكشف أو التدمير. نستخدم تقنيات التشفير وجدران الحماية لضمان أمان
              بياناتك.
            </li>
            <li>
              <strong>مشاركة المعلومات:</strong> لن نقوم ببيع أو تأجير أو مشاركة
              معلوماتك الشخصية مع أطراف ثالثة دون موافقتك، إلا إذا كان ذلك
              مطلوبًا بموجب القانون أو لحماية حقوقنا القانونية.
            </li>
            <li>
              <strong>ملفات تعريف الارتباط (Cookies):</strong> نستخدم ملفات
              تعريف الارتباط لتحسين تجربتك على موقعنا. يمكنك ضبط إعدادات المتصفح
              لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على قدرتك على استخدام
              بعض ميزات الموقع.
            </li>
            <li>
              <strong>حقوقك:</strong> لديك الحق في الوصول إلى معلوماتك الشخصية
              وتصحيحها أو حذفها. إذا كنت ترغب في ممارسة هذه الحقوق، يرجى الاتصال
              بنا عبر معلومات الاتصال أدناه.
            </li>
            <li>
              <strong>التغييرات في سياسة الخصوصية:</strong> قد نقوم بتحديث سياسة
              الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة، ونشجعك
              على مراجعة السياسة بانتظام.
            </li>
          </ol>
          <p>
            <strong>معلومات الاتصال:</strong> إذا كان لديك أي أسئلة أو استفسارات
            حول سياسة الخصوصية، يرجى الاتصال بنا على:
          </p>
          <p>البريد الإلكتروني: email@example.com</p>
          <Link href={"tel:+201113283189"}>
            <p className="font-bold">
              تواصل معنا <span className="font-bold">+201113283189</span>
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicy;
