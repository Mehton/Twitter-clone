import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import SignInPage from "./Components/SignIn";
import SignUpPage from "./Components/SignUp";
import Home from "./Components/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index={true} element={<SignInPage />} />{" "} */}
        {/* special type of route that renders within its parent's outlet at the parent's URL */}
        {/* <Route path="/ComicDetail/:id" element={<ComicDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route> */}
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/post/:postId" element={<PostPage />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
