"use client";

import React, { useState } from "react";
// import Nav from "../components/Nav"; // Uncomment if you want to use Nav

const Page = () => {
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <div className="min-h-screen bg-main paddingX  text-pretty p-6 w-full mt-20 md:mt-12 shadow-md rounded-lg text-main paddingX mx-auto md:p-8 ">
      <div className="w-full flex flex-col items-end bg-white shadow-md rounded-lg md:p-8 mt-10">
        {/* <Nav /> */}
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
              Replacement and Return Policy for Clocky Watches
            </h1>
            <p className="mb-4">
              At Clocky Watches, we are committed to customer satisfaction and
              providing the best shopping experience possible. Therefore, we
              offer a flexible replacement and return policy that complies with
              Egyptian consumer protection laws.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Replacement and Return Conditions:
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Timeframe:</strong> Customers have the right to exchange
                or return the product within 14 days of the purchase date.
              </li>
              <li>
                <strong>Product Condition:</strong> The product must be in its
                original condition, unused, and include all components and
                accessories.
              </li>
              <li>
                <strong>Proof of Purchase:</strong> A receipt or invoice must be
                provided as proof of purchase.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Replacement and Return Process:
            </h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                <strong>Contact Customer Service:</strong> Customers can reach
                out to customer service by phone or email to initiate the
                replacement or return process.
              </li>
              <li>
                <strong>Packaging and Shipping:</strong> The customer must
                securely pack the product and send it to the company&#39;s
                specified address.
              </li>
              <li>
                <strong>Product Receipt and Inspection:</strong> After receiving
                the product, our team will inspect it to ensure its condition.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              Shipping Costs:
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Store Error:</strong> If the product is defective or
                does not match the order, the company will cover the shipping
                costs.
              </li>
              <li>
                <strong>Personal Preference:</strong> If the customer wishes to
                return the product for personal reasons, they will be
                responsible for the shipping costs.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Refunds:</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                Refunds will be issued to the bank card used for the purchase or
                in cash upon receipt of the returned product.
              </li>
              <li>The refund process may take 7 to 14 business days.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Exceptions:</h2>
            <ul className="list-disc list-inside mb-4">
              <li>Perishable products such as food items.</li>
              <li>
                Customized products that have been made according to the
                customer&#39;s request.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us:</h2>
            <p className="mb-4">
              For any inquiries or issues related to our replacement and return
              policy, please contact us via:
            </p>
            <ul className="list-none mb-6">
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:201113283189" className="text-blue-600 underline">
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
        ) : (
          // Arabic Section
          <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-900 text-right">
            <h1 className="text-3xl font-bold mb-6 text-center">
              سياسة الاستبدال والاسترجاع لشركة كلوكي للساعات
            </h1>
            <p className="mb-4">
              نحن في شركة كلوكي للساعات نحرص على رضا عملائنا وتقديم أفضل تجربة
              تسوق ممكنة. لذلك، نقدم سياسة استبدال واسترجاع مرنة تتماشى مع
              القوانين المصرية لحماية حقوق المستهلك.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              :شروط الاستبدال والاسترجاع
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>المدة الزمنية:</strong> يحق للعميل استبدال أو استرجاع
                المنتج خلال 14 يومًا من تاريخ الشراء.
              </li>
              <li>
                <strong>حالة المنتج:</strong> يجب أن يكون المنتج في حالته
                الأصلية وغير مستخدم، ويشمل جميع المكونات والإكسسوارات.
              </li>
              <li>
                <strong>إثبات الشراء:</strong> يجب تقديم إيصال أو فاتورة الشراء
                كدليل على الشراء.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              :إجراءات الاستبدال والاسترجاع
            </h2>
            <ul className="list-inside mb-4">
              <li>
                <strong>الاتصال بخدمة العملاء:</strong> يمكن للعميل التواصل مع
                خدمة العملاء عبر الهاتف أو البريد الإلكتروني لبدء عملية
                الاستبدال أو الاسترجاع.
              </li>
              <li>
                <strong>التعبئة والشحن:</strong> يجب على العميل تعبئة المنتج
                بشكل آمن وإرساله إلى عنوان الشركة المحدد.
              </li>
              <li>
                <strong>استلام وفحص المنتج:</strong> بعد استلام المنتج، سيتم
                فحصه من قبل فريقنا للتأكد من حالته.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">:تكاليف الشحن</h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>في حالة الخطأ من المتجر:</strong> إذا كان المنتج معيبًا
                أو غير مطابق لما تم طلبه، تتحمل الشركة تكاليف الشحن.
              </li>
              <li>
                <strong>في حالة رغبة العميل في الإرجاع لأسباب شخصية:</strong>{" "}
                يتحمل العميل تكاليف الشحن.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">
              :استرداد الأموال
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                سيتم استرداد الأموال إلى البطاقة البنكية المستخدمة في الشراء أو
                كاش عند استلام المنتج المرتجع.
              </li>
              <li>تستغرق عملية استرداد الأموال من 7 إلى 14 يوم عمل.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">:استثناءات</h2>
            <ul className="list-disc list-inside mb-4">
              <li>المنتجات القابلة للتلف مثل المواد الغذائية.</li>
              <li>المنتجات المخصصة التي تم تصنيعها حسب طلب العميل.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">:التواصل معنا</h2>
            <p className="mb-4">
              :لأي استفسارات أو مشكلات متعلقة بسياسة الاستبدال والاسترجاع، يرجى
              التواصل معنا عبر
            </p>
            <ul className="list-none mb-6">
              <li>
                <strong>الهاتف:</strong>{" "}
                <a href="tel:201113283189" className="text-blue-600 underline">
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
        )}
      </div>
    </div>
  );
};

export default Page;
