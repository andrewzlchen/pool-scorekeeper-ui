import React from "react";
import * as Realm from "realm-web";
import { useRealmApp } from "../../hooks/useRealmApp";

interface OwnProps {
  isLogin?: boolean; // determines whether to show the login page or the sign up page
}

const AuthPage = ({ isLogin }: OwnProps) => {
  const realmApp = useRealmApp();
  if (realmApp.currentUser) {
    return (
      <button onClick={async () => await realmApp.logOut()}>
        You are currently signed in. Click to logout.
      </button>
    )
  }

  console.log(realmApp);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      if (!isLogin) {
        await realmApp.emailPasswordAuth.registerUser({ email, password });
      }

      await realmApp.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      // Nice!
      alert(err);
    }
  };

  return (
    (
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <input type="submit" value={isLogin ? 'Log In' : 'Sign Up'} />
      </form>
    )
  );
};

export default AuthPage;
