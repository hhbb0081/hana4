import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSession } from "../hooks/session-context";

const Nav = () => {
  const { session } = useSession();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" replace>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/my">My</NavLink>
        </li>
        <li>
          <NavLink to="/items">Items</NavLink>
        </li>
        <li>
          <NavLink to="/hello">Hello</NavLink>
        </li>
        {session.loginUser && (
          <li className="flex items-center gap-1">
            <FaUserAlt size={14} className="text-slate-300" />
            {session.loginUser.name}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
