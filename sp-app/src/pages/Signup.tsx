import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center w-100 text-center my-4">
        <h3>Get started with your account</h3>
        <p>Have access to edit your information and see if you are eligible.</p>
      </div>
      <SignupForm/>
    </>
  );
}
export default Signup;
