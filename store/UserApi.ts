import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Types } from 'mongoose';
import { IDocument } from '@/models/Document.model';

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
        getAllDocumentsById: builder.query<IDocument[], string>({
            query: (id) => `user/${id}`,
            providesTags: ['User'],
        }),
    }),
});

export const {useGetAllDocumentsByIdQuery, useGetUsersQuery} = UserApi;
