import { useEffect, useState } from "react";
import Forms from "../components/Forms";
import { FormData } from "../models/formData";
import { getAllForms } from "../services/ApiHandler";


function ViewAll() {
    const [forms, setForms] = useState<FormData[]>([]);
    useEffect(() => {
        getAllForms()
            .then((response) => {
              setForms(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.status);
            });
    },[])
    return (<><h1 className="text-center my-4">View all Forms</h1>
        {forms.length > 0 ?  <Forms forms={forms} setForms={setForms}  /> : 'No data at the moment'}
       
    </>)
}
export default ViewAll;