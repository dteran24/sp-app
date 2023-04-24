import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormData } from "../models/formData";
import {
  NAME_VALIDATION,
  REGISTER_VALIDATION,
  EMAIL_VALIDATION,
  ZIP_VALIDATION,
  CITY_VALIDATION,
  MOBILE_VALIDATION,
  generateRegistrationId,
  AGE_VALIDATION,
} from "../util/validations";
import states from "../data/states.json";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import { submitForm } from "../services/ApiHandler";

function SignupForm() {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [status, setStatus] = useState({
    complete: false,
    message: "Form Submitted!",
  });

  const [formData, setFormData] = useState<FormData>({
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
  const today = new Date().toISOString().split("T")[0];

  const disableDropDownHandler = () => {
    if (formData.country === "" || formData.country == null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      submitForm(formData)
        .then((response) =>
          setStatus({ ...status, complete: true, message: "Form Submitted!" })
        )
        .catch((error) =>
          setStatus({ ...status, complete: true, message: "Server Error!" })
        );
    }
    setFormSubmitted(false);
  }, [formData, formSubmitted]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setFormSubmitted(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setFormSubmitted(false);
      console.log("inside false");
    } else {
      setFormSubmitted(true);
      setFormData({
        ...formData,
        registrationID: generateRegistrationId(),
        applicationStatus: "Submitted",
      });
    }

    setValidated(true);
  };
  console.log("submitted Form", formData);

  return (
    <div className="d-flex justify-content-center">
      <Form
        className="w-50"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="parentName">
          <Form.Label>Parent Name</Form.Label>
          <Form.Control
            required
            pattern={NAME_VALIDATION}
            type="text"
            value={formData.parentName}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid name
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex flex-row justify-content-between">
          <Form.Group className="mb-3 w-75" controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              required
              pattern={NAME_VALIDATION}
              type="text"
              value={formData.studentName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="w-25 ms-3" controlId="studentAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              required
              pattern={AGE_VALIDATION}
              type="text"
              value={formData.studentAge}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Age must be 4 years or older
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <Form.Group className="mb-3 w-75" controlId="studentRegisterNumber">
            <Form.Label>Student Register Number</Form.Label>
            <Form.Control
              required
              pattern={REGISTER_VALIDATION}
              type="text"
              placeholder="R-ABC.123"
              value={formData.studentRegisterNumber}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid format
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="w-25 ms-3" controlId="registrationDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              min={today}
              type="date"
              placeholder="R-ABC.123"
              value={formData.registrationDate}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid format
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Student Address</Form.Label>
            <Form.Control
              required
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex flex-row justify-content-between">
            <Form.Group className="mb-3 w-50" controlId="city">
              <Form.Control
                required
                pattern={CITY_VALIDATION}
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a city
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Control
                required
                pattern={ZIP_VALIDATION}
                type="text"
                placeholder="Zip/Postal"
                value={formData.zipCode}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a 6-digit zip code
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Form.Group className="mb-3 w-75" controlId="country">
              <Form.Control
                required
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="state">
              <Form.Control
                required
                disabled={disableDropDownHandler()}
                as="select"
                type="select"
                placeholder="Country"
                onChange={handleChange}
              >
                {formData.country.toLowerCase() === "united states" ? (
                  states.states.map((state) => {
                    return <option value={state}>{state}</option>;
                  })
                ) : formData.country.toLowerCase() === "canada" ? (
                  states.provinces.map((province) => {
                    return <option value={province}>{province}</option>;
                  })
                ) : (
                  <>
                    <option value=""> </option>
                    <option value="notFound">Not Found</option>
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            pattern={EMAIL_VALIDATION}
            type="text"
            placeholder="example@gmail.com"
            value={formData.emailAddress}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="primaryContactPerson">
          <Form.Label>Primary Contact</Form.Label>
          <Form.Control
            required
            pattern={NAME_VALIDATION}
            type="text"
            value={formData.primaryContactPerson}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="primaryContactMobile">
          <Form.Label>Primary Contact Mobile</Form.Label>
          <Form.Control
            required
            pattern={MOBILE_VALIDATION}
            type="text"
            value={formData.primaryContactMobile}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a 10-digit phone number
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="secondaryContactPerson">
          <Form.Label>Secondary Contact</Form.Label>
          <Form.Control
            required
            type="text"
            pattern={NAME_VALIDATION}
            value={formData.secondaryContactPerson}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="secondaryContactMobile">
          <Form.Label>Secondary Contact Mobile</Form.Label>
          <Form.Control
            required
            pattern={MOBILE_VALIDATION}
            type="text"
            value={formData.secondaryContactMobile}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a 10-digit phone number
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">
          {status.complete ? (
            status.message === "Form Submitted!" ? (
              <div className="d-flex align-items-center">
                <span className="fw-bold me-2 fs-4">{`${status.message} Registration ID ${formData.registrationID}`}</span>
                <CheckCircle size={28} color="green" />
              </div>
            ) : (
              <span className="fw-bold me-4 fs-4">
                {status.message}
                <XCircle className="ms-2" color="red" />
              </span>
            )
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
export default SignupForm;
