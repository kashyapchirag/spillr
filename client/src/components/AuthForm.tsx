import { useState } from "react";

const AuthForm = () => {
  const [mode, setMode] = useState<"SignIn" | "SignUp">("SignIn");

  const Input = (name: string, type: string, placeholder: string) => {
    return (
      <input name={name} type={type} placeholder={placeholder} className="" />
    );
  };

  return (
    <div className="border-2 rounded-2xl bg-[#0a0a0a] relative border-neutral-800 w-100 min-h-125"></div>
  );
};

export default AuthForm;
