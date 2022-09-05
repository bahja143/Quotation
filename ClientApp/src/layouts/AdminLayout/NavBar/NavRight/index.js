import React, { useContext, useState, useEffect } from "react";
import { ListGroup, Dropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import JwtDecode from "jwt-decode";

import { ConfigContext } from "../../../../contexts/ConfigContext";
import avatar1 from "../../../../assets/images/user/avatar-2.jpg";

const NavRight = () => {
  const configContext = useContext(ConfigContext);
  const { rtlLayout } = configContext.state;
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      history.go("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  };
  const handleLoad = () => {
    try {
      setUser(JwtDecode(localStorage.getItem("token")));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <React.Fragment>
      <ListGroup
        as="ul"
        bsPrefix=" "
        className="navbar-nav ml-auto"
        id="navbar-right"
      >
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown alignRight={!rtlLayout} className="drp-user">
            <Dropdown.Toggle
              as={Link}
              variant="link"
              to="#"
              id="dropdown-basic"
            >
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{user.name}</span>
                <Link
                  to="#"
                  className="dud-logout"
                  title="Logout"
                  onClick={handleLogout}
                >
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup
                as="ul"
                bsPrefix=" "
                variant="flush"
                className="pro-body"
              >
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="#" className="dropdown-item" onClick={handleLogout}>
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
    </React.Fragment>
  );
};

export default NavRight;
