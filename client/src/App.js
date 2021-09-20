import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login/login";
import DoctorDetails from "./components/doctordetails/doctordetails";
import Doctor from "./components/Doctor/Doctor";
import Info from "./components/doctorinfo/doctorinfo";
import Navigation from "./components/navigation";
import DoctorProfile from "./components/doctor_profile/doctor_profile";
import SignUp from "./components/signUp/signUp";
import Date from "./components/date/date";
import AdminPage from "./components/AdminPage";
import Accept from "./components/Admin/admin";
import Profile from "./components/profile/profile";
import AddStory from "./components/profile/addstory";
import Home from "./components/Home";
import UpdateDoctorProfile from "./components/doctor_profile/updateDoctorProfile";
import FoodTracker from "./components/profile/foodtracker";
import Schedule from "./components/schedule/schedule";
import CreateStories from "./components/storie";
import AcceptDoctor from "./components/AcceptDoctor";
import Booking from "./components/bookingschedule/bookingschedule";
import About from "./components/aboutus/about";
import UpdateUserInfo from "./components/profile/updateuserinfo";
import { useState } from "react";
import MyPatient from "./components/mypatint/mypatint";
import MyDoctor from "./components/mydoctor/mydoctor";
import Patient from "./components/mypatint/patient";
import Conversation from "./components/conversation/conversation";
import Payment from "./components/payment/PaymentForm";
import StripeContainer from "./components/payment/StripeContainer";
import Recipe from "./components/recipe";
import BMI from "./components/BMI";

import UserSchedule from "./components/schedule/user";

import Video from "./components/conversation/video";
const App = () => {
  const [homePageSection, setHomePageSection] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentReceiver, setPaymentReceiver] = useState("");
  const [price, setPrice] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState(null);
  return (
    <>
      <div className="App">
        <Navigation setHomePageSection={setHomePageSection} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                homePageSection={homePageSection}
                setHomePageSection={setHomePageSection}
              />
            )}
          />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route
            exact
            path="/doctor/:id"
            render={() => (
              <DoctorDetails
                setPaymentId={setPaymentId}
                setPaymentReceiver={setPaymentReceiver}
                setPrice={setPrice}
              />
            )}
          />

          <Route exact path="/admin" render={() => <Accept />} />
          <Route exact path="/doctor" render={() => <Doctor />} />
          <Route exact path="/register" render={() => <SignUp />} />
          <Route exact path="/doctorProfile" render={() => <DoctorProfile />} />
          <Route exact path="/addyourstory" render={() => <AddStory />} />
          <Route exact path="/schedule/:id" render={() => <Schedule />} />
          <Route
            exact
            path="/editProfile"
            render={() => <UpdateDoctorProfile />}
          />
          <Route exact path="/foodtracker" render={() => <FoodTracker />} />
          <Route
            exact
            path="/create/stories"
            render={() => <CreateStories />}
          />
          <Route exact path="/adminPage" render={() => <AdminPage />} />
          <Route exact path="/accept" render={() => <Accept />} />
          <Route exact path="/doctorInfo" render={() => <Info />} />
          <Route
            exact
            path="/accept/doctor/:doctor_id"
            render={() => <AcceptDoctor />}
          />
          <Route exact path="/date" render={() => <Date />} />
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/edit/profile" render={() => <UpdateUserInfo />} />
          <Route
            exact
            path="/mypatient"
            render={() => (
              <MyPatient
                setSender={setSender}
                setReceiver={setReceiver}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setImg={setImg}
              />
            )}
          />

          <Route
            exact
            path="/mydoctor"
            render={() => (
              <MyDoctor
                setSender={setSender}
                setReceiver={setReceiver}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setImg={setImg}
              />
            )}
          />
          <Route exact path="/patient/:id" render={() => <Patient />} />
          <Route exact path="/booking" render={() => <Booking />} />
          <Route
            exact
            path="/conversation"
            render={() => (
              <Conversation
                sender={sender}
                receiver={receiver}
                firstName={firstName}
                lastName={lastName}
                img={img}
                setVideo={setVideo}
              />
            )}
          />
          <Route
            exact
            path="/payment"
            render={() => (
              <StripeContainer
                paymentId={paymentId}
                paymentReceiver={paymentReceiver}
                price={price}
              />
            )}
          />

          <Route exact path="/recipe" render={() => <Recipe />} />
          <Route exact path="/bmi" render={() => <BMI />} />

          <Route exact path="/userSchedule" render={() => <UserSchedule />} />

          <Route exact path="/video" render={() => <Video />} />
        </Switch>
      </div>
    </>
  );
};

export default App;
