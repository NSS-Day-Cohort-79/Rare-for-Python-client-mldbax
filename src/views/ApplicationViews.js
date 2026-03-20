import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { TagList } from "../components/tags/TagList";
import { CategoryList } from "../components/categories/CategoryList";
import { CreateTag } from "../components/tags/CreateTag";
import { PostList } from "../components/posts/PostList";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/tags">
            <Route index element={<TagList />} />
            <Route path="new" element={<CreateTag />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
