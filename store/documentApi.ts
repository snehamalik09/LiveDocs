import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Types } from 'mongoose';

export interface IDocument extends Document {
    _id: string;
    title: string;
    ownerId: string;
    content: any;
    collaborators: {
        userId: Types.ObjectId;
        role: 'viewer' | 'editor';
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export const documentsApi = createApi({
    reducerPath: 'documentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['Document'],
    endpoints: (builder) => ({
        getDocuments: builder.query<IDocument[], void>({
            query: () => 'documents',
            providesTags: ['Document'],
        }),
        getDocumentById: builder.query<IDocument, string>({
            query: (id) => `documents/${id}`,
            providesTags: ['Document'],
        }),
        createDocument: builder.mutation<IDocument, Partial<IDocument>>({
            query: (newDoc) => ({
                url: 'documents',
                method: 'POST',
                body: newDoc,
            }),
            invalidatesTags: ['Document'],
        }),
        updateDocument: builder.mutation<IDocument, { id: string; data: Partial<IDocument> }>({
            query: ({ id, data }) => ({
                url: `documents/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Document'],
        }),
        deleteDocument: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `documents/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Document'],
        }),
    }),
});

export const {
    useGetDocumentsQuery,
    useGetDocumentByIdQuery,
    useCreateDocumentMutation,
    useUpdateDocumentMutation,
    useDeleteDocumentMutation,
} = documentsApi;
