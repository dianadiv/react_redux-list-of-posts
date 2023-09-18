import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAuthor } from './features/author/authorSlice';
import { fetchPosts, selectPosts } from './features/posts/postsSlice';
import { selectPost, setPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const { items, loading, hasError } = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectPost);

  useEffect(() => {
    dispatch(setPost(null));

    if (Object.keys(author).length !== 0) {
      dispatch(fetchPosts(author.id));
    }
  }, [author]);

  return (
    <main className="section">
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {(Object.keys(author).length === 0) && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {(Object.keys(author).length > 0) && loading && (
                  <Loader />
                )}

                {(Object.keys(author).length > 0) && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {Object.keys(author).length > 0 && !loading
                && !hasError && items.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loading && !hasError && items.length > 0 && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && Object.keys(selectedPost).length > 0 && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
