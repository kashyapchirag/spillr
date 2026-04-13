import { motion } from "motion/react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface inputType {
  name: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input = ({ name, value, type, onChange, placeholder }: inputType) => {
  return (
    <input
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className=" text-neutral-600 placeholder:text-neutral-600 w-full px-4 py-3 rounded-lg border outline-none selection:border-neutral-700 focus:border-neutral-700 border-neutral-800"
    />
  );
};

const AuthForm = () => {
  const [mode, setMode] = useState<"SignIn" | "SignUp">("SignUp");

  interface formType {
    name: string;
    email: string;
    password: string;
  }

  const [form, setForm] = useState<formType>({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: formType) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post("/api/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(res.data.message);
      toast(res.data.message, { position: "top-center" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        toast(error.response?.data?.message, { position: "top-center" });
      } else {
        console.log("Something went wrong");
        toast("Something went wrong", { position: "top-center" });
      }
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(
        "/api/signin",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true },
      );

      console.log(res.data.message);
      toast(res.data.message, { position: "top-center" });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        toast(error.response?.data?.message, { position: "top-center" });
      } else {
        console.log("Something went wrong");
        toast("Something went wrong", { position: "top-center" });
      }
    }
  };

  return (
    <div className="border-2 rounded-2xl bg-[#0a0a0a] relative border-neutral-800 w-100 p-6 flex flex-col gap-8">
      {mode === "SignIn" ? (
        <>
          <div>
            <div className="heading flex flex-col w-full justify-center items-center gap-1">
              <h2 className="text-white text-2xl font-medium">Welcome Back</h2>
              <h3 className="text-neutral-500">
                Enter your credentials to continue
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              value={form.email}
              onChange={handleFormChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              value={form.password}
              onChange={handleFormChange}
              name="password"
              type="password"
              placeholder="Password"
            />

            <motion.button
              onClick={handleSignIn}
              whileTap={{ scale: 0.97 }}
              className="bg-neutral-100 hover:bg-white rounded-lg w-full py-3 cursor-pointer"
            >
              Sign in
            </motion.button>
          </div>

          <div className="or flex text-neutral-700 text-sm justify-center items-center gap-2">
            <div className="left bg-neutral-800 w-1/2 h-px"></div>
            <span>or</span>
            <div className="left bg-neutral-800 w-1/2 h-px"></div>
          </div>

          <div className="text-neutral-600 flex justify-center items-center gap-2">
            No account?{" "}
            <button
              onClick={() => {
                setMode("SignUp");
              }}
              className="text-neutral-100 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="heading flex flex-col w-full justify-center items-center gap-1">
              <h2 className="text-white text-2xl font-medium">
                Create account
              </h2>
              <h3 className="text-neutral-500">Start your journey with us</h3>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              value={form.name}
              onChange={handleFormChange}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Input
              value={form.email}
              onChange={handleFormChange}
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              value={form.password}
              onChange={handleFormChange}
              name="password"
              type="password"
              placeholder="Password"
            />

            <motion.button
              onClick={handleSignUp}
              whileTap={{ scale: 0.97 }}
              className="bg-neutral-100 hover:bg-white rounded-lg w-full py-3 cursor-pointer"
            >
              Sign up
            </motion.button>
          </div>

          <div className="or flex text-neutral-700 text-sm justify-center items-center gap-2">
            <div className="left bg-neutral-800 w-1/2 h-px"></div>
            <span>or</span>
            <div className="left bg-neutral-800 w-1/2 h-px"></div>
          </div>

          <div className="text-neutral-600 flex justify-center items-center gap-2">
            Already have an account?{" "}
            <button
              onClick={() => {
                setMode("SignIn");
              }}
              className="text-neutral-100 cursor-pointer"
            >
              Create account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthForm;
