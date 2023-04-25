import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center border"
    >
      <div className="d-flex flex-column">
        <Link to="/signup">
          <Button className="mb-3">Sign Up</Button>
        </Link>
        <Link to="search">
          <Button className="mb-3">Edit Form</Button>
        </Link>
        <Link to="viewall">
          <Button className="mb-3">View All Forms</Button>
        </Link>
      </div>
    </div>
  );
}
export default Home;
