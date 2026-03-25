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
import { MyPosts } from "../components/posts/MyPosts";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          {/* Categories Routes */}
          <Route path="categories">
            <Route index element={<CategoryList />} />
            <Route path="new" element={<NewCategoryForm />} />
          </Route>

          {/* Posts Routes */}
          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":postId" element={<ViewPostDetails />} />
            <Route path="my-posts" element={<MyPosts token={token} />} />
            <Route path="new" element={<CreatePost token={token} />} />
          </Route>

          {/* Tags Routes */}
          <Route path="tags">
            <Route index element={<TagList />} />
            <Route path="new" element={<CreateTag />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};