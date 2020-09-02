import React from "react";
import Link from "../Link";

const Logo = () => {
  return (
    <Link href="/" color='inherit'>
      <img
        src="/static/favicon.ico"
        alt="logo"
        style={{ width: "50%", height: "10vh" }}
      />
    </Link>
  );
};

export default Logo;
