import React from "react";
import * as Realm from "realm-web";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";

import { useRealmApp } from "../../hooks/useRealmApp";
import urls from "../../common/urls";

interface OwnProps {
  isLogin?: boolean; // determines whether to show the login page or the sign up page
}

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(src/assets/amsterdam.jpeg);
  background-repeat: no-repeat;
  background-position: center;

  color: white;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: space-around;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: black;
`;

const AuthPage = ({ isLogin }: OwnProps) => {
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  const realmApp = useRealmApp();
  if (realmApp.currentUser) {
    return (
      <button onClick={async () => await realmApp.logOut()}>
        You are currently signed in. Click to logout.
      </button>
    );
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event: any) => {
    setError("");
    event.preventDefault();

    try {
      if (!isLogin) {
        await realmApp.emailPasswordAuth.registerUser({ email, password });
      }

      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
      navigate(urls.matches().list());
    } catch (err) {
      const error = err as Error;
      setError(`Failed to authenticate: ${error.message}`);
    }
  };

  return (
    <Background>
      <div className="flex flex-col items-center w-4/5 max-w-md">
        <h1 className="font-header text-5xl mb-5">Hey Shark!</h1>
        <h2 className="mb-8">
          Log in or create an account to see your performance and progress
        </h2>
        {error && (
          <div className="alert alert-error shadow-lg mb-5 w-full">{error}</div>
        )}
        <Form onSubmit={handleSubmit}>
          <input
            className="input input-bordered mb-5"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input input-bordered mb-5"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="btn btn-primary mb-8"
            type="submit"
            value={isLogin ? "Log In" : "Sign Up"}
          />
        </Form>

        {isLogin ? (
          <Link className="underline" to="/signup">
            Create an account
          </Link>
        ) : (
          <Link className="underline" to="/login">
            Already have an account? Log in
          </Link>
        )}
      </div>
    </Background>
  );
};

export default AuthPage;
