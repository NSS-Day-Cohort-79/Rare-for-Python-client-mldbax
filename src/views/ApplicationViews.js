import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { TagList } from "../components/tags/TagList";
import { CategoryList } from "../components/categories/CategoryList";
import { NewCategoryForm } from "../components/categories/NewCategoryForm";
import { CreateTag } from "../components/tags/CreateTag";
import { PostList } from "../components/posts/PostList";
import { ViewPostDetails } from "../components/posts/ViewPostDetails";
import { CreatePost } from "../components/posts/CreatePost";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/categories">
            <Route index element={<CategoryList />} />
            <Route path="new" element={<NewCategoryForm />} />
          </Route>
          <Route path="/posts">
            <Route index element={<PostList />} />
            <Route path=":postId" element={<ViewPostDetails />} />
            <Route path="new" element={<CreatePost token={token} />} />
          </Route>
          <Route path="/tags">
            <Route index element={<TagList />} />
            <Route path="new" element={<CreateTag />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
