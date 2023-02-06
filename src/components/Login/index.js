import { useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jsCookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../service/Authentication";
import "./index.css";
import { onChangeJwtToken } from "../../redux/jwtTokenSlice";


 const Login = () => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { username: "", password: "", errorMessage: "", showErrorMessgae: "" }
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onChangeUsername = (event) => {
    setState({ username: event.target.value });
  };

  const onChangePassword = (event) => {
    setState({ password: event.target.value });
  };

  const renderUsername = () => {
    const { username } = state;
    return (
      <div className="username-password-container">
        <label className="label-text" htmlFor="username">
          USERNAME
        </label>
        <input
          type="input"
          value={username}
          id="username"
          placeholder="Username: rahul"
          onChange={onChangeUsername}
          className="input-field"
        />
      </div>
    );
  };

  const renderPassword = () => {
    const { password } = state;
    return (
      <div className="username-password-container">
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          id="password"
          placeholder="Password: rahul@2021"
          onChange={onChangePassword}
          className="input-field"
        />
      </div>
    );
  };

  const onSubmitSuccess = (jwtToken) => {
    console.log(jwtToken);
    jsCookie.set("jwt_token", jwtToken, { expires: 30 });
    setState({ showErrorMessgae: false });
    dispatch(onChangeJwtToken(jwtToken));
    navigate("/");
  };

  const onSubmitFailure = (errorMessage) => {
    setState({ errorMessage, showErrorMessgae: true });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = state;
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await userLogin(options);
    const data = await response.json();
    
    console.log(data);
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  const jwtToken = jsCookie.get('jwt_token')
  if (jwtToken !== undefined) {
      return <Navigate to="/" />
  }
  
  const {showErrorMessgae, errorMessage} = state
  return (
    <div className="login-container">
        <div className="mobile-view">
            <h3 className="mobile-login-text">Login</h3>
        </div>

        <div className="form-container">
        <form onSubmit={submitForm} className="login-form" >
            <div className="website-logo-title-cont">
            <img
                src="https://i.ibb.co/BtDHXkn/Frame-274.png"
                alt="website logo"
                className="website-logo"
              />
              <h1 className="title-text">Tasty Kitchens</h1>
              <h1 className="desktop-login-text">Login</h1>
            </div>
            {renderUsername()}
            {renderPassword()}
            {showErrorMessgae && <p className="error-text">{errorMessage}</p>}
            <button type="submit" className="login-btn">Login</button>
        </form>
        </div>

        <div className="desktop-view">
        <img
            src="https://i.ibb.co/4s5w61v/Rectangle-1456.png"
            alt="website login"
            className="login-bg"
          />
        </div>
    </div>
  )
};

export default Login