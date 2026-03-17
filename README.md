# Rare: The Publishing Platform for the Discerning Writer

## Getting Started

1. Install dependencies: `npm install`
2. Run the code `npm start`
<!-- TODO: Update the remaining steps if anything changes -->
3. With the server also running, check that the login, register, and logout functionality is in working.
4. This template is using [Bulma](https://bulma.io/documentation) for styling. Take a little bit of time to familiarize yourself with the framework if you would like to continue using it.

<!-- TODO: Finish writing the readme -->

## Components

### auth

- Login
- Register

### categories

- Category
- CategoryList
- NewCategoryForm

### tags

- Tag
- TagList
- NewTagForm

### nav

- NavBar
- navbar.css

### posts

- Post
- PostList
- PostDetails
- NewPostForm
- UpdatePostForm

### utils

- HumanDate

### comments

- Comment
- CommentList
- NewCommentForm

## Views

### ApplicationViews

### Authorized

## Managers

### AuthManager

# API Structure

- json-server.py
  - do_GET
    - /users
    - /tags
    - /categories
    - /posts
    - /comments
    - /reactions
    - /postTags
    - /postReactions
    - /subscriptions
  - do_POST
    - /users
    - /tags
    - /categories
    - /posts
    - /comments
    - /reactions
    - /postTags
    - /postReactions
    - /subscriptions
  - do_PUT
    - /users
    - /tags
    - /categories
    - /posts
    - /comments
    - /reactions
    - /postTags
    - /postReactions
    - /subscriptions
  - do_DELETE
    - /users
    - /tags
    - /categories
    - /posts
    - /comments
    - /reactions
    - /postTags
    - /postReactions
    - /subscriptions

## views

- user.py
  - login_user()
  - create_user()
  - get_user(pk)
  - get_users()
- tag.py
  - get_tags()
  - get_tag(pk)
  - update_tag(tag_data)
  - create_tag(tag_data)
  - delete_tag(pk)
- category.py
  - get_categories()
  - get_category(pk)
  - update_category(category_data)
  - create_category(category_data)
  - delete_category(pk)
- post.py
  - get_post(pk)
  - get_posts_by_user(userId)
  - get_all_posts()
  - create_post(post_data)
  - delete_post(pk)
  - edit_post(post_data)
- comment.py
  - get_comments()
  - get_comment(pk)
  - update_comment(comment_data)
  - create_comment(comment_data)
  - delete_comment(pk)
- reaction.py
  - get_reactions()
  - get_reaction(pk)
  - update_reaction(reaction_data)
  - create_reaction(reaction_data)
  - delete_reaction(pk)
- post_tag.py
  - add_tag_to_post(post_id, tag_id)
- post_reaction.py
  - get_post_reactions()
  - get_post_reaction(pk)
  - update_post_reaction(post_reaction_data)
  - create_post_reaction(post_reaction_data)
  - delete_post_reaction(pk)
- subscription.py
  - get_subscriptions()
  - get_subscription(pk)
  - update_subscription(subscription_data)
  - create_subscription(subscription_data)
  - delete_subscription(pk)
