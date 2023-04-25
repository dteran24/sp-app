import { screen, render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import { expect,  } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import EditForm from "../../components/EditForm";

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

beforeEach(() => {
    render(<EditForm queryData={mockData}/>)
})

afterEach(() => {
    cleanup()
})


it('renders form with input values already filled out', () => {
    expect(screen.getByLabelText('Parent Name')).toHaveAttribute('value', mockData.parentName);
    expect(screen.getByLabelText('Student Name')).toHaveAttribute('value', mockData.studentName);
    expect(screen.getByLabelText('Student Register Number')).toHaveAttribute('value', mockData.studentRegisterNumber);
    expect(screen.getByLabelText('Email Address')).toHaveAttribute('value', mockData.emailAddress);
    expect(screen.getByLabelText('Primary Contact')).toHaveAttribute('value', mockData.primaryContactPerson);
    expect(screen.getByLabelText('Primary Contact Mobile')).toHaveAttribute('value', mockData.primaryContactMobile);
    expect(screen.getByLabelText('Secondary Contact')).toHaveAttribute('value', mockData.secondaryContactPerson);
    expect(screen.getByLabelText('Secondary Contact Mobile')).toHaveAttribute('value', mockData.secondaryContactMobile);
  });

