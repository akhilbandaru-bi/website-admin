import React, { useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add your login logic here
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add your forgot password logic here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="login-card"
        >
          <div className="login-card-content">
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username / Email
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="demo_user"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="demo123"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-options">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  label="Remember me"
                />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="login-submit-btn"
              >
                Sign In
              </Button>
            </form>
          </div>
        </Squircle>
      </div>
    </div>
  );
};

export default Login;
