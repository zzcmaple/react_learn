import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import './index.scss';

// 验证函数，根据实际情况进行修改
const validate = (values) => {
  let errors = {};

  if (!values.username) {
    errors.username = '用户名不能为空';
  }

  if (!values.password) {
    errors.password = '密码不能为空';
  }

  return errors;
};

const Login = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
      { username: '', password: '' },
      validate
  );

  useEffect(() => {
    if (isSubmitting) {
      // 在这里添加登录逻辑，例如发起登录请求等
      console.log('Logging in with:', values);
    }
  }, [isSubmitting, values]);

  return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="submit-button">
            Login
          </button>
        </form>
      </div>
  );
};

export default Login;