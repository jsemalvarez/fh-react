import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Navigate
  } from 'react-router-dom';
  
  import logo from '../assets/react.svg';
  
  export const AppRouter = () => {
    return (
      <BrowserRouter>
        <div className="main-layout">
          <nav>
              <img src={ logo } alt="React Logo" />
            <ul>
              <li>
                <NavLink to="/" className={ ({ isActive }) => isActive ? 'nav-active': ''}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={ ({ isActive }) => isActive ? 'nav-active': ''}>About</NavLink>
              </li>
              <li>
                <NavLink to="/users" className={ ({ isActive }) => isActive ? 'nav-active': ''}>Users</NavLink>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/about" element={ <h1>About</h1> } />
            <Route path="/users" element={ <h1>Users</h1> } />
            <Route path="/home" element={ <h1>Home Page</h1> } />

            <Route path='/*' element={ <Navigate to='/home' replace/>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }