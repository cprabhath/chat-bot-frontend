// this file included access and display the relevent information from the chatbot server and UI Design
//---------------------------Import Libraries--------------------------//
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import "./App.css";
//---------------------------------------------------------------------//
//------------------------------Main Function--------------------------//
function App() {
  //------------------------Initialize State---------------------------//
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "chatbot",
      message: "Hello! I'm Trip Advisor, how can I help you today? 😊",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const chatEndRef = useRef(null);
  //-------------------------------------------------------------------//

  //---------------------Scroll to the bottom of chat-------------------//
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);
  //-------------------------------------------------------------------//

  //----------------------Function to send message----------------------//
  async function run() {
    //----------------------------If the input field is empty---------------------------//
    if (message === "") {
      return toast("Ask me anything, I'm ready to chat! 😊");
    }
    //----------------------------Get the current time and date---------------------------//
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //-------------------------------------------------------------------------------------//

    //--------------------------Add the user message to the chat history-------------------//
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", message, time: currentTime },
    ]);
    //-------------------------------------------------------------------------------------//

    //----------------------------Clear the input field---------------------------//
    setMessage("");
    //----------------------------------------------------------------------------//

    //--------------------Send the message to the chatbot server-----------------------//
    axios.post("http://localhost:5000/get", { message }).then((res) => {
      //----------------------------Get the current time and date---------------------------//
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      //-------------------------------------------------------------------------------------//

      //--------------------------Add the chatbot response to the chat history-------------------//
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "chatbot", message: res.data.response, time: responseTime },
      ]);
      //-------------------------------------------------------------------------------------//
    });
  }
  //-------------------------------------------------------------------//

  return (
    //-------------------------------Chat Container----------------------------//
    <MDBContainer fluid className="py-4" style={{ backgroundColor: "#eee" }}>
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" lg="8" xl="6">
          <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-center align-items-center p-3">
              <img
                src="https://th.bing.com/th/id/OIP.pXpg-gkTs13ZWqBpnuW06wAAAA?rs=1&pid=ImgDetMain"
                alt="avatar 3"
                style={{ width: "45px", height: "100%", marginRight: "10px" }}
              />
              <p className="mb-0" style={{ fontSize:'25px', fontWeight:'bold', color:'black' }}>Trip Advisor</p>
            </MDBCardHeader>
            <div
              className="scrollbar-light-blue"
              style={{ height: "500px", overflowY: "auto" }}
            >
              <MDBCardBody>
                {/*--------------------------------Display Chats----------------------------*/}
                {chatHistory.map((item, index) => (
                  <div key={index}>
                    {/* //-------------------------------Display User Chat-------------------------------// */}
                    {item.role === "user" ? (
                      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                        <div>
                          <p
                            className="p-2 me-3 mb-1 rounded-3"
                            style={{
                              backgroundColor: "#e3e3e3",
                              color: "#000000",
                              
                            }}
                          >
                            {item.message}
                          </p>
                          <p className="small me-3 mb-3 rounded-3 d-flex justify-content-end time">
                            {item.time}
                          </p>
                        </div>
                        <img
                          src="https://th.bing.com/th/id/OIP.lXFVPWtCGapy0jhBZmUHdAHaHa?rs=1&pid=ImgDetMain"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                      </div>
                    ) : (
                      //-------------------------------End of Display User Chat-------------------------------//
                      //-------------------------------Display Chatbot Chat-------------------------------//
                      <div className="d-flex flex-row justify-content-start">
                        <img
                          src="https://th.bing.com/th/id/OIP.pXpg-gkTs13ZWqBpnuW06wAAAA?rs=1&pid=ImgDetMain"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                          <p className="p-2 ms-3 mb-1 rounded-3 w-75 chat" style={{ backgroundColor: '#afdaff', color:'#2c2c2c' }}>
                            {/* //-------------------------------Type Animation-------------------------------// */}
                            <TypeAnimation
                              sequence={item.message}
                              repeat={1}
                              speed={70}
                              cursor={false}
                            />
                            {/* //---------------------------End of Type Animation----------------------------// */}
                          </p>
                          <p className="small ms-3 mb-3 rounded-3 time">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      //-------------------------------End of Display Chatbot Chat-------------------------------//
                    )}
                    {/* //-------------------------------Scroll to the bottom of chat-------------------------------// */}
                    <div ref={chatEndRef}></div>
                    {/* //-------------------------------------------------------------------------------------------// */}
                  </div>
                ))}
                {/*--------------------------------End of Display Chats----------------------------*/}
              </MDBCardBody>
            </div>
            {/* //-------------------------------Card footer----------------------------// */}
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src="https://th.bing.com/th/id/OIP.lXFVPWtCGapy0jhBZmUHdAHaHa?rs=1&pid=ImgDetMain"
                alt="avatar 3"
                style={{ width: "45px", height: "100%", marginRight: "10px" }}
              />
              {/* //-------------------------------Input Field----------------------------// */}
              <input
                type="text"
                className="form-control form-control-lg"
                id="exampleFormControlInput1"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? run() : null)}
                required={true}
                autoComplete={"off"}
              ></input>
              {/* //---------------------------End of Input Field----------------------------// */}
              <div style={{ marginLeft: "50px" }}></div>
            </MDBCardFooter>
            {/* //-------------------------------End of Card footer----------------------------// */}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    //---------------------------------------------------------------------//
  );
}
//---------------------------------------------------------------------//

//-------------------------------Export App----------------------------//
export default App;
//---------------------------------------------------------------------//
