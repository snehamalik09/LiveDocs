import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Types } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    name: string;
    clerkId: string;
    email: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    documents: Types.ObjectId[] | IUser[];
}

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => 'user',
            providesTags: ['User'],
        }),
        getUserById: builder.query<IUser, string>({
            query: (id) => `user/${id}`,
            providesTags: ['User'],
        }),
        createUser: builder.mutation<IUser, Partial<IUser>>({
            query: (newUser) => ({
                url: 'user',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<IUser, { id: string; data: Partial<IUser> }>({
            query: ({ id, data }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUserByIdQuery, useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation
} = UserApi;
