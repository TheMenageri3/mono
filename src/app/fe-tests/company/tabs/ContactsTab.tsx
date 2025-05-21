"use client";

import { useState } from "react";
import { Mail, Phone, Calendar } from "lucide-react";

export function ContactsTab() {
  const [hover, setHover] = useState(null);

  const teamMembers = [
    {
      id: 1,
      initials: "ER",
      name: "Elena Rivera",
      title: "Chief Technology Officer",
      email: "elena@blockchaindynamics.io",
      phone: "+1 (512) 555-0123",
    },
    {
      id: 2,
      initials: "MW",
      name: "Marcus Wei",
      title: "Head of Business Development",
      email: "marcus@blockchaindynamics.io",
      phone: "+1 (512) 555-0187",
    },
    {
      id: 3,
      initials: "SJ",
      name: "Sophia Johnson",
      title: "Product Lead",
      email: "sophia@blockchaindynamics.io",
      phone: "+1 (512) 555-0199",
    },
  ];

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Our Leadership Team
          </h1>
          <p className="text-gray-300">
            Connect with our blockchain experts who are driving innovation in
            the industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full bg-purple-800 flex items-center justify-center mb-4 text-xl font-bold">
                {member.initials}
              </div>

              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-purple-300 mb-2">{member.title}</p>

              <div className="w-12 h-1 bg-purple-600 rounded mb-6"></div>

              <div className="w-full space-y-4">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center p-3 bg-gray-800 bg-opacity-70 rounded-md hover:bg-purple-800 transition-colors text-gray-300"
                >
                  <Mail size={18} className="mr-2" />
                  <span className="text-sm">{member.email}</span>
                </a>

                <a
                  href={`tel:${member.phone}`}
                  className="text-gray-300 flex items-center p-3 bg-gray-800 bg-opacity-70 rounded-md hover:bg-purple-800 transition-colors"
                >
                  <Phone size={18} className="mr-2" />
                  <span className="text-sm">{member.phone}</span>
                </a>

                <button
                  className="w-full flex items-center justify-center p-3 bg-purple-700 rounded-md hover:bg-purple-600 transition-colors"
                  onMouseLeave={() => setHover(null)}
                >
                  <Calendar size={18} className="mr-2" />
                  <span>
                    {hover === member.id ? "Book Now" : "Schedule Meeting"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 bg-opacity-60 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-2">Need more information?</h2>
              <p className="text-gray-300">
                Our team is ready to help with any questions about our products
                and services
              </p>
            </div>

            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="flex items-center bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-md transition-colors">
                <Mail size={18} className="mr-2" />
                Contact Sales
              </button>

              <button className="flex items-center border border-purple-600 hover:bg-purple-800 px-4 py-2 rounded-md transition-colors">
                <Phone size={18} className="mr-2" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
