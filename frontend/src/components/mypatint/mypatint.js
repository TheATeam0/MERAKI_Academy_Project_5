import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mypatint.css";
import { Button, Card } from "react-bootstrap";

const MyPatient = ({
  setSender,
  setReceiver,
  setFirstName,
  setLastName,
  setImg,
}) => {
  let token = localStorage.getItem("token");

  const history = useHistory();

  const [result, setResult] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/mypatient", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        setResult(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

    <div className="my-patient">
      {result.map((element, index) => {
        console.log(element);
        return (
          <div className="patient-Card">
            <Card style={{ width: "18rem" ,boxShadow:"0.5px 0.5px 0.5px 0.5px rgb(209, 209, 209)",margin:"25px 0 0 0"}}>
              <Card.Img
                variant="top"
                src={element.img}
                style={{
                  
                  width: "17.9rem",
                  height: "20rem",
                  transition: "width 2s, height 4s",
                }}
              />
              <Card.Body style={{ backgroundColor: "#ffffff" }}>
                <Card.Title style={{color:"#52585c"}} >
                  {element.firstName} {element.lastName}
                </Card.Title>
                <Card.Title style={{color:"#52585c"}}>Age: {element.age}</Card.Title>
                <Card.Text></Card.Text>
                <Button id="food-btn"
                  variant="primary"
                  onClick={() => {
                    history.push(`./../patient/${element.user_id}`);
                  }}
                  style={{ backgroundColor: "#86cb6a", border: "none" }}
                >    
                  Tracker Food
                </Button>
                <Button id="chat-btn"
                  variant="primary"
                  onClick={() => {
                    setSender(element.user_id);
                    setReceiver(element.doctor_id);
                    setFirstName(element.firstName);
                    setLastName(element.lastName);
                    setImg(element.img);
                    console.log(element.user_id);
                    console.log(element.doctor_id);
                    history.push("/conversation");
                  }}
                  style={{ backgroundColor: "#86cb6a", border: "none",marginLeft:"5.5%",width:"125px"}}
                >
                  Chat
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default MyPatient;
