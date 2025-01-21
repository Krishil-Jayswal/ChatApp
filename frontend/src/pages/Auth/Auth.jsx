import { useState, useEffect } from "react";
import assets from "../../assets";
import "./Auth.css";
import { Spinner, AnimationWrapper } from "../../components";
import { useAuthStore } from "../../store";

export const Auth = () => {
  const [currState, setCurrState] = useState("Login");
  const [isPassVisible, setPassVisible] = useState(false);
  const [formProps, setFormProps] = useState({ username: "", password: "" });
  const { signup, login, isLoggingIn, isSigningUp } = useAuthStore();

  useEffect(() => {
    if (currState === "Sign Up") {
      setFormProps({ fullname: "", username: "", password: "", gender: "" });
    } else {
      setFormProps({ username: "", password: "" });
    }
  }, [currState]);

  const toggleState = () => {
    setCurrState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));
  };

  const togglePassVisibility = () => {
    setPassVisible((prev) => !prev);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (currState === "Sign Up") {
      signup(formProps);
    } else {
      login(formProps);
    }
  };

  if (isLoggingIn || isSigningUp) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <AnimationWrapper keyValue={currState}>
        <form onSubmit={onSubmitHandler} className="login-form">
          <h2>{currState}</h2>
          {currState === "Sign Up" ? (
            <div className="form-input-container">
              <i className="fi fi-rr-user form-input-icon"></i>
              <input
                onChange={(e) =>
                  setFormProps({ ...formProps, fullname: e.target.value })
                }
                value={formProps.fullname || ""}
                type="text"
                placeholder="Full name"
                className="form-input"
                required
              />
            </div>
          ) : null}
          <div className="form-input-container">
            <i className="fi fi-rr-id-card-clip-alt form-input-icon"></i>
            <input
              onChange={(e) =>
                setFormProps({ ...formProps, username: e.target.value })
              }
              value={formProps.username || ""}
              type="text"
              placeholder="Username"
              className="form-input"
              required
            />
          </div>
          <div className="form-input-container">
            <div className="pass-input-container">
              <i className="fi fi-rr-key form-input-icon"></i>
              <input
                onChange={(e) =>
                  setFormProps({ ...formProps, password: e.target.value })
                }
                value={formProps.password || ""}
                type={isPassVisible ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                required
              />
              <i
                className={`fi ${
                  isPassVisible ? "fi-rr-eye" : "fi-rr-eye-crossed"
                } pass-icon`}
                onClick={togglePassVisibility}
              ></i>
            </div>
          </div>
          {currState === "Sign Up" ? (
            <div className="gender-selection">
              <label className="gender-option">
                <input
                  type="radio"
                  value="male"
                  name="gender"
                  onChange={(e) =>
                    setFormProps({ ...formProps, gender: e.target.value })
                  }
                  checked={formProps.gender === "male"}
                  required
                />
                Male
              </label>
              <label className="gender-option">
                <input
                  type="radio"
                  value="female"
                  name="gender"
                  onChange={(e) =>
                    setFormProps({ ...formProps, gender: e.target.value })
                  }
                  checked={formProps.gender === "female"}
                  required
                />
                Female
              </label>
            </div>
          ) : null}
          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>
          {currState === "Sign Up" ? (
            <div className="login-term">
              <input type="checkbox" required />
              <p>Agree to the Terms and Conditions.</p>
            </div>
          ) : null}
          <div className="login-forgot">
            <p className="login-toggle">
              {currState === "Sign Up"
                ? "Already have an account?"
                : "Create an account?"}
              <span onClick={toggleState}> Click here.</span>
            </p>
          </div>
        </form>
      </AnimationWrapper>
    </div>
  );
};
