"use client";
import React, { useState } from "react";

const Page = () => {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };
  return (
    <div className="min-h-dvh bg-white paddingX flex flex-col items-center text-pretty p-6 w-full mt-20 md:mt-18  rounded-lg text-main mx-auto md:p-8 ">
      <div className="w-full flex flex-col items-end bg-white  rounded-lg md:p-8 mt-10">
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-main text-two rounded hover:bg-two hover:text-main"
          aria-label={`Switch to ${
            isEnglish === true ? "Arabic" : "English"
          } language`}
        >
          {isEnglish ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
        </button>
        {isEnglish ? (
          // English Section
          <div className="w-full mx-auto p-6 bg-gray-100 text-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-center">
              About Clocky Watches
            </h1>
            <p className="mb-4">
              At Clocky Watches, we are passionate about providing stylish and
              high-quality timepieces that elevate your everyday life.
              Established in 2022, we have been on a mission to bring both
              timeless classics and modern designs to wristwatch enthusiasts
              around the world.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Our Vision and Mission
            </h2>
            <p className="mb-4">
              Our vision is to create watches that combine elegance with
              functionality. We believe that a watch is more than just a way to
              tell time—it’s an expression of personal style, and we’re
              committed to helping our customers find the perfect accessory for
              any occasion.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Our Commitment to Quality
            </h2>
            <p className="mb-4">
              At Clocky Watches, we take pride in the quality of our products.
              Every watch we create undergoes rigorous testing and inspection to
              ensure durability and precision. We collaborate with the best
              designers and manufacturers to offer watches that blend
              craftsmanship with cutting-edge technology.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Customer Satisfaction
            </h2>
            <p className="mb-4">
              Our customers are at the heart of everything we do. We are
              dedicated to providing exceptional customer service, from the
              moment you browse our collections to after-sales support. Our
              return and replacement policy ensures that every customer is
              satisfied with their purchase.
            </p>
          </div>
        ) : (
          // Arabic Section
          <div className="w-full mx-auto p-6 bg-gray-100 text-gray-900 text-right">
            <h1 className="text-3xl font-bold mb-6 text-center">
              من نحن - شركة كلوكي للساعات
            </h1>
            <p className="mb-4">
              في شركة كلوكي للساعات، نحن شغوفون بتقديم ساعات أنيقة وعالية الجودة
              ترتقي بحياتك اليومية. تأسست الشركة في عام 2022، ومنذ ذلك الحين
              نعمل على جلب التصاميم الكلاسيكية الحديثة لعشاق الساعات حول العالم.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">رؤيتنا ومهمتنا</h2>
            <p className="mb-4">
              رؤيتنا هي إنشاء ساعات تجمع بين الأناقة والوظائف العملية. نؤمن أن
              الساعة ليست مجرد وسيلة لمعرفة الوقت، بل هي تعبير عن الأسلوب
              الشخصي، ونحن ملتزمون بمساعدة عملائنا على العثور على الإكسسوار
              المثالي لكل مناسبة.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">
              التزامنا بالجودة
            </h2>
            <p className="mb-4">
              نحن في كلوكي للساعات نعتز بجودة منتجاتنا. تخضع كل ساعة نصنعها
              لاختبارات صارمة وفحص دقيق لضمان المتانة والدقة. نتعاون مع أفضل
              المصممين والمصنعين لنقدم ساعات تمزج بين الحرفية والتكنولوجيا
              المتطورة.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">رضا العملاء</h2>
            <p className="mb-4">
              عملاؤنا هم محور كل ما نقوم به. نحن ملتزمون بتقديم خدمة عملاء
              استثنائية، بدءًا من تصفح مجموعاتنا وحتى دعم ما بعد البيع. تضمن
              سياسة الاستبدال والاسترجاع لدينا أن كل عميل يكون راضيًا عن
              مشترياته.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
