import React, {useState} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const layout = (props) => {

  const [sideDrawerIsVisible, setSideDrawerClosedHandler] = useState(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawerClosedHandler(!sideDrawerIsVisible);
  };

  const sideDrawerClosedHandler = () => {
    setSideDrawerClosedHandler(false);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
