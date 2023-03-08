import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="auth-page">
      <nav>
        <h1>tablerunner</h1>

        <a href="/">
          <button>Home</button>
        </a>
        <a href="/login">
          <button>Log in</button>
        </a>
        <a href="/signup">
          <button>Sign up</button>
        </a>
        <a href="/matches/asdf/games/game/players">
          <button>Choose Players</button>
        </a>
        <a href="/matches/asdf/games/game/scorekeeper">
          <button>keep score</button>
        </a>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
