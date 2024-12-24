import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Navbar from "../Header/Navbar";
import DashboardFooter from "../Footer/Footer";

const ProfessionalProfile = () => {
  const [profileImage, setProfileImage] = useState("/assets/black-worker.jpg"); // Placeholder URL for the profile picture
  const skills = [
    "Plumbing",
    "Water System Repair",
    "Emergency Services",
    "Pipe Installation",
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update the profile picture with the new one
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 text-white">
        {/* Profile Header */}
        <div>
          <div className="flex items-center space-x-8">
            {/* Profile Picture Section */}
            <div className="relative">
              <img
                src={profileImage} // Display the selected or current profile picture
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover xsMobile:h-24 xsMobile:w-24"
              />
              <button
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#32cd32] hover:bg-[#28a428]"
                onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input click
              >
                <PencilIcon className="h-5 w-5 text-white" />
              </button>
              {/* Hidden file input for selecting new picture */}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Professional Information */}
            <div className="space-y-2">
              <div>
                {" "}
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-lg text-[#32cd32]">Plumbing Expert</p>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-[#32cd32]">
              "Your Go-to Plumbing Expert"
            </h2>
          </div>
        </div>
        <hr className="mt-4 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />
        <div className="mt-8">
          <p className="mb-4 text-2xl font-semibold">Basic info</p>
          <ul className="ml-4 list-disc">
            <li className="">Years of Experience: 8</li>
            <li className="">Location: Lagos, Nigeria</li>
            <li className="">Languages: English, Yoruba</li>
          </ul>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />
        {/* Bio Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Bio</h2>
          <p className="text-[#a9a8a7]">
            I am a dedicated plumbing expert with over 8 years of experience. I
            specialize in water system repair, emergency plumbing services, and
            pipe installation. I take pride in delivering high-quality service
            in a timely manner.
          </p>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[#32cd32] px-3 py-1 text-sm text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Portfolio Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Portfolio</h2>
          <div className="grid grid-cols-2 gap-4 xsMobile:flex xsMobile:flex-col miniMobile:flex miniMobile:flex-col mobile:flex mobile:flex-col miniTablet:flex miniTablet:flex-col tablet:flex tablet:flex-col">
            {/* Example Portfolio Items */}
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <img
                src="/assets/portfolio1.jpg"
                alt="Project 1"
                className="h-64 w-full rounded-md object-cover"
              />
              <p className="mt-2 text-[#a9a8a7]">
                Pipe Installation for a Residential Building
              </p>
            </div>
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <img
                src="/assets/portfolio2.jpg"
                alt="Project 2"
                className="h-64 w-full rounded-md object-cover"
              />
              <p className="mt-2 text-[#a9a8a7]">Emergency Water Leak Fix</p>
            </div>
          </div>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Ratings and Reviews */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Ratings and Reviews</h2>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-[#32cd32]">4.8</div>
            <div className="ml-2 text-[#a9a8a7]">
              / 5.0 (based on 35 reviews)
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <p className="text-[#32cd32]">
                "Great work, quick response, and reliable!"
              </p>
              <p className="text-[#a9a8a7]">- Client 1</p>
            </div>
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <p className="text-[#32cd32]">
                "Fixed my pipe issue in no time. Highly recommended!"
              </p>
              <p className="text-[#a9a8a7]">- Client 2</p>
            </div>
          </div>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Level and Certifications */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Level and Certifications
          </h2>
          <p className="text-[#a9a8a7]">Level: Advanced Professional</p>
          <p className="mt-2 text-[#a9a8a7]">
            Certifications: Licensed Plumber, Water System Specialist
          </p>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Badges and Achievements */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Badges and Achievements
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#32cd32] px-3 py-1 text-sm text-black">
              Top Rated
            </span>
            <span className="rounded-full bg-[#32cd32] px-3 py-1 text-sm text-black">
              100+ Projects Completed
            </span>
            <span className="rounded-full bg-[#32cd32] px-3 py-1 text-sm text-black">
              Quick Responder
            </span>
          </div>
        </div>
        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Contact Information */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
          <p className="text-[#a9a8a7]">Email: johndoe@example.com</p>
          <p className="text-[#a9a8a7]">Phone: +234 123 4567</p>
        </div>
      </div>
      <div className="-mt-24">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default ProfessionalProfile;
