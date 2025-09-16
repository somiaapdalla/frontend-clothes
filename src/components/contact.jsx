import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:1000/create/contact", form);
      setSuccess("Message sent successfully!");
      alert("Message sent successfully!")
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.log(err);
      setSuccess("Failed to send message.");
      alert("Failed to send message.")
    }
  };

  return (
    <section className="relative bg-green-50 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          Get in <span className="text-green-600">Touch</span>
        </h2>

        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>

            {success && <p className="mt-4 text-green-600 font-semibold">{success}</p>}
          </form>

          <div className="mt-10 text-center text-gray-600 space-y-2">
            <p>Email: contact@velorafashion.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Fashion Street, Eco City</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full translate-x-32 translate-y-32"></div>
    </section>
  );
}
