/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "./../../utils/uploadCloudinary";
import { BASE_URL, token } from "./../../config.js";
import { toast } from "react-toastify";

const DoctorProfile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const fileInputRef = useRef(null);
  const isFileSelectedRef = useRef(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoSelection = async (e) => {
    if (!isFileSelectedRef.current) {
      isFileSelectedRef.current = true;
      console.log("Hi");
      return;
    }

    const file = e.target.files[0];
    // using cloudinary to upload the picture
    const data = await uploadImageToCloudinary(file);
    // console.log(data?.url);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateDoctorProfileHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      // console.log(doctorData);
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw Error(message);
      }

      // setFormData(false);
      toast.success(message);

      // navigate("/login");
    } catch (error) {
      toast.error(error.message);
      // setLoading(false);
    }
  };

  //   reusable function for adding various item in the formData - TO ADD THE FORM SECTION TO THE UI
  const addItem = (name, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: [...prevFormData[name], item],
    }));
  };

  //   resuable input change function
  const reusableInputChange = (tag, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[tag]];

      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [tag]: updateItems,
      };
    });
  };

  //   resuable function for deleting item
  const deleteItem = (tag, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [tag]: [...prevFormData[tag].filter((_, i) => i !== index)],
    }));
  };

  // qualifications
  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "PHD",
      university: "Dhaka Medical College",
    });
  };

  const qualificationInputChange = (e, index) => {
    reusableInputChange("qualifications", index, e);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index, e);
  };

  // experiences
  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Surgeon",
      hospital: "Garki Hospital",
    });
  };

  const experienceInputChange = (e, index) => {
    reusableInputChange("experiences", index, e);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index, e);
  };

  // time slot
  const timeSlot = (e) => {
    e.preventDefault();

    addItem("timeSlots", {
      day: "Sunday",
      startingTime: "10:00",
      endingTime: "04:30",
    });
  };

  const timeSlotInputChange = (e, index) => {
    reusableInputChange("timeSlots", index, e);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index, e);
  };

  return (
    <div>
      <h2 className='text-headingColor font-bold  text-[24px] leading-9 mb-10'>
        Profile Information
      </h2>

      <form>
        <div className='mb-5'>
          <p className='form_label'>Name*</p>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Full Name'
            className='form_input'
          />
        </div>
        <div className='mb-5'>
          <p className='form_label'>Email*</p>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
            className='form_input'
            readOnly
            aria-readonly
            disabled
          />
        </div>
        <div className='mb-5'>
          <p className='form_label'>Phone Number*</p>
          <input
            type='number'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            placeholder='Phone Number'
            className='form_input'
          />
        </div>
        <div className='mb-5'>
          <p className='form_label'>Bio*</p>
          <input
            type='text'
            name='bio'
            value={formData.bio}
            onChange={handleInputChange}
            placeholder='Your biography'
            className='form_input'
            maxLength={100}
          />
        </div>

        <div className='mb-5'>
          <div className='grid grid-cols-3 gap-5 mb-[30px]'>
            <div>
              <p className='form_label'>Gender*</p>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleInputChange}
                className='form_input'
              >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div>
              <p className='form_label'>Specialization*</p>
              <select
                name='specialization'
                value={formData.specialization}
                onChange={handleInputChange}
                className='form_input'
              >
                <option value=''>Select</option>
                <option value='surgeon'>Surgeon</option>
                <option value='neurologist'>Neurologist</option>
                <option value='dermatologist'>Dermatologist</option>
              </select>
            </div>
            <div>
              <p className='form_label'>Ticket Price*</p>
              <input
                type='number'
                placeholder='100'
                name='ticketPrice'
                value={formData.ticketPrice}
                className='form_input'
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className='mb-5'>
          <p className='form_label'>Qualifications </p>
          {formData.qualifications?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className='grid grid-cols-2 gap-5'>
                    <div>
                      <p className='form_label'>Starting Date*</p>
                      <input
                        type='date'
                        name='startingDate'
                        value={item.startingDate}
                        className='form_input'
                        onChange={(e) => qualificationInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className='form_label'>Ending Date*</p>
                      <input
                        type='date'
                        name='endingDate'
                        value={item.endingDate}
                        className='form_input'
                        onChange={(e) => qualificationInputChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-5 mt-5'>
                    <div>
                      <p className='form_label'>Degree*</p>
                      <input
                        type='text'
                        name='degree'
                        value={item.degree}
                        className='form_input'
                        onChange={(e) => qualificationInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className='form_label'>University*</p>
                      <input
                        type='text'
                        name='university'
                        value={item.university}
                        className='form_input'
                        onChange={(e) => qualificationInputChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteQualification(e, index)}
                    className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            onClick={addQualification}
            className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer '
          >
            Add Qualification
          </button>
        </div>

        <div className='mb-5'>
          <p className='form_label'>Experiences </p>
          {formData.experiences?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className='grid grid-cols-2 gap-5'>
                    <div>
                      <p className='form_label'>Starting Date*</p>
                      <input
                        type='date'
                        name='startingDate'
                        value={item.startingDate}
                        className='form_input'
                        onChange={(e) => experienceInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className='form_label'>Ending Date*</p>
                      <input
                        type='date'
                        name='endingDate'
                        value={item.endingDate}
                        className='form_input'
                        onChange={(e) => experienceInputChange(e, index)}
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-5 mt-5'>
                    <div>
                      <p className='form_label'> Position*</p>
                      <input
                        type='text'
                        name='position'
                        value={item.position}
                        className='form_input'
                        onChange={(e) => experienceInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className='form_label'>Hospital*</p>
                      <input
                        type='text'
                        name='hospital'
                        value={item.hospital}
                        className='form_input'
                        onChange={(e) => experienceInputChange(e, index)}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => deleteExperience(e, index)}
                    className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            onClick={addExperience}
            className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer '
          >
            Add Experience
          </button>
        </div>

        <div className='mb-5'>
          <p className='form_label'>Time Slots </p>
          {formData.timeSlots?.map((item, index) => {
            return (
              <div key={index}>
                <div>
                  <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                    <div>
                      <p className='form_label'>Day*</p>
                      <select
                        name='day'
                        value={item.day}
                        className='form_input'
                        onChange={(e) => timeSlotInputChange(e, index)}
                      >
                        <option value=''>Select</option>
                        <option value='sunday'>Sunday</option>
                        <option value='monday'>Monday</option>
                        <option value='tuesday'>Tuesday</option>
                        <option value='wednesday'>Wednesday</option>
                        <option value='thursday'>Thursday</option>
                        <option value='friday'>Friday</option>
                        <option value='saturday'>Saturday</option>
                      </select>
                    </div>
                    <div>
                      <p className='form_label'>Starting Time*</p>
                      <input
                        type='time'
                        name='startingTime'
                        value={item.startingTime}
                        className='form_input'
                        onChange={(e) => timeSlotInputChange(e, index)}
                      />
                    </div>
                    <div>
                      <p className='form_label'>Ending Time*</p>
                      <input
                        type='time'
                        name='endingTime'
                        value={item.endingTime}
                        className='form_input'
                        onChange={(e) => timeSlotInputChange(e, index)}
                      />
                    </div>
                    <div className='flex items-center'>
                      <button
                        onClick={(e) => deleteTimeSlot(e, index)}
                        className='bg-red-600 p-2 rounded-full text-white text-[18px] mb-[30px] cursor-pointer mt-10'
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={timeSlot}
            className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer '
          >
            Add TimeSlot
          </button>
        </div>

        <div className='mb-5'>
          <p className='form_label'>About</p>
          <textarea
            name='about'
            rows='5'
            value={formData.about}
            placeholder='Write about you'
            onChange={handleInputChange}
            className='form_input'
          ></textarea>
        </div>

        <div className='mb-5 flex items-center gap-3'>
          {formData.photo && (
            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
              <img
                src={formData.photo}
                alt='Avatar'
                className='w-full rounded-full'
              />
            </figure>
          )}

          <div className='relative w-[130px] h-[50px]'>
            <input
              ref={fileInputRef}
              type='file'
              name='photo'
              id='customerFile'
              accept='.jpg, .png'
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
              onChange={handlePhotoSelection}
            />

            <label
              htmlFor='customerFile'
              className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
            >
              Upload Photo
            </label>
          </div>
        </div>

        <div className='mt-7'>
          <button
            type='submit'
            onClick={updateDoctorProfileHandler}
            className='bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
