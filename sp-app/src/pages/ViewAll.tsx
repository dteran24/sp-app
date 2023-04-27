import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import Forms from "../components/Forms";
import { FormData } from "../models/formData";
import { getAllForms } from "../services/ApiHandler";
import { FileEarmarkX } from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

function ViewAll() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("No data at the moment!");

  useEffect(() => {
    setLoading(true);
    getAllForms()
      .then((response: AxiosResponse) => {
        setForms(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          setMessage("Server Error")
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <h1 className="text-center my-4">View all Forms</h1>
      {loading ? (
        <div className="h-50 d-flex flex-column align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : forms.length > 0 ? (
        <Forms forms={forms} setForms={setForms} />
      ) : (
        <div className="h-50 d-flex flex-column align-items-center justify-content-center">
          <div className="border border-warning rounded p-4 text-center">
                <h2 className="text-center">{message}</h2>
            <FileEarmarkX size={42} />
          </div>
        </div>
      )}
    </div>
  );
}
export default ViewAll;
