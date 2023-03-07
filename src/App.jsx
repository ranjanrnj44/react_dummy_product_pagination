import React, { useEffect, useState } from "react";
//css

//libs
import axios from "axios";

function App() {
  //state
  let [posts, setPosts] = useState([]);
  let [page, setPage] = useState(1);
  let [postPerPage] = useState(10);

  //getting the index
  let firstIndexNum = page * postPerPage;
  let lastIndexNum = firstIndexNum - 10;
  let currentPosts = posts.slice(lastIndexNum, firstIndexNum);

  //effect
  useEffect(() => {
    let apiCall = async () => {
      let res = await axios.get("https://dummyjson.com/products?limit=100");
      let resData = res.data;
      console.log(resData);
      if (resData && resData.products) {
        setPosts(resData.products);
      }
    };
    apiCall();
  }, []);

  console.log(`POST LENGTH : ${posts.length}`);
  console.log(`PAGE : ${page}`);

  return (
    <>
      <h1>Product pagination</h1>
      <div
        className="rootContainer"
        style={{ display: "flex", flexWrap: "wrap", flexBasis: "500px" }}
      >
        {currentPosts.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "silver",
              padding: "10px",
              margin: "0.2rem",
              width: "100%",
              height: "100%",
              maxHeight: "500px",
              maxWidth: "300px"
            }}
          >
            <img
              src={product.thumbnail}
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "100%",
                maxHeight: "200px"
              }}
              alt={product.title}
            />
            <h4>{product.title}</h4>
            <h4>{product.price}</h4>
          </div>
        ))}
      </div>
      {posts.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem"
          }}
        >
          <div className="paginationContainer">
            <span
              onClick={() => setPage((prev) => prev - 2)}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                padding: "1rem",
                margin: "0.1rem"
              }}
              className={page <= 1 ? "disabled_true" : ""}
            >
              {"<<"}
            </span>
            <span
              onClick={() => {
                setPage((prev) => prev - 1);
              }}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                padding: "1rem"
              }}
              className={page <= 1 ? "disabled_true" : ""}
            >
              {"<"}
            </span>{" "}
            &nbsp;
            {[...Array(posts.length / 10)].map((item, index) => {
              // console.log(index);
              return (
                <span
                  onClick={() => setPage(index + 1)}
                  key={item}
                  style={{
                    backgroundColor: "orange",
                    padding: "1rem",
                    margin: "0.1rem",
                    cursor: "pointer"
                  }}
                  className={page === index + 1 ? "bgBlue" : "bgOrange"}
                >
                  {index + 1}{" "}
                </span>
              );
            })}
            &nbsp;
            <span
              onClick={() => setPage((prev) => prev + 1)}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                padding: "1rem"
              }}
              className={
                page >= posts.length / postPerPage ? "disabled_true" : ""
              }
            >
              {">"}
            </span>
            <span
              onClick={() => setPage((prev) => prev + 2)}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: "black",
                color: "white",
                padding: "1rem",
                margin: "0.1rem"
              }}
              className={
                page >= posts.length / postPerPage ? "disabled_true" : ""
              }
            >
              {">>"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
