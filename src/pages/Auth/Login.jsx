import LoginCard from "../../components/AuthCard/LoginCard";

const Login = ({ loginToggle }) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <LoginCard loginToggle={loginToggle} />
    </div>
  );
};

export default Login;
