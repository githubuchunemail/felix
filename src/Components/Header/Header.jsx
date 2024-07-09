import React, { useContext, useRef } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { BingLogo, Logo } from "../../Assets/Icon/Icon";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { AuthContext } from "../../Context/AuthContext";

const Header = ({ addBook, setAddBook }) => {
  let { setToken, token } = useContext(AuthContext);
  let { logout } = useContext(AuthContext);
  let navigate = useNavigate();
  function handleLogOut() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li>
            <SearchOutlined />
            <input
              type="text"
              placeholder="Search for any training you want "
            />
          </li>
        </ul>
        <ul>
          <li>
            <BingLogo />
          </li>
          <Tooltip title={token?.name}>
            <li className="logo">{token?.name?.slice(0, 1)}</li>
          </Tooltip>
          <li>
            <Button onClick={handleLogOut}>log out</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
