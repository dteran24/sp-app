import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormData } from "../models/formData";
import {
  nameValidation,
  registerNumberValidation,
  emailValidation,
  zipValidation,
  cityValidation,
  mobileValidation,
  BASE_URL,
} from "../util/validations";
import states from "../data/states.json";
import axios from "axios";
import { error } from "console";

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
      axios
        .put(`${BASE_URL}/${formData.registrationID}`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.status)
          setStatus({ ...status, complete:true, message:"Form Updated!" })})
        .catch((error) => {
          console.log(error.response.status);
          setStatus({ ...status,complete:false, message: " Server Error" });
        });
    }
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
    } else {
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
            pattern={nameValidation}
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
            pattern={nameValidation}
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
            disabled
            required
            pattern={registerNumberValidation}
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
                pattern={cityValidation}
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
                pattern={zipValidation}
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
                defaultValue={[formData.state]}
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
                    {" "}
                    <option value=""> </option>
                    <option value="notFound">Not Found</option>{" "}
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
            pattern={emailValidation}
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
            pattern={nameValidation}
            type="text"
            value={formData.primaryContactPerson}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="primaryContactMobile">
          <Form.Label>Primary Contact Mobile</Form.Label>
          <Form.Control
            required
            pattern={mobileValidation}
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
            pattern={nameValidation}
            value={formData.secondaryContactPerson}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="secondaryContactMobile">
          <Form.Label>Secondary Contact Mobile</Form.Label>
          <Form.Control
            required
            pattern={mobileValidation}
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
            <p>{status.message}</p>
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
