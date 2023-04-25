import { axiosProject } from "../services/AxiosInstance";
import { getForm, editForm, getAllForms, submitForm } from "../services/ApiHandler";
import MockAdapter from "axios-mock-adapter";
const mock = new MockAdapter(axiosProject);
    const allFormsData = [
      {
        applicationStatus: "Approved",
        registrationID: "7174767539",
        registrationDate: "2023-04-22",
        parentName: "daniel",
        studentName: "BOBBYY",
        studentAge: "13",
        studentRegisterNumber: "R-abc.124",
        address: "21622 Park Wick Ln",
        city: "Katy",
        zipCode: "774501",
        country: "United States",
        state: "TX",
        emailAddress: "dteran21@yahoo.com",
        primaryContactPerson: "Daniel Teran",
        primaryContactMobile: "8327880047",
        secondaryContactPerson: "Daniel Teran",
        secondaryContactMobile: "8327880047",
      },
];
const formData = {
  applicationStatus: "Approved",
  registrationID: "7174767539",
  registrationDate: "2023-04-22",
  parentName: "daniel",
  studentName: "BOBBYY",
  studentAge: "13",
  studentRegisterNumber: "R-abc.124",
  address: "21622 Park Wick Ln",
  city: "Katy",
  zipCode: "774501",
  country: "United States",
  state: "TX",
  emailAddress: "dteran21@yahoo.com",
  primaryContactPerson: "Daniel Teran",
  primaryContactMobile: "8327880047",
  secondaryContactPerson: "Daniel Teran",
  secondaryContactMobile: "8327880047",
    }

describe("fetch all projects", () => {
  it("should return all forms", () => {
    
    mock.onGet("").reply(200, allFormsData);
    getAllForms().then((response) => expect(response.data).toEqual(allFormsData));
  });
});

describe("get a form", () => {
  it("should return a form based off id", () => {
    mock.onGet("7174767539").reply(200, formData)
    getForm("7174767539").then((response) => expect(response.data).toEqual(formData));
    
  })
})

describe("edit a form", () => {
  it("should return a changed form based off id", () => {
    mock.onPut("7174767539").reply(200, formData)
    editForm("7174767539",formData).then((response) => expect(response.data).toEqual(formData));
    
  })
})

describe("submit a form", () => {
  it("should return a submitted form", () => {
    mock.onPost().reply(200, formData)
    submitForm(formData).then((response) => expect(response.data).toEqual(formData));
    
  })
})