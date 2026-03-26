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
import { EditCommentForm } from "../components/comments/EditCommentForm";
import { EditTag } from "../components/tags/EditTag";

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
            <Route path=":id">
              <Route path="edit" element={<EditCategory />} />
            </Route>
          </Route>
          <Route path="/posts">
            <Route index element={<PostList />} />
            <Route path=":postId">
              <Route index element={<ViewPostDetails token={token} />} />
              <Route path="edit" element={<EditPost token={token} />} />
              <Route path="comments" element={<Comments />} />
              <Route
                path="comments/new"
                element={<NewCommentForm token={token} />}
              />
            </Route>
            <Route path="new" element={<CreatePost token={token} />} />
          </Route>
          <Route path="/tags">
            <Route index element={<TagList />} />
            <Route path="new" element={<CreateTag />} />
            <Route path=":id">
              <Route path="edit" element={<EditTag />} />
            </Route>
          </Route>
          <Route
            path="/comment/:commentId/edit"
            element={<EditCommentForm token={token} />}
          />
        </Route>
      </Routes>
    </>
  );
};
