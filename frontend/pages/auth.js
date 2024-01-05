// components/AuthForm.js
import React from 'react';
import styled from 'styled-components';

const AuthFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #bdc1ca;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6e98a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
`;

const AuthForm = () => {
    return (
      <div className="create-an-account">
        <div className="div">
          <div className="textbox">
            <div className="overlap-group">
              <p className="text">Аутентификация</p>
              <form>
                <label htmlFor="username">Имя пользователя:</label>
                <Input type="text" id="username" />
                <label htmlFor="password">Пароль:</label>
                <Input type="password" id="password" />
                <Button type="submit">Войти</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default AuthForm;
