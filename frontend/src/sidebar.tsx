import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

export const Sidebar = () => {
  const location = useLocation();

  const [links] = useState<{ to: string; label: string }[]>([
    { to: "/geotags", label: "Geotags" },
    { to: "/geotags-new", label: "New Geotag" },
    { to: "/profile", label: "Profile" },
    { to: "/subscriptions", label: "My Subscriptions" },
    { to: "/users", label: "Find Friend" },
  ]);

  return (
    <div className="sidebar">
      {links.map((link) => (
        <Link
          className={classNames({
            sidebar__item: true,
            "sidebar__item--selected": location.pathname === link.to,
          })}
          key={link.to}
          to={link.to}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
