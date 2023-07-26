import { useState, useContext } from "react"
import { signUp } from "../services/authService";
import Cookies from "js-cookie";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { setIsSignedIn, setCurrentUser} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();


  const generateParams = () => {
    const signUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
      //confirmSuccessUrl: confirmSuccessUrl
    }
    return signUpParams;
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try{
      const res = await signUp(params);
      console.log(res);

      if(res.status === 200){
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigate("/");

      }
    }catch (e){
      console.log(e);
    }
  }

  return(
    <>
      <h1>SignUp</h1>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div>
          <label htmlFor="password_confirmation">Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
        </div>

        <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
          Submit
        </button>
      </form>
    </>
  )
}