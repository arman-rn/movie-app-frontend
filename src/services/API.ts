import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getShowPropsType, getShowsPropsType } from '../types';
import { API_BASE_URL } from '../utils/config';

export const api = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    getShows: builder.query({
      query: ({ category, type, searchQuery, page }: getShowsPropsType) => {
        if (searchQuery) {
          return `search/${category}`;
        }

        return `${category}/${type}`;
      },
    }),

    getShow: builder.query({
      query: ({ category, id }: getShowPropsType) => `${category}/id/${id}`,
    }),

    getComments: builder.query({
      query: ({ targetID }) => `comments/${targetID}`,
    }),

    postComment: builder.mutation({
      query: (body: {
        name: string;
        content: string;
        targetType: string;
        targetID: string;
      }) => ({
        url: 'comments/add',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetShowsQuery,
  useGetShowQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
} = api;
