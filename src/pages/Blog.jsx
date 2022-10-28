import React, { useState, useEffect } from "react";
import { firestore } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Blog() {
  // state
  const [blogData, setBlogData] = useState([]);

  // function get data from firestore
  const getCollectionData = async () => {
    let result = [];
    let collRef = collection(firestore, "/blogs2");
    await getDocs(collRef)
      .then((res) => {
        res.forEach((e) => {
          result.push(e.data());
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return result;
  };

  // component lifecycle
  useEffect(() => {
    getCollectionData()
      .then((res) => {
        console.log(res);
        setBlogData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Blog</h1>
      {blogData.map((item) => (
        <div key={item.id}>
          <h1> {item.title} </h1>
          <small> {item.author} </small>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
          <small> {item.createdAt} </small>
        </div>
      ))}
    </div>
  );
}
