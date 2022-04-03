import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { Badge, Collapse } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Box } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import arrayRoutes from "../routes/index";
import avatar from "../assets/img/avatars/avatar.jpg";
import withRouter from "../routes/withRouter";

const initOpenRoutes = (location) => {
  const pathName = location.pathname;

  let _routes = {};

  arrayRoutes.forEach((route, index) => {
    const isActive = pathName.indexOf(route.path) === 0;
    const isOpen = route.open;
    const isHome = route.containsHome && pathName === "/" ? true : false;

    _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome })
  });

  return _routes;
};

const SidebarCategory = withRouter(
  ({
    name,
    badgeColor,
    badgeText,
    icon: Icon,
    isOpen,
    children,
    onClick,
    location,
    to
  }) => {
    const getSidebarItemClass = path => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <span
          data-toggle="collapse"
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <Icon size={18} className="align-middle mr-3" />
          <span className="align-middle">{name}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse in={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    );
  }
);

const SidebarItem = withRouter(({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
  const getSidebarItemClass = path => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <li className={"sidebar-item " + getSidebarItemClass(to)}>
      <NavLink to={to} className="sidebar-link" end>
        {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
        {name}
        {badgeColor && badgeText ? (
          <Badge color={badgeColor} size={18} className="sidebar-badge">
            {badgeText}
          </Badge>
        ) : null}
      </NavLink>
    </li>
  );
}
);

const Sidebar = ({ location }) => {
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location));
  const layout = useSelector(state => state.layout)
  const sidebar = useSelector(state => state.sidebar)

  const toggle = index => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item => openRoutes[index] || setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [item]: false }))
    )

    // Toggle selected element
    setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  }

  return (
    <nav
      className={
        "sidebar" +
        (!sidebar.isOpen ? " toggled" : "") +
        (sidebar.isSticky ? " sidebar-sticky" : "")
      }
    >
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <Box className="align-middle text-primary" size={24} />{" "}
            <span className="align-middle">FamShop</span>
          </a>

          <ul className="sidebar-nav">
            {arrayRoutes.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  {category.header ? (
                    <li className="sidebar-header">{category.header}</li>
                  ) : null}

                  {category.children ? (
                    <SidebarCategory
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={openRoutes[index]}
                      onClick={() => toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        />
                      ))}
                    </SidebarCategory>
                  ) : (
                    <SidebarItem
                      name={category.name}
                      to={category.path}
                      icon={category.icon}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ul>

          {!layout.isBoxed && !sidebar.isSticky ? (
            <div className="sidebar-bottom d-none d-lg-block">
              <div className="media">
                <img
                  className="rounded-circle mr-3"
                  src={avatar}
                  alt="Chris Wood"
                  width="40"
                  height="40"
                />
                <div className="media-body">
                  <h5 className="mb-1">Mink Giang</h5>
                  <div>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-success"
                    />{" "}
                    Online
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </PerfectScrollbar>
      </div>
    </nav>
  )
}

export default withRouter(Sidebar);