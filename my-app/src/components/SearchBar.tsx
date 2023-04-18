import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FormData } from "../models/formData";
const baseURL = 'http://localhost:3001/forms'
interface SearchBarProps {
    
    setQueryData: React.Dispatch<React.SetStateAction<FormData>> ;
}
function SearchBar({ setQueryData } : SearchBarProps) {
    const [query, setQuery] = useState('');
    
    
    const getData = () => {
        axios.get(`${baseURL}/${query}`).then(response => {
            setQueryData(response.data)
            setQuery('');
        }).catch(error => console.log(error))
}
    
    return (
        <Form className="d-flex justify-content-center mb-3">
            <Form.Control className="w-50 me-2" type="search" value={query} placeholder="search" aria-label="search" onChange={(e)=> setQuery(e.target.value)}/>
            <Button variant="outline-success" onClick={getData}>Search</Button>
        </Form>
    )
}
export default SearchBar;