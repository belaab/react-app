import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Alpha from './components/Alpha';
import Beta from './components/Beta';

const Root = () => 
    <Router>
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">NEWS APP</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/alpha" activeClassName="active">Alpha</NavLink>
                    </NavItem>
                    <NavItem>
                    <   NavLink to="/beta" activeClassName="active">Beta</NavLink>
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={ App }/>
            <Route exact path="/alpha" component={ Alpha }/>
            <Route exact path="/beta" component={ Beta }/>

        </div>
    </Router>


const About = () =>
<div>
    <h1>
        this is about page 
    </h1>
</div>

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();


