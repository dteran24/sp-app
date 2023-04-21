import axios from "axios";
import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FormData } from "../models/formData";
import { BASE_URL } from "../util/validations";
import FormModal from "./FormModal";

interface FormsProps{
  forms: FormData[];
  setForms: React.Dispatch<React.SetStateAction<FormData[]>>
}
function Forms({forms, setForms} : FormsProps) {
  
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    applicationStatus: "",
    registrationID: "",
    parentName: "",
    studentName: "",
    studentAge: "",
    studentRegisterNumber: "",
    registrationDate:"",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    state: "",
    emailAddress: "",
    primaryContactPerson: "",
    primaryContactMobile: "",
    secondaryContactPerson: "",
    secondaryContactMobile: "",
  });
  

    useEffect(() => {
        if (submitted) {
            axios
            .get(BASE_URL)
            .then((response) => {
              setForms(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.status);
            });
        }
        setSubmitted(false);
   
  }, [forms, submitted]);
  const handleModal = (data: FormData) => {
      setForm(data);
      setModalShow(true);
  };
  return (
    <div className="d-flex justify-content-center">
      <ListGroup className="w-50" as="ol">
        {forms?.map((form: FormData) => {
          return (
            <ListGroup.Item
              action
              className="d-flex justify-content-between"
              as="li"
              key={form.registrationID}
              onClick={() => handleModal(form)}
            >
              <span>{`Register Number: ${form.studentRegisterNumber}`}</span>
              <span>{`Student: ${form.studentName}`}</span>
              <span>{`Form Status: ${form.applicationStatus}`}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
              form={form}
              submitted={submitted}
              setSubmitted={setSubmitted}
              
      />
    </div>
  );
}
export default Forms;
