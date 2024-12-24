import React, { useState, ChangeEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  tagLine: string;
  experience: string;
  location: string;
  bio: string;
}

const OnboardingForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const skillsList: string[] = [
    "Web Development",
    "Graphic Design",
    "Data Analysis",
    "UI/UX Design",
    "SEO",
    "Content Writing",
    "Marketing",
  ];

  const statesList: string[] = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  const languagesList: string[] = [
    "Yoruba",
    "Hausa",
    "Igbo",
    "English",
    "Others",
  ];

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSkillChange = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 4) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleLanguageChange = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Final Submission: ", {
        ...data,
        selectedSkills,
        selectedLanguages,
      });
    }
  };
  useEffect(() => {
    document.title = "Onboarding | Workifyy";
  }, []);

  return (
    <main className="flex h-screen flex-col largeDesktop:flex-row">
      <div className="hidden h-screen largeDesktop:block largeDesktop:w-[70%]">
        <img
          className="h-full w-full object-cover"
          src="/assets/black-worker.jpg"
          alt="Worker"
        />
      </div>

      <div className="flex h-screen flex-grow flex-col bg-black largeDesktop:w-[30%]">
        <div className="flex flex-grow items-center overflow-y-auto">
          <div className="mx-auto max-w-md px-4 py-8">
            <div className="mb-8 flex items-center justify-center">
              {[1, 2, 3, 4].map((item, index) => (
                <React.Fragment key={item}>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      step >= item
                        ? "bg-[#32cd32] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {item}
                  </div>
                  {index < 3 && (
                    <div className="mx-2 h-[2px] w-8 bg-gray-300"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-semibold text-white">
                Onboarding Getting Started!
              </h1>
              <p className="text-gray-500">
                You can always change these later.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div>
                  <input
                    className="mb-4 w-full rounded bg-[#323439] p-3 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Enter your tagline (e.g. , Expert Mechanic)"
                    {...register("tagLine", { required: true })}
                  />
                  {errors.tagLine && (
                    <span className="mb-4 block text-red-500">
                      This field is required
                    </span>
                  )}

                  <input
                    type="number"
                    className="mb-4 w-full rounded bg-[#323439] p-3 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Enter years of experience"
                    {...register("experience", { required: true })}
                  />
                  {errors.experience && (
                    <span className="mb-4 block text-red-500">
                      This field is required
                    </span>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="mb-4 block text-sm font-semibold text-white">
                    Fields of Expertise (Select up to 4)
                  </label>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {skillsList.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleSkillChange(skill)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                          selectedSkills.includes(skill)
                            ? "bg-[#32cd32] text-black"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      Selected Skills
                    </h3>
                    {selectedSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#32cd32] px-3 py-1 text-xs text-black"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No skills selected yet.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Select Your Location
                  </label>
                  <select
                    className="mb-4 w-full rounded bg-[#323439] p-2 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    {...register("location", { required: true })}
                  >
                    {statesList.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.location && (
                    <span className="mb-4 block text-red-500">
                      Location is required
                    </span>
                  )}

                  <label className="mb-2 block text-sm font-semibold text-white">
                    Select Languages You Speak
                  </label>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {languagesList.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => handleLanguageChange(language)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                          selectedLanguages.includes(language)
                            ? "bg-[#32cd32] text-black"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        {language}
                      </button>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      Selected Languages
                    </h3>
                    {selectedLanguages.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedLanguages.map((language) => (
                          <span
                            key={language}
                            className="rounded-full bg-[#32cd32] px-3 py-1 text-xs text-black"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No languages selected yet.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 4 && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Upload Profile Picture
                  </label>
                  <div className="mb-4 flex items-center space-x-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={handleImageChange}
                      />
                      <button
                        type="button"
                        className="rounded bg-[#32cd32] p-2 text-white"
                      >
                        Choose Image
                      </button>
                    </div>

                    {selectedImage && (
                      <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#32cd32]">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <label className="mb-2 block text-sm font-semibold text-white">
                    Short Bio
                  </label>
                  <textarea
                    className="mb-4 h-32 w-full rounded bg-[#323439] p-2 text-white focus:border-[#32cd32] focus:outline-none focus:ring-2 focus:ring-[#32cd32]"
                    placeholder="Write a short bio about yourself..."
                    {...register("bio", { required: true, maxLength: 200 })}
                  />
                  {errors.bio && errors.bio.type === "required" && (
                    <span className="mb-4 block text-red-500">
                      Bio is required
                    </span>
                  )}
                  {errors.bio && errors.bio.type === "maxLength" && (
                    <span className="mb-4 block text-red-500">
                      Bio cannot exceed 200 characters
                    </span>
                  )}

                  <button
                    type="submit"
                    className="w-full rounded bg-[#32cd32] p-2 text-white"
                  >
                    Finish
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OnboardingForm;
