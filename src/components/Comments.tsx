import React, { useState } from 'react';

import { useGetCommentsQuery, usePostCommentMutation } from '../services/API';
import { Hero, Loader, Section, Error, Comment } from '../components';

interface CommentsProps {
  targetID: string;
}

export const Comments: React.FC<CommentsProps> = ({ targetID }) => {
  const { data: comments, isLoading, isError } = useGetCommentsQuery({ targetID });

  const [addComment] = usePostCommentMutation();

  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const clickHandler = () => {
    if (content === '' || content === ' ') return;

    const newComment = {
      content,
      name,
      targetType:
        window.location.pathname.substring(1).split('/')[0] === 'movie'
          ? 'Movie'
          : 'Series',
      targetID,
    };

    addComment(newComment);
    setName('');
    setContent('');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error="Something went wrong!" />;
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments
          </h2>
        </div>
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <input
              id="name"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Name"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center dark:text-white text-gray-900 dark:bg-slate-800 bg-slate-50  rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 dark:hover:bg-teal-800 hover:bg-teal-100"
            onClick={clickHandler}
          >
            Post comment
          </button>
        </form>
        <div>
          {comments.map(
            (comment: {
              _id: string;
              name: string;
              content: string;
              createdAt: string;
            }) => {
              return (
                <Comment
                  name={comment.name}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  key={comment._id}
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Comments;
