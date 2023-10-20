import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
      </ul>
    </nav>
  )
}

export default NavBar