import { Button, Form, Input } from "antd";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import md5 from "md5";

const Login = () => {
  let { setToken } = useContext(AuthContext);
  let [error, setError] = useState(false);

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);

  const handleSubmit = async () => {
    let Key = usernameRef.current.input.value;
    let Secret = passwordRef.current.input.value;
    



    
  };

  return (
    <div className="form__wrapper">
      <div className="form">
        <h1>Sign in</h1>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input ref={usernameRef} placeholder="Enter your email" />
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
          <p style={{ color: "red", display: error ? "block" : "none" }} className="danger">
            Invalid email or password
          </p>
          <p>
            Not registered yet? <Link to="/">Go to sign up.</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
