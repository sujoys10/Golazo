import React from 'react';
import { connect } from 'react-redux';
import { startLogIn } from '../actions/auth';

const LogInPage = ({startLogin}) =>(
    <div className="box-layout">
       <div className="box-layout__box">
           <h1 className="box-layout__title">Golazo</h1>
           <p>For the Football. For the Fans.</p>
          <button className="login-button" onClick={startLogin}><i class="fab fa-google"></i>Login with Google</button>
       </div>
    </div>
);

 const mapDispatchToProps = (dispatch) =>({
    startLogin : () => dispatch(startLogIn())
});

export default connect(undefined, mapDispatchToProps)(LogInPage);
