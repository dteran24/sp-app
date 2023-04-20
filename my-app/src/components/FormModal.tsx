import { Button, ListGroup, Modal } from "react-bootstrap";
import { FormData } from "../models/formData";
interface ModalProps {
  form: FormData;
  show: boolean;
  onHide: () => void;
}
function FormModal({ show, onHide, form }: ModalProps) {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
    >
      <Modal.Body>
        <div>
          <h2>Student Information</h2>
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
          <Button onClick={onHide}>Close</Button>
          <div>
            <Button variant="success" className="me-3" onClick={onHide}>
              Accept
            </Button>
            <Button variant="danger" onClick={onHide}>
              Deny
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default FormModal;
