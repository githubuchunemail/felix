import React from "react";
import "./Books.scss";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Books = ({ title, cover, pages, publish, isbn, author, onDelete, onEdit, buttonType }) => {
  return (
    <div className="books">
      <h3>{title}</h3>
      <div className="text">
        <p>
          Cover:{" "}
          <a target="_blank" href={cover} rel="noopener noreferrer">
            {cover}
          </a>{" "}
        </p>
        <p>Pages: {pages}</p>
        <p>Published: {publish}</p>
        <p>Isbn: {isbn}</p>
      </div>

      <div className="text">
        <p>
          {author} / {publish}
        </p>
      </div>
      {buttonType}

      <div className="books__buttons" style={buttonType ? {display: "flex"} : {display: "none"}}>
        <Button
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export default Books;
