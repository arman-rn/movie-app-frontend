import React from 'react';

interface CommentProps {
  name: string;
  content: string;
  createdAt: string;
}

const Comment: React.FC<CommentProps> = ({ name, content, createdAt }) => {
  return (
    <article className="p-6 mb-6 text-base bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
            {name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime="2022-02-08" title="February 8th, 2022">
              {new Date(createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
    </article>
  );
};

export default Comment;
