import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Navbar from "./Navbar";
import DashboardFooter from "./DashboardFooter";

const ClientProfile = () => {
  const [profileImage, setProfileImage] = useState("/assets/black-worker.jpg"); // Placeholder URL for the profile picture

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
          <div className="flex items-center  space-x-8 miniMobile:flex-col miniMobile:items-center miniMobile:space-x-0 miniMobile:space-y-4">
            {/* Profile Picture Section */}
            <div className="relative">
              <img
                src={profileImage} // Display the selected or current profile picture
                alt="Profile"
                className="xs:h-24 xs:w-24 h-32 w-32 rounded-full object-cover "
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

            {/* Client Information */}
            <div className="space-y-2">
              <div>
                {" "}
                <h1 className="text-3xl font-bold miniMobile:mb-4 miniMobile:text-center">
                  John Doe
                </h1>
                <ul className=" space-y-2 miniMobile:space-y-4">
                  <li className="rounded border-t-4 border-t-[#32cd32] bg-[#1a1a1a] p-3">
                    <span className="text-[#32cd32]">Location : </span> Lagos ,
                    Nigeria
                  </li>
                  <li className="rounded border-t-4 border-t-[#32cd32] bg-[#1a1a1a] p-4">
                    <span className="text-[#32cd32]">Languages : </span> English
                    , Yoruba
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="mt-6 h-[0.08rem] w-[100%] border-0 bg-[#2e2e2e]" />

        {/* Ratings and Reviews */}
        <div className="mt-8 ">
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
                "Friendly, quick response and patient"
              </p>
              <p className="text-[#a9a8a7]">- Kurosaki Ichigo</p>
            </div>
            <div className="rounded-lg bg-[#1a1a1a] p-4">
              <p className="text-[#32cd32]">"Made my job much easier"</p>
              <p className="text-[#a9a8a7]">- D luffy</p>
            </div>
          </div>
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
              100+ Jobs posted
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

export default ClientProfile;
