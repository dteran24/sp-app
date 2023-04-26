import { screen, render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect,  } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import Forms from "../../components/Forms";
import { Dispatch, SetStateAction } from "react";
import { FormData } from "../../models/formData";

expect.extend(matchers);

let setForm: Dispatch<SetStateAction<FormData[]>>;
const mockData = [{
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
  }];
const labels = ["Registration #", "Parent Name", "Student Name", "Status"];
beforeEach(() => {
    render(<Forms forms={mockData} setForms={setForm}/>)
})

afterEach(() => {
    cleanup()
})

it("should render component with data", () => {
    labels.map((label) => {
        return expect(screen.getByText(label)).toBeInTheDocument();
    })
    const tableHeader = screen.getAllByRole('columnheader');
    const headerText = tableHeader.map((header) => header.textContent)

    mockData.map((form) => {
        expect(screen.getByText(form.registrationID)).toBeInTheDocument();
        expect(screen.getByText(form.parentName)).toBeInTheDocument();
        expect(screen.getByText(form.studentName)).toBeInTheDocument();
        expect(screen.getByText(form.applicationStatus)).toBeInTheDocument();
    
        
        
    })

    expect(headerText).toEqual(['Registration #', 'Parent Name', 'Student Name', 'Status']);
    
})