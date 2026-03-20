import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { CategoryList } from "../components/categories/CategoryList";
import { NewCategoryForm } from "../components/categories/NewCategoryForm";
import { PostList } from "../components/posts/PostList";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path=":new" element={<NewCategoryForm />} />
          </Route>
          <Route path="/posts" element={<PostList />} />
        </Route>
      </Routes>
    </>
  );
};
