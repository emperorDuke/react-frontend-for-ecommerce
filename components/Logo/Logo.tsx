import React from "react";
import Link from "../Link";

const Logo = () => {
  return (
    <Link href="/" color='inherit'>
      <img
        src="/static/favicon.ico"
        alt="logo"
        style={{ margin: "-1px", height: "12vmin" }}
      />
    </Link>
  );
};

export default Logo;
