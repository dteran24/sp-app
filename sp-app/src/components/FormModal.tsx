import { Button, Modal } from "react-bootstrap";
import { FormData } from "../models/formData";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import { editForm } from "../services/ApiHandler";
interface ModalProps {
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormData;
  show: boolean;
  onHide: () => void;
}
function FormModal({ show, onHide, form, setSubmitted }: ModalProps) {
  const [userForm, setUserForm] = useState<FormData>(form);
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState({
    complete: false,
    message: "Request Complete!",
  });

  //update api once submitted
  useEffect(() => {
    if (submit) {
      editForm(form.registrationID, userForm)
        .then((response) => {
          if (response.status === 200) {
            setSubmitted(true);
            setStatus( s => ({
              ...s,
              complete: true,
              message: "Request Complete!",
            }));
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            setSubmitted(false);
            setStatus(s => ({ ...s, complete: true, message: "Server error!" }));
          }
          
        });
    }
    setSubmit(false);
  }, [form.registrationID, setSubmitted, submit, userForm]);

  // hide modal and pause state change 
  const handleModal = () => {
    onHide();
    setTimeout(() => {
      setStatus( s => ({ ...s, complete: false }));
    }, 500);
  };

  //approve or deny app based off the button
  const setSubmitStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText = event.currentTarget.textContent;
    if (buttonText !== "Accept") {
      setUserForm({ ...form, applicationStatus: "Denied" });
    } else {
      setUserForm({ ...form, applicationStatus: "Approved" });
    }

    setSubmit(true);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Body>
        <div>
          <h2>Parent Information</h2>
          <div className="d-flex flex-row justify-content-around">
            <div className="d-flex flex-column">
              <h6 className="mb-0">Student Name</h6>
              <span>{form.studentName}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mb-0">Parent Name</h6>
              <span>{form.parentName}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mb-0">Address</h6>
              <span>{form.address}</span>
              <span>{`${form.city}, ${form.state} ${form.zipCode}`}</span>
              <span>{form.country}</span>
            </div>
          </div>
        </div>
        <div>
          <h2>Contact Information</h2>
          <div className="d-flex flex-row justify-content-around">
            <div className="d-flex flex-column">
              <h6 className="mb-0">Email Address</h6>
              <span>{form.emailAddress}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mb-0">Primary Contact</h6>
              <span>{form.primaryContactPerson}</span>
              <span>{form.primaryContactMobile}</span>
            </div>
            <div className="d-flex flex-column">
              <h6 className="mb-0">Secondary Contact</h6>
              <span>{form.secondaryContactPerson}</span>
              <span>{form.secondaryContactMobile}</span>
            </div>
          </div>
        </div>

        <div className=" d-flex justify-content-between mt-3">
          <Button onClick={handleModal}>Close</Button>
          {status.complete ? (
            status.message === "Request Complete!" ? (
              <div className="d-flex align-items-center">
                <span className="fw-bold me-2 fs-4">{status.message}</span>
                <CheckCircle size={28} color="green" />
              </div>
            ) : (
              <span className="fw-bold me-4 fs-4">
                {status.message}
                <XCircle className="ms-2" color="red" />
              </span>
            )
          ) : (
            <div>
              <Button
                variant="success"
                className="me-3"
                onClick={(e) => setSubmitStatus(e)}
              >
                Accept
              </Button>
              <Button variant="danger" onClick={(e) => setSubmitStatus(e)}>
                Deny
              </Button>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FormModal;
