import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { Form, Button } from "react-bootstrap";
import { FormData, Country } from "../models/formData";
import {
  NAME_VALIDATION,
  REGISTER_VALIDATION,
  EMAIL_VALIDATION,
  ZIP_VALIDATION,
  CITY_VALIDATION,
  MOBILE_VALIDATION,
  generateRegistrationId,
} from "../util/validations";
import { CheckCircle, XCircle } from "react-bootstrap-icons";
import countries from "../data/countries.json";
import { editForm } from "../services/ApiHandler";

interface EditFormProps {
  queryData: FormData;
}

const EditForm = ({ queryData }: EditFormProps) => {
  const [validated, setValidated] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [status, setStatus] = useState({
    complete: false,
    message: "Form updated!",
  });
  const [formData, setFormData] = useState<FormData>(queryData);
  const [registrationID] = useState(formData.registrationID);
  const newRegistrationID = generateRegistrationId();

  //disable dropdown till country is filled out
  const disableDropDownHandler = () => {
    if (formData.country === "" || formData.country == null) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      console.log("calling put method");
      editForm(registrationID, formData)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            console.log("successs")
            setStatus((s) => ({
              ...s,
              complete: true,
              message: "Form Updated!",
            }));
          }
        })
        .catch((error: AxiosError) => {
          if (error.response?.status === 500) {
            setStatus((s) => ({
              ...s,
              complete: false,
              message: " Server Error",
            }));
          }
        });
    }
    setFormSubmitted(false);
  }, [formData, formSubmitted, registrationID]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((f) => ({ ...f, [event.target.id]: event.target.value }));
  };

  const handleStateOption = (country: string) => {
    const userInput = country.toLocaleLowerCase();
    return countries.countries.find((country: Country) =>
      country.country.toLocaleLowerCase().includes(userInput)
    );
  };
  // update submit status once validated
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setFormSubmitted(false);
    } else {
      setFormData({ ...formData, registrationID: newRegistrationID });
      setFormSubmitted(true);
    }

    setValidated(true);
  };
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

        <Form.Group className="mb-3" controlId="studentName">
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

        <Form.Group className="mb-3" controlId="studentRegisterNumber">
          <Form.Label>Student Register Number</Form.Label>
          <Form.Control
            required
            pattern={REGISTER_VALIDATION}
            type="text"
            placeholder="R-xxx.xxx"
            value={formData.studentRegisterNumber}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid format
          </Form.Control.Feedback>
        </Form.Group>
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                as="select"
                type="select"
                placeholder="Country"
                onChange={handleChange}
                value={formData.country}
              >
                {countries.countries.map((country: Country, index) => {
                  return (
                    <option key={index} value={country.country}>
                      {country.country}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 ps-4" controlId="state">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                required
                disabled={disableDropDownHandler()}
                as="select"
                type="select"
                onChange={handleChange}
                value={formData.state}
              >
                {handleStateOption(formData.country)?.states.map(
                  (state, index) => {
                    return (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    );
                  }
                )}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>Email Address</Form.Label>
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
            status.message === "Form Updated!" ? (
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
};
export default EditForm;
