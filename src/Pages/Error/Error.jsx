import React from 'react'
import "./Error.scss"
import ErrorImg from "../../Assets/Img/undraw_page_not_found_re_e9o6 1.png"
import { Button } from 'antd'

const Error = () => {
  return (
    <div className="error">
        <img src={ErrorImg} alt="" /> <br />

        <div className="buttons">
            <Button>Go Home Page</Button>
            <Button>Reload Page</Button>
        </div>
    </div>
  )
}

export default Error