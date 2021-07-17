import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./conversation.css";

let socket;
const CONNECTION_PORT = "http://localhost:5000";
socket = io(CONNECTION_PORT);

const Conversation = (props) => {
  const history = useHistory();
  const { sender, receiver, firstName, lastName, img, setVideo } = props;

  const userId = localStorage.getItem("user_id");
  const [result, setResult] = useState([]);

  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [firstNameUse, setFirstName] = useState(firstName);
  const [lastNameUse, setLastName] = useState(lastName);
  const [imgUse, setImgUse] = useState(img);

  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  useEffect(() => {});
  const connectToRoom = () => {
    socket.emit("join_room", room);
  };
  const sendMessage = () => {
    const messageContent = {
      room,
      message,
    };

    socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.message]);
    axios
      .post(`http://localhost:5000/conversation/message`, {
        message,
        id: userId,
        room,
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .post(`http://localhost:5000/conversation/con`, { sender, receiver })
      .then((result) => {
        setRoom(result.data.conversation.conversation[0].id);
        setResult(result.data.result.result);
        setVideo(result.data.conversation.conversation[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [messageList]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  connectToRoom();
  return (
    <div className="conversation-pa">
      <div className="user-i">
        <div className="info-user">
          <img src={imgUse} />
          <p>
            {firstNameUse} {lastNameUse}
          </p>

          <svg className="video-img" style={{marginLeft:"45rem"}}
            onClick={() => {
              history.push("/video");
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-camera-video"
            viewBox="0 0 16 16"
            color="white"
            cursor="pointer"
            
          >
            <path
              fill-rule="evenodd"
              d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
            />
          </svg>
        </div>
      </div>
      <div className="conversation">
        <div className="">
          {result &&
            result.map((val, i) => {
              if (val.id_sender == userId) {
                return (
                  <div className="width" key={i}>
                    <div className={"message-right"}>
                      <p className="message-r" ref={scrollRef}>
                        {val.message}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="width" key={i}>
                    <div className={"message-left"}>
                      <p className="message-l" ref={scrollRef}>
                        {val.message}
                      </p>
                    </div>
                  </div>
                );
              }
              // }
            })}
        </div>
      </div>
      <div className="input-message">
        <input
          style={{ margin: "auto" }}
          type="text"
          placeholder="write you message ..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        {/* <img src="https://img.icons8.com/ios-glyphs/30/000000/filled-sent.png" /> */}
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Conversation;
