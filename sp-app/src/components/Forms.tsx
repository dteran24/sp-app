import { useEffect, useState } from "react";
import { ListGroup, Table } from "react-bootstrap";
import { FormData } from "../models/formData";
import FormModal from "./FormModal";
import { getAllForms } from "../services/ApiHandler";

interface FormsProps {
  forms: FormData[];
  setForms: React.Dispatch<React.SetStateAction<FormData[]>>;
}
function Forms({ forms, setForms }: FormsProps) {
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    applicationStatus: "",
    registrationID: "",
    parentName: "",
    studentName: "",
    studentAge: "",
    studentRegisterNumber: "",
    registrationDate: "",
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
     getAllForms()
        .then((response) => {
          setForms(response.data);
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
      <Table striped bordered hover className="mx-5">
      <thead>
        <tr>
          <th>Registration #</th>
          <th>Parent Name</th>
          <th>Student Name</th>
          <th>Status</th>
        </tr>
      </thead>
        <tbody>
          {forms?.map((form) => {
            return (
              <tr style={{cursor:"pointer"}} key={form.registrationID} onClick={() => handleModal(form)}>
                <td>{form.registrationID}</td>
                <td>{form.parentName}</td>
                <td>{form.studentName}</td>
                <td>{form.applicationStatus}</td>
              </tr>
            )
          })}
      </tbody>
    </Table>
      <FormModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        form={form}
        setSubmitted={setSubmitted}
      />
    </div>
  );
}
export default Forms;
