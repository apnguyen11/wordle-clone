import React, {Component} from 'react';
import './Login.css'



export class Login extends Component {

    render(){
      return(
        <div className='main-container'>
          <div className='login-container'>
            <h3>Login</h3>
            <div className="">
              <div>Username</div>
              <input></input>
              <div>Password</div>
              <input></input>
              <button>
                Submit
              </button>
            </div>
          </div>
        </div>
      )
       
    }
  
}
  