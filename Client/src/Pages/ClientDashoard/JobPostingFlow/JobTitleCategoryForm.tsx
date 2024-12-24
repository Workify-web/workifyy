import React, { useState } from "react";
import Select from "react-select";

interface JobTitleCategoryFormProps {
  formData: any;
  handleChange: (data: any) => void;
  onNext: () => void;
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#323232", // Dropdown background
    borderColor: "#32cd32", // Green border
    color: "#fff", // Text color white
    padding: "0.5rem", // Padding
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff", // Input text color
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9ca3af", // Gray placeholder text
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff", // Selected option text color
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#323232", // Dropdown menu background
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#32cd32" : "#323232", // Green when selected, dark otherwise
    color: state.isSelected ? "#000" : "#fff", // Text color
    padding: "0.5rem", // Padding for better UX
    cursor: "pointer", // Pointer cursor
  }),
};

const options = [
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "carpentry", label: "Carpentry" },
  { value: "painting", label: "Painting" },
  { value: "cleaning", label: "Cleaning" },
  { value: "gardening", label: "Gardening" },
  { value: "tiling", label: "Tiling" },
  { value: "roofing", label: "Roofing" },
  { value: "flooring", label: "Flooring" },
  { value: "plastering", label: "Plastering" },
];

const JobTitleCategoryForm = ({
  formData,
  handleChange,
  onNext,
}: JobTitleCategoryFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    handleChange({ [name]: value });
  };

  const handleCategoryChange = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedCategories([...selectedCategories, selectedOption]);
      handleChange({ categories: [...selectedCategories, selectedOption] });
    }
  };

  const removeCategory = (categoryToRemove: any) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category.value !== categoryToRemove.value,
    );
    setSelectedCategories(updatedCategories);
    handleChange({ categories: updatedCategories });
  };

  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-semibold text-white">Job Details</h2>

      {/* Job Title */}
      <label className="mb-2 block text-white">Job Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="mb-4 w-full rounded bg-[#323232] p-2 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
        placeholder="Enter job title"
      />

      {/* Job Category Dropdown */}
      <div className="mb-4">
        <label className="mb-2 block text-white">Job Category</label>
        <Select
          options={options}
          styles={customStyles} // Apply custom styles with Tailwind-like colors
          placeholder="Select job category"
          onChange={handleCategoryChange} // Handle category change
          isClearable
          isSearchable
          value={null} // Reset dropdown value after selection
        />
      </div>
      {/* Display selected categories as bubbles */}
      {selectedCategories.length > 0 && (
        <div className="mb-4 mt-4 flex flex-wrap">
          {selectedCategories.map((category, index) => (
            <div
              key={index}
              className="mb-2 mr-2 flex items-center rounded-full bg-[#32cd32] px-3 py-1 text-sm text-black"
            >
              {category.label}
              <button
                onClick={() => removeCategory(category)}
                className="ml-2 text-black"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Job Description */}
      <label className="mb-2 block text-white">Job Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="mb-4 w-full rounded bg-[#323232] p-2 text-white focus:outline-none focus:ring focus:ring-[#32cd32]"
        placeholder="Enter job description"
      />

      {/* Next Button */}
      <button
        onClick={onNext}
        className="rounded bg-[#32cd32] p-2 px-4 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default JobTitleCategoryForm;
