import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "./../../reducers/doctorProfile";
import { useHistory } from "react-router-dom";

const UpdateDoctorProfile = () => {
  const profile = useSelector((state) => {
    return { doctor: state.doctorProfile.data };
  });

  let token = localStorage.getItem("token");

  const [firstName, setFirstName] = useState(profile.doctor.firstName);
  const [lastName, setLastName] = useState(profile.doctor.lastName);
  const [age, setAge] = useState(profile.doctor.age);
  const [img, setImg] = useState(profile.doctor.img);
  const [price, setPrice] = useState(profile.doctor.price);
  const [email, setEmail] = useState(profile.doctor.email);
  const [description, setDescription] = useState(profile.doctor.description);

  const [Qualifications, setQualifications] = useState(
    profile.doctor.Qualifications
  );
  const [practicalExperiences, setPracticalExperiences] = useState(
    profile.doctor.practicalExperiences
  );
  const data = JSON.parse(localStorage.getItem("profile-data"));
  const dispatch = useDispatch();

  const editProfile = () => {
    axios
      .put(
        "http://localhost:5000/doctor/details",

        {
          firstName,
          lastName,
          age,
          img,
          price,
          email,
          description,
          Qualifications,
          practicalExperiences,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        setFirstName(profile.doctor.firstName);
        setLastName(profile.doctor.lastName);
        setAge(profile.doctor.age);
        setImg(profile.doctor.img);
        setPrice(profile.doctor.price);
        setEmail(profile.doctor.email);
        setDescription(profile.doctor.description);
        setQualifications(profile.doctor.Qualifications);
        setPracticalExperiences(profile.doctor.practicalExperiences);
        dispatch(updateData(result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="profile_page">
        <h3>FirstName :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="firstName here"
          defaultValue={data.firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <h3>LastName :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="LastName here "
          defaultValue={data.lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <h3>Image :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="image here "
          defaultValue={data.img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <h3>Email :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="email here"
          readOnly
          defaultValue={data.email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h3>Age :</h3>
        <input
          className="inputs"
          type="number"
          placeholder="Age here"
          defaultValue={data.age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <h3>Price :</h3>
        <input
          className="inputs"
          type="number"
          placeholder="Price here"
          defaultValue={data.price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <h3>Description :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="description here"
          defaultValue={data.description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h3>Qualifications :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="qualifications here"
          defaultValue={data.Qualifications}
          onChange={(e) => {
            setQualifications(e.target.value);
          }}
        />
        <h3>PracticalExperiences :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="practicalExperiences here"
          defaultValue={data.practicalExperiences}
          onChange={(e) => {
            setPracticalExperiences(e.target.value);
          }}
        />
        <button onClick={editProfile}>Edit Profile</button>
      </div>
    </>
  );
};
export default UpdateDoctorProfile;
