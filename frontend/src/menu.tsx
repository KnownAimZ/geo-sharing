import classNames from "classnames";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Menu = ({ onClick }) => {
  const location = useLocation();

  const [links] = useState<{ to: string; label: string }[]>([
    { to: "/geotags", label: "Geotags" },
    { to: "/geotags-new", label: "New Geotag" },
    { to: "/profile", label: "Profile" },
    { to: "/subscriptions", label: "My Subscriptions" },
    { to: "/users", label: "Find Friend" },
  ]);

  return (
    <div className="menu">
      {links.map((link) => (
        <Link
          className={classNames({
            menu__item: true,
            "menu__item--selected": location.pathname === link.to,
          })}
          key={link.to}
          to={link.to}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
