import React, { Component } from "react";
import { auth } from "../services/firebase";
import "../css/chat.css";
import ChatMsg from "./chatMsg";
import "../css/chatmsg.css";
import sendEffect from "../audios/note.mp3";
import recievedEffect from "../audios/gotmsg.mp3";
import socketIOClient from "../services/socket";
import { names } from "../names";

class Chat extends Component {
  async componentDidMount() {
    const { allMessages } = this.state;
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on("msg", (data) => {
      let temp = allMessages;
      temp.push(data);
      this.setState(temp);
      window.scrollTo(0, document.body.scrollHeight);
      if (data.uid !== auth().currentUser.uid) {
        let audio = new Audio(recievedEffect);
        audio.play();
      }
    });
    this.socket.emit("newUser", { mail: auth().currentUser.displayName });

    this.setState({ isVerifiedUser: auth().currentUser.emailVerified });
    if (auth().currentUser.photoURL === null && auth().currentUser) {
      auth().currentUser.updateProfile({
        photoURL: `https://picsum.photos/id/${this.randomNumberInRange(
          1000,
          1
        )}/100/100`,
      });
    }

    if (auth().currentUser.displayName === null && auth().currentUser) {
      auth().currentUser.updateProfile({
        displayName: names[this.randomNumberInRange(4945, 0)],
      });
    }
  }

  state = {
    isVerifiedUser: false,
    msg: "",
    allMessages: [],
    btndisabled: true,
    endpoint: "http://localhost:5000/",
  };

  render() {
    return (
      <div className="main-model">
        <div className="all-msgs">
          {this.state.allMessages.map((data, i) => {
            if (data.uid === auth().currentUser.uid) {
              return (
                <ChatMsg what="sent" msg={data.msg} key={i} image={data.img} />
              );
            }
            return (
              <ChatMsg
                what="recieved"
                msg={data.msg}
                key={i}
                image={data.img}
              />
            );
          })}
        </div>
        <div className="text-msg">
          <input
            type="text"
            onChange={(e) => this.handelInputChange(e.target.value)}
            className="msg-input"
            value={this.state.msg}
            onKeyDown={this._handleKeyDown}
          />
          <button
            className="send-msg"
            disabled={this.state.btndisabled}
            onClick={this.handelSubmit}
          >
            <i className="far fa-paper-plane"></i>
          </button>
        </div>
      </div>
    );
  }

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handelSubmit();
    }
  };

  handelInputChange = (e) => {
    this.setState({ msg: e });
    if (e.trim() === "" || e.length === 0) {
      this.setState({ btndisabled: true });
    } else {
      this.setState({ btndisabled: false });
    }
  };

  handelSubmit = async () => {
    if (!this.state.isVerifiedUser) return alert("Plz Verify Your Email");
    const { msg, btndisabled } = this.state;
    if (btndisabled) return;
    this.socket.emit("chatMessage", {
      img: auth().currentUser.photoURL,
      msg,
      uid: auth().currentUser.uid,
    });
    this.setState({ msg: "" });
    let audio = new Audio(sendEffect);
    audio.play();
  };

  randomNumberInRange(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

export default Chat;
