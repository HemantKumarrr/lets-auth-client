import SignupCard from "../../components/AuthCard/SignupCard";

const Signup = ({ loginToggle }) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <SignupCard loginToggle={loginToggle} />
    </div>
  );
};

export default Signup;
