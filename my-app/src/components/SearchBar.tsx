import { Form, Button } from "react-bootstrap";


function SearchBar() {
    return (
        <Form>
            <Form.Control type="search" placeholder="search" aria-label="search" />
            <Button variant="outline-success">Search</Button>
        </Form>
    )
}
export default SearchBar;