import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIDEBAR_VISIBILITY_TOGGLE } from "../redux/slice/sidebarSlice";

import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

import { Settings, User } from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.jpg";
import storage from "../storage/storage";

const ImgAvt = ({ userInfo }) => (
    <>
        <span className="d-inline-block d-sm-none">
            <Settings size={18} className="align-middle" />
        </span>
        <span className="d-none d-sm-inline-block">
            <img
                src={avatar1}
                className="avatar img-fluid rounded-circle mr-1"
                alt="Chris Wood"
            />
            <span className="text-dark">{userInfo.hoTen}</span>
        </span>
    </>
)

const NavbarComponent = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.user.userInfo)

    const logout = () => {
        storage.removeUserInfo();
    }

    return (
        <Navbar bg="light" expand="lg" variant="light">
            <span
                className="sidebar-toggle d-flex mr-2"
                onClick={() => {
                    dispatch(SIDEBAR_VISIBILITY_TOGGLE());
                }}
            >
                <i className="hamburger align-self-center" />
            </span>

            <Navbar.Collapse>
                <Nav className="ml-auto">
                    <NavDropdown title={<ImgAvt userInfo={userInfo} />}>
                        <NavDropdown.Item>
                            <User size={18} className="align-middle mr-2" />Profile
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Settings & Privacy</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent