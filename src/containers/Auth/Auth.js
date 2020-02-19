import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

const auth = props => {

  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

  useEffect(() => {
    // "reset": we have the "checkout" redirect but as we are not building, we want to go on burger builder
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    } 
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true,
      })
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    setControls(updatedControls);
    setFormIsValid(formIsValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };
  
  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElementArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />

  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    );
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    // it can be either '/' (default) or 'checkout' if we started building a burger and then authentificate
    authRedirect= <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        <h1>{isSignup ? 'SIGNUP' : 'SIGNIN'}</h1>
        {form}

        {/*remove disable to see errors returned by the api*/}
        {/*<Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>*/}
        <Button btnType="Success">SUBMIT</Button>
        <div>
          <Button type="button" btnType="Danger" clicked={switchAuthModeHandler}>
            SWITCH TO
            {isSignup ? 'SIGNIN' : 'SIGNUP'}
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
