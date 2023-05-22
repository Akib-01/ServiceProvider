import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/user/signup", data);
      console.log(response.data);
      setLoading(false);
      router.push('/Signin');
    } catch (error) {
      //setError(error.response?.data?.message || "Something went wrong!");
      //setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
            name="name"
            className="border border-gray-400 rounded w-full p-2"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone">Phone</label>
          <input
            {...register("phone", { required: true })}
            type="text"
            id="phone"
            name="phone"
            className="border border-gray-400 rounded w-full p-2"
          />
          {errors.phone && <span className="text-red-500">Phone is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            id="email"
            name="email"
            className="border border-gray-400 rounded w-full p-2"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="DOB">Date of Birth</label>
          <input
            {...register("DOB", { required: true })}
            type="date"
            id="DOB"
            name="DOB"
            className="border border-gray-400 rounded w-full p-2"
          />
          {errors.DOB && <span className="text-red-500">Date of Birth is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            {...register("username", { required: true })}
            type="text"
            id="username"
            name="username"
            className="border border-gray-400 rounded w-full p-2"
          />
          {errors.username && <span className="text-red-500">Username is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
                  {...register("password", { required: true })}
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-400 rounded w-full p-2"
                />
                {errors.password && <span className="text-red-500">Password is required</span>}
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === watch("password"),
                  })}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border border-gray-400 rounded w-full p-2"
                />
                {errors.confirmPassword?.type === "required" && (
                  <span className="text-red-500">Confirm password is required</span>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <span className="text-red-500">Passwords do not match</span>
                )}
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className={`bg-blue-500 text-white py-2 px-4 rounded ${
                  loading ? "opacity-50 cursor-wait" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>
);
};

export default SignUp;          
