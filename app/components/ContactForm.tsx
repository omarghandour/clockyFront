"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      if (file) {
        formDataToSend.append("file", file);
      }

      const response = await fetch("/api/support", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSuccessMessage("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setFile(null);
      } else {
        setErrorMessage("Error sending email. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white shadow text-main w-full p-4 rounded">
      <form onSubmit={handleSubmit} className="mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="file" className="block text-sm font-bold mb-2">
            File (Optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-main">{successMessage}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-main text-two hover:bg-two hover:text-main font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
