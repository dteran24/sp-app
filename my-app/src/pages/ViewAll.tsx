import { useEffect, useState } from "react";
import Forms from "../components/Forms";
import axios from "axios";
import { BASE_URL } from "../util/validations";
import { FormData } from "../models/formData";


function ViewAll() {
    const [forms, setForms] = useState<FormData[]>([]);
    useEffect(() => {
        axios
            .get(BASE_URL)
            .then((response) => {
              setForms(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.status);
            });
    },[])
    return (<><h1>View all page</h1>
        {forms.length > 0 ?  <Forms forms={forms} setForms={setForms}  /> : 'No data at the moment'}
       
    </>)
}
export default ViewAll;