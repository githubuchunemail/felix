import { Button, Form, Input } from "antd";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"
import md5 from "md5"

const Register = () => {
  let {setToken} = useContext(AuthContext)
  let [error, setError] = useState(false)

  let userNameRef = useRef(null)
  let emailRef = useRef(null)
  let passwordRef = useRef(null)

  const handleSubmit = () => {
    let name = userNameRef.current.input.value
    let email = emailRef.current.input.value
    let Key = userNameRef.current.input.value
    let Secret = passwordRef.current.input.value

    let userData = {name, email, Secret, Key}

    fetch(process.env.REACT_APP_URL + "/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(data => {
      if(data.isOk){
        setToken(data.data)
        console.log(data);
      } else {
        setError(true)
      }
    })
  };

  return (
    <div className="form__wrapper">
      <div className="form">
        <h1>Sign up</h1>
        <Form
          layout="vertical"
          onFinish={handleSubmit} 
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input ref={userNameRef} placeholder="Enter your Username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" ref={emailRef} placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              ref={passwordRef}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p style={{color: "red", display: error ? "block" : "none"}} className="danger">User with this key already exists</p>
          <p>
            Already signed up? <Link to="/login">Go to sign in.</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
