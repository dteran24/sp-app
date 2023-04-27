import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Table } from "react-bootstrap";
import { FormData } from "../models/formData";
import FormModal from "./FormModal";
import { getAllForms } from "../services/ApiHandler";
import { XCircle } from "react-bootstrap-icons";
interface FormsProps {
  forms: FormData[];
  setForms: React.Dispatch<React.SetStateAction<FormData[]>>;
}
function Forms({ forms, setForms }: FormsProps) {
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
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

  //call api when updated in modal
  useEffect(() => {
    if (submitted) {
     getAllForms()
       .then((response: AxiosResponse) => {
         if (response.status === 200) {
           setForms(response.data);
           setError(false);
          }
          
        })
       .catch((error: AxiosError) => {
         if (error.response?.status === 500) {
            setError(true)
          }
          
        });
    }
    setSubmitted(false);
  }, [forms, setForms, submitted]);
  const handleModal = (data: FormData) => {
    setForm(data);
    setModalShow(true);
  };


  return (
    <div className="d-flex justify-content-center">
      {error ? <h2 className="fs-4">"Server error!" <XCircle className="ms-2" color="red" /></h2> : <Table striped bordered hover className="mx-5">
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
                <td className="w-25">{form.applicationStatus}</td>
              </tr>
            )
          })}
      </tbody>
    </Table>}
      
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
