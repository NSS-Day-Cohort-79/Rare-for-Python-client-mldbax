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
import { Comments } from "../components/comments/Comments";
import { CreatePost } from "../components/posts/CreatePost";
import { EditPost } from "../components/posts/EditPost";
import { EditCategory } from "../components/categories/EditCategory";
import { NewCommentForm } from "../components/comments/NewCommentForm";
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
          <Route path="/categories">
            <Route index element={<CategoryList />} />
            <Route path="new" element={<NewCategoryForm />} />
          </Route>
          <Route path=":id">
              <Route path="edit" element={<EditCategory />} />
          </Route>

          {/* Posts Routes */}
          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path=":postId">
              <Route index element={<ViewPostDetails token={token} />} />
              <Route path="edit" element={<EditPost token={token} />} />
              <Route path="comments" element={<Comments />} />
              <Route path="comments/new" element={<NewCommentForm token={token}/>}/>
            </Route>
            <Route path="new" element={<CreatePost token={token} />} />
          </Route>
            <Route path="/my-posts" element={<MyPosts token={token} />} />

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