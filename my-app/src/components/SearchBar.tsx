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
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(false);
    
    
    
    
    const getData = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {

        } else { 
            axios.get(`${baseURL}/${query}`).then(response => {
                    setError(false);
                    setQueryData(response.data)
                    setQuery('');
                    setValidated(false);
                    
            }).catch(error => {
                if (error.response.status === 404) {
                    setError(true);
                }

            })
        }
        setValidated(true);
}
    
    return (
        <>
        <Form className="d-flex justify-content-center mb-3" onSubmit={getData} noValidate
            validated={validated}>
            <Form.Group>
            <Form.Control className=" w-100 me-2" type="search" required value={query} placeholder="search" aria-label="search" onChange={(e)=> setQuery(e.target.value)}/>
            <Form.Control.Feedback type="invalid">
            Cannot be empty!
                </Form.Control.Feedback>
            </Form.Group>
            <Button className="ms-3 h-50" variant="outline-success" type="submit">Search</Button>
            </Form>
            {error ? <div className="d-flex justify-content-center text-danger">User not found!</div> : ''}
            </>
    )
}
export default SearchBar;