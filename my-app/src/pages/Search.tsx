import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { FormData } from "../models/formData";
import EditForm from "../components/EditForm";

function Search() {
  const [queryData, setQueryData] = useState<FormData>({
    applicationStatus: "",
    registrationID: "",
    parentName: "",
    studentName: "",
    studentAge: "",
    studentRegisterNumber: "",
    registrationDate:'',
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
    emailAddress: "",
    primaryContactPerson: "",
    primaryContactMobile: "",
    secondaryContactPerson: "",
    secondaryContactMobile: "",
  });


  return (
    <>
      <h1 className="text-center my-4">Edit a Form</h1>
      <SearchBar setQueryData={setQueryData} />
      {Object.values(queryData).every(property => property === '') ? '' : <EditForm queryData={queryData} />}
      
    </>
  );
}
export default Search;
