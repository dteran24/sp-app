import { useState } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { FormData } from '../models/formData';

function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    studentName: '',
    studentRegisterNumber: '',
    address: '',
    city:'',
    zipCode: '',
    country: '',
    state:'',
    emailAddress: '',
    primaryContactPerson: '',
    primaryContactMobile: '',
    secondaryContactPerson:'',
    secondaryContactMobile: '',
  })
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.id]: event.target.value})
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    
  }
  
  return (
    <div className="d-flex justify-content-center">
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="parentName">
          <Form.Label>Parent Name</Form.Label>
          <Form.Control type="text" value={formData.parentName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control type="text" value={formData.studentName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentRegisterNumber">
          <Form.Label>Student Register Number</Form.Label>
          <Form.Control type="text" placeholder="R-xxx.xxx" value={formData.studentRegisterNumber} onChange={handleChange} />
        </Form.Group>
        <div>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Student Address</Form.Label>
            <Form.Control type="text" value={formData.address} onChange={handleChange}/>
          </Form.Group>
          <div className="d-flex flex-row justify-content-between">
            <Form.Group className="mb-3 w-50" controlId="city">
              <Form.Control type="text" placeholder="City" value={formData.city} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="zipCode">
              <Form.Control type="text" placeholder="Zip/Postal" value={formData.zipCode} onChange={handleChange} />
            </Form.Group>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <Form.Group className="mb-3 w-75" controlId="country">
              <Form.Control type="text" placeholder="Country" value={formData.country} onChange={handleChange} />
            </Form.Group>
            
            <DropdownButton
              title='State'
              id='state'
              onSelect={(e) => setFormData({...formData, state: e})}
          >
            <Dropdown.Item eventKey="Texas">Texas</Dropdown.Item>
            <Dropdown.Item eventKey="California">California</Dropdown.Item>
            <Dropdown.Item eventKey="Washington">Washington</Dropdown.Item>
          </DropdownButton>
          </div>
        </div>

        <Form.Group className="mb-3" controlId="emailAddress">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="example@gmail.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="primaryContactPerson">
          <Form.Label>Primary Contact</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="primaryContactMobile">
          <Form.Label>Primary Contact Mobile</Form.Label>
          <Form.Control type="text" placeholder="xxx-xxx-xxxx"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="secondaryContactPerson">
          <Form.Label>Secondary Contact</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="secondaryContactMobile">
          <Form.Label>Secondary Contact Mobile</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <div className="d-flex justify-content-center mb-3">

        <Button variant="primary" type="submit">
          Submit
          </Button>
          </div>
      </Form>
    </div>
  );
}
export default SignupForm;
