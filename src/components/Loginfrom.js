import { type } from "@testing-library/user-event/dist/type";
import React, { useReducer, useState } from "react";
import { login } from "../utils";

function loginReducer(state, action) {
  switch (action.type) {
    case "feild":
      return {
        ...state,
        [action.feildname]: action.payload,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        isLogin: true,
      };
    case "error":
      return {
        ...state,
        error: "Your password and username not match",
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        username: "",
        password: "",
      };
    case "togglePassword":
      return {
        ...state,
        isShow: !state.isShow,
      };
    default:
      return state;
  }
}

const Loginfrom = () => {
  const initialState = {
    username: "",
    password: "",
    isLoading: false,
    error: "",
    isLogin: false,
    isShow: false,
  };
  const [{ username, password, isLoading, isLogin, error, isShow }, dispatch] =
    useReducer(loginReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "login" });
    try {
      await login({ username, password });

      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  const handelLogout = () => {
    // setIsLogin(false);
    dispatch({ type: "logout" });
  };
  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
            {isLogin ? (
              <div>
                <h3 className="text-3xl text-center font-bold">
                  you are login
                </h3>
                <button
                  role="button"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-red-400 border rounded hover:bg-red-600 py-4 w-full"
                  onClick={() => dispatch({ type: "logout" })}
                >
                  logout
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-3xl text-center font-bold">login From </h3>

                <div className="w-full flex items-center justify-between py-5 text-red-600">
                  {error}
                </div>
                <div>
                  <label
                    id="email"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    aria-labelledby="email"
                    value={username}
                    onChange={(e) =>
                      dispatch({
                        type: "feild",
                        feildname: "username",
                        payload: e.target.value,
                      })
                    }
                    type="text"
                    className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="mt-6  w-full">
                  <label
                    htmlFor="pass"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center justify-center">
                    <input
                      id="pass"
                      type={isShow ? "text" : "password"}
                      value={password}
                      onChange={(e) =>
                        dispatch({
                          type: "feild",
                          feildname: "password",
                          payload: e.target.value,
                        })
                      }
                      className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                    />
                    <div
                      className="absolute right-0 mt-2 mr-3 cursor-pointer"
                      onClick={() => dispatch({ type: "togglePassword" })}
                    >
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg"
                        alt="viewport"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    role="button"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                    disabled={isLoading}
                    style={
                      isLoading ? { background: "#ddd", color: "black" } : {}
                    }
                  >
                    {isLoading ? "Loging..." : "Login"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Loginfrom;
