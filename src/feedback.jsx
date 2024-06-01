import axios from "axios";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Feedback({ isOpen, toggle, userName, conversation }) {
  const [feedback, setFeedback] = useState("");
  const isFeedbackNotEmpty = feedback.trim() !== "";

  const sendFeedback = async () => {
    if (!isFeedbackNotEmpty) {
      return toast.error("Feedback cannot be empty!");
    }
    await axios
      .post("http://localhost:5000/feedback", {
        feedback: feedback,
        user_name: userName,
        conversation: JSON.stringify(conversation)
    })
      .then((res) => {
        toast(res.data.message);
        toggle();
      })
      .catch((error) => {
        toast.error("Failed to send feedback because " + error.message);
      });
    setFeedback("");
  };

  return (
    <MDBModal
      open={isOpen}
      onClose={toggle}
      tabIndex="-1"
      staticBackdrop={isFeedbackNotEmpty}
    >
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalBody>
            <MDBModalTitle>
              Hey! Is there anything you would like to tell us? We would love to
              hear your feedback! 🚀
            </MDBModalTitle>
            <br />
            <textarea
              className="form-control"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here"
              rows="5"
              style={{ resize: "none" }}
            ></textarea>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={() => sendFeedback()}>Send 🩷</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
