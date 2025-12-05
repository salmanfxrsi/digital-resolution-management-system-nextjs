"use client";
import React from "react";

export default function Aboutpage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          WHO WE ARE
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
          Digital Resolution is your trusted partner for innovative online
          solutions. It is the largest online based digital agency in UAE. We
          offer comprehensive services with a mission to help you achieve all
          online solutions in one agency for your business operations.
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
          Since our inception, we have partnered with numerous companies and
          delivered operational gains to startups, emerging, and established
          organizations in the United States and Canada.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          BENEFITS OF WORKING WITH DIGITAL RESOLUTION
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <BenefitCard
            title="Kick Start"
            description="Our teams can be ramped up quickly and managed autonomously to implement and execute agreed plans."
          />
          <BenefitCard
            title="Top Quality Engineers"
            description="Our hiring process is constantly active to ensure your access to the best IT professionals in the market."
          />
          <BenefitCard
            title="End to End Management"
            description="We are responsible for your project completion and team management from start to end, guaranteeing quality product output."
          />
          <BenefitCard
            title="Operational Efficiency"
            description="Our cost effective services help reduce your costs to remain competitive without compromising quality."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 px-6 border-t">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          Get in Touch
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form className="space-y-6 bg-gray-50 p-8 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Write your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition font-medium"
            >
              Send
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
            <div>
              <p className="font-medium">Bangladesh Office:</p>
              <p className="text-gray-600">
                Software Technology Park, 6th Floor, Singapore Bangkok Market,
                Agrabad, Chattogram.
              </p>
            </div>
            <div>
              <p className="font-medium">Dubai Office:</p>
              <p className="text-gray-600">
                Al Qouz, Street number 21a, Villah 30, UAE
              </p>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">Contact</h3>
            <p className="text-gray-600">Phone: +8801840-930768</p>
            <p className="text-gray-600">WhatsApp: +8801840930768</p>
            <p className="text-gray-600">
              Email: digitalresolution.net@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// 🔹 Reusable Benefit Card Component
function BenefitCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
