import { screen, render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect,  } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import FormModal from "../../components/FormModal";
import { Dispatch, SetStateAction } from "react";
import { FormData } from "../../models/formData";

expect.extend(matchers);

const mockData = {
    applicationStatus: "Submitted",
    registrationID: "123456790",
    parentName: "John Test",
    studentName: "Daniel Test",
    studentAge: "24",
    studentRegisterNumber: "R-abc.123",
    registrationDate: "12/20/2025",
    address: "12232 Wind Ln",
    city: "Katy",
    zipCode: "75052",
    country: "United States",
    state: "TX",
    emailAddress: "test@gmail.com",
    primaryContactPerson: "Timmy",
    primaryContactMobile: "1234567890",
    secondaryContactPerson: "Tommy",
    secondaryContactMobile: "3217650987",
  };
  
let setSubmitted: Dispatch<SetStateAction<boolean>>;
let setModalShow: Dispatch<SetStateAction<boolean>>;
let setForm: Dispatch<SetStateAction<FormData>>;
const handleModal = (data: FormData) => {
    setForm(data);
    setModalShow(true);
};
  
beforeEach(() => {
      
      render(<FormModal setSubmitted={setSubmitted} show onHide={() => handleModal(mockData)} form={mockData}/>)
  })
  
  afterEach(() => {
      cleanup()
  })
  

it("displays label and data", () => {
    const labels = ["Parent Name", "Student Name","Email Address", "Primary Contact",
         "Secondary Contact", "Address",]
    
    labels.map((label) => {
        return expect(screen.getByText(label)).toBeInTheDocument();
    })

   
    expect(screen.getByText(mockData.studentName)).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText(mockData.address)).toBeInTheDocument();
    // expect(screen.getByText(mockData.city)).toBeInTheDocument();
    // expect(screen.getByText(mockData.city)).toBeInTheDocument();
    // expect(screen.getByText(mockData.zipCode)).toBeInTheDocument();
    expect(screen.getByText(mockData.country)).toBeInTheDocument();
    expect(screen.getByText(mockData.emailAddress)).toBeInTheDocument();
    expect(screen.getByText(mockData.primaryContactPerson)).toBeInTheDocument();
    expect(screen.getByText(mockData.primaryContactMobile)).toBeInTheDocument();
    expect(screen.getByText(mockData.secondaryContactPerson)).toBeInTheDocument();
    expect(screen.getByText(mockData.secondaryContactMobile)).toBeInTheDocument();
  })
  