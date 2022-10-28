import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { firestore } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm();

  // generate navigate var
  const navigate = useNavigate();

  // state
  const [contentBody, setContentBody] = useState("");

  // handle
  const handleBlog = (data) => {
    console.log(data);
    let uid = uuidv4();
    const docRef = doc(firestore, "blogs2", uid);
    setDoc(docRef, {
      id: uid,
      title: data.title,
      author: data.author,
      body: contentBody,
      createdAt: Date.now(),
    })
      .then((res) => {
        navigate("/blog");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // handle content
  const handleContent = (content) => {
    setContentBody(content);
  };

  return (
    <div className="App">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleBlog)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <div>
            <input
              type="text"
              id="title"
              {...register("title", {
                required: {
                  value: true,
                  message: "please fill in the title",
                },
              })}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          {errors?.title && <small> {errors?.title.message} </small>}
        </div>

        <div>
          <label htmlFor="title">Author</label>
          <div>
            <input
              type="text"
              id="author"
              {...register("author", {
                required: {
                  value: true,
                  message: "please fill in the author",
                },
              })}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          {errors?.author && <small> {errors?.author.message} </small>}
        </div>

        <SunEditor
          setOptions={{
            buttonList: [
              ["undo", "redo", "font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
                "removeFormat",
              ],
              "/",
              [
                ("fontColor",
                "hiliteColor",
                "outdent",
                "indent",
                "align",
                "horizontalRule",
                "list",
                "table"),
              ],
              [
                "link",
                "image",
                "video",
                "fullScreen",
                "showBlocks",
                "codeView",
                "preview",
                "print",
                "save",
              ],
            ],
          }}
          height={"300px"}
          onChange={handleContent}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
