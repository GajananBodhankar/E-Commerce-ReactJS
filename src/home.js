import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPass, setUser, setUsername } from "./Redux";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
const Home = () => {
  const nav = useNavigate();
  const [user, setuser] = useState("");
  const [pwd, setpwd] = useState("");
  const [bool, setBool] = useState(false);
  const [text, setText] = useState("hello");
  const { status, username, password } = useSelector(
    (state) => state.ValidateReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    setpwd(password);
    setuser(username);
    console.log(",", username, password);
  }, []);
  const first = useRef();
  const secondtext = useRef();
  const sub = useRef();
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "lightblue",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "500px",
          width: "300px",
          border: "1px solid black",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          paddingTop: "50px",
          paddingLeft: "70px",
          paddingRight: "70px",
        }}
      >
        <div
          style={{
            fontFamily: "fantasy",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28,
            marginBottom: 30,
          }}
        >
          Login page
        </div>
        <div>
          <input
            value={user}
            type="textarea"
            ref={first}
            onKeyDown={(e) => {
              if (user && e.key == "Enter") {
                secondtext.current.focus();
              }
            }}
            onFocus={() => setText("hello")}
            style={{
              resize: "none",
              fontSize: 22,
              textIndent: "10px",
              fontFamily: "sans-serif  ",
              width: "100%",
              lineHeight: "20px",
              paddingTop: "10px",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
            placeholder="Username"
            onChange={(e) => {
              setuser(e.target.value);
              e.preventDefault();
            }}
          />
        </div>
        <div>
          <input
            type="textarea"
            ref={secondtext}
            value={pwd}
            maxLength={10}
            onFocus={() => setText("hello")}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              resize: "none",
              fontSize: 22,
              textIndent: "10px",
              fontFamily: "sans-serif  ",
              width: "100%",
              lineHeight: "20px",
              paddingTop: "10px",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
            placeholder="Password"
            onChange={(e) => {
              setpwd(e.target.value);
              e.preventDefault();
            }}
          />
        </div>
        {text.length > -1 && (
          <div
            style={{
              alignSelf: "center",
              color:
                text === "Invalid credentials" ||
                text === "Enter all detials correctly"
                  ? "red"
                  : "white",
              fontSize: 18,
              paddingTop: 10,
            }}
          >
            {text}
          </div>
        )}
        <input
          ref={sub}
          type="button"
          style={{
            alignSelf: "center",
            border: "1px solid grey",
            padding: "3px",
            paddingRight: 30,
            paddingLeft: 30,
            backgroundColor: "#0589f2",
            color: "white",
            marginTop: 30,
            fontSize: 22,
          }}
          value={"Submit"}
          onClick={async (event) => {
            dispatch(setUser("loading̦"));
            setBool(true);
            await axios
              .post("https://fakestoreapi.com/auth/login", {
                username: user,
                password: pwd,
              })
              .then((e) => {
                event.preventDefault();
                dispatch(setPass(pwd));
                dispatch(setUsername(user));
                dispatch(setUser("Successful"));
                setBool(false);
                nav("/products");
              })
              .catch((e) => {
                event.preventDefault();
                console.log(e);
                setBool(false);
                dispatch(setUser("failed"));
                if (user && pwd) {
                  setText("Invalid credentials");
                } else {
                  setText("Enter all detials correctly");
                }
              });
          }}
        />

        <div style={{ alignSelf: "center", marginTop: 20 }}>
          {bool && (
            <ReactLoading
              height={30}
              width={30}
              color="#0589f2"
              type={"balls"}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
