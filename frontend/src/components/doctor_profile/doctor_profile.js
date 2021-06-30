import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setData} from "../../reducers/doctorProfile";
import { useHistory } from "react-router-dom";
let token = localStorage.getItem("token");
const DoctorProfile = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  useEffect(() => {
    axios
      .get("http://localhost:5000/doctor/details", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log("77777777777777777",result)
       
        
        setFirstName(result.data[0].firstName);
        setLastName(result.data[0].lastName);
        setAge(result.data[0].age);
        setImg(result.data[0].img);
        setPrice(result.data[0].price);
        setEmail(result.data[0].email);
        setPassword(result.data[0].password);
        dispatch(setData(result.data[0]))
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div className="profile_page">
        <h3 style={{ float: "left" }}>FirstName :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="firstName here"
          defaultValue={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />

        <h3>LastName :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="LastName here "
          defaultValue={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <h3>Image :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="image here "
          defaultValue={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
        />
        <h3>Email :</h3>
        <input
          className="inputs"
          type="text"
          placeholder="email here"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h3>Age :</h3>
        <input
          className="inputs"
          type="number"
          placeholder="Age here"
          defaultValue={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <h3>Password :</h3>
        <input
          className="inputs"
          type="password"
          placeholder="password here"
          defaultValue={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <h3>Price :</h3>
        <input
          className="inputs"
          type="number"
          placeholder="Price here"
          defaultValue={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <button onClick={()=>{history.push("/editProfile")}}>edit</button>
      </div>
    </>
  );
};

export default DoctorProfile;
