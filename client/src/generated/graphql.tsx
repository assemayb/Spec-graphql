import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<UserType>;
  getAllUsers?: Maybe<Array<UserType>>;
  isUserLoggedIn: Scalars['Boolean'];
  test: Scalars['String'];
  getThread?: Maybe<ThreadType>;
  getUserThreadsNumber: Scalars['Int'];
  listUserThreads?: Maybe<Array<ThreadType>>;
  listOtherUserThreads?: Maybe<Array<ThreadType>>;
  listThreads?: Maybe<Array<ThreadType>>;
  getThreadsNum: Scalars['Int'];
  listTopics: Array<Scalars['String']>;
  lisTopicThreads?: Maybe<Array<ThreadType>>;
  getTopicThreadsNum: Scalars['Int'];
  listThreadReplies?: Maybe<Array<ReplyType>>;
  listAllReplies?: Maybe<Array<ReplyType>>;
};


export type QueryGetThreadArgs = {
  sortBy: Scalars['String'];
  id: Scalars['Int'];
};


export type QueryListUserThreadsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryListOtherUserThreadsArgs = {
  username: Scalars['String'];
};


export type QueryListThreadsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  sortBy: Scalars['String'];
};


export type QueryLisTopicThreadsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  topic: Scalars['String'];
};


export type QueryGetTopicThreadsNumArgs = {
  topic: Scalars['String'];
};


export type QueryListThreadRepliesArgs = {
  threadId: Scalars['Int'];
};

export type UserType = {
  __typename?: 'UserType';
  username: Scalars['String'];
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  isSpec: Scalars['Boolean'];
  spec?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type ThreadType = {
  __typename?: 'ThreadType';
  id: Scalars['Int'];
  question: Scalars['String'];
  specialization: Scalars['String'];
  threadCreator: Scalars['String'];
  createdAt: Scalars['DateTime'];
  replies?: Maybe<Array<ReplyType>>;
};


export type ReplyType = {
  __typename?: 'ReplyType';
  id: Scalars['Int'];
  upvotes: Scalars['Int'];
  text: Scalars['String'];
  replyThread: Scalars['Int'];
  replySpecialist?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  loginUser?: Maybe<LoginResponse>;
  logout: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  updateUserInfo: Scalars['Boolean'];
  createThread: Scalars['Boolean'];
  updateThread: Scalars['Boolean'];
  deleteThread?: Maybe<Scalars['Boolean']>;
  addReply: Scalars['Boolean'];
  upvoteReply: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  spec?: Maybe<Scalars['String']>;
  isSpec?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateUserInfoArgs = {
  options: UserUpdateInputType;
};


export type MutationCreateThreadArgs = {
  options: CreateThreadInput;
};


export type MutationUpdateThreadArgs = {
  options: UpdateThreadInput;
  id: Scalars['Int'];
};


export type MutationDeleteThreadArgs = {
  id: Scalars['Int'];
};


export type MutationAddReplyArgs = {
  options: ReplyCreateType;
};


export type MutationUpvoteReplyArgs = {
  id: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: UserType;
};

export type UserUpdateInputType = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isSpec?: Maybe<Scalars['Boolean']>;
  spec?: Maybe<Scalars['String']>;
};

export type CreateThreadInput = {
  question: Scalars['String'];
  specialization: Scalars['String'];
  threadCreator?: Maybe<Scalars['String']>;
};

export type UpdateThreadInput = {
  question?: Maybe<Scalars['String']>;
  specialization?: Maybe<Scalars['String']>;
};

export type ReplyCreateType = {
  text: Scalars['String'];
  replyThread: Scalars['Int'];
  replySpecialist?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  threadCreated: ThreadType;
  onReplyCreated: ReplyType;
};

export type AddReplyMutationVariables = Exact<{
  text: Scalars['String'];
  replyThread: Scalars['Int'];
  replySpecialist: Scalars['Int'];
}>;


export type AddReplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addReply'>
);

export type CreateThreadMutationVariables = Exact<{
  question: Scalars['String'];
  spec: Scalars['String'];
}>;


export type CreateThreadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createThread'>
);

export type DeleteThreadMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteThreadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteThread'>
);

export type GetThreadDataQueryVariables = Exact<{
  id: Scalars['Int'];
  sortBy: Scalars['String'];
}>;


export type GetThreadDataQuery = (
  { __typename?: 'Query' }
  & { getThread?: Maybe<(
    { __typename?: 'ThreadType' }
    & Pick<ThreadType, 'question' | 'specialization' | 'threadCreator' | 'createdAt'>
    & { replies?: Maybe<Array<(
      { __typename?: 'ReplyType' }
      & Pick<ReplyType, 'id' | 'upvotes' | 'text' | 'replyThread' | 'replySpecialist'>
    )>> }
  )> }
);

export type GetThreadsNumQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThreadsNumQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getThreadsNum'>
);

export type GetTopicThreadsNumQueryVariables = Exact<{
  topic: Scalars['String'];
}>;


export type GetTopicThreadsNumQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getTopicThreadsNum'>
);

export type GetUserThreadsNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserThreadsNumberQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUserThreadsNumber'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type IsUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isUserLoggedIn'>
);

export type ListOtherUserThreadsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ListOtherUserThreadsQuery = (
  { __typename?: 'Query' }
  & { listOtherUserThreads?: Maybe<Array<(
    { __typename?: 'ThreadType' }
    & Pick<ThreadType, 'id' | 'question' | 'specialization' | 'createdAt'>
  )>> }
);

export type ListThreadsQueryVariables = Exact<{
  sortBy: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListThreadsQuery = (
  { __typename?: 'Query' }
  & { listThreads?: Maybe<Array<(
    { __typename?: 'ThreadType' }
    & Pick<ThreadType, 'id' | 'question' | 'specialization' | 'threadCreator' | 'createdAt'>
    & { replies?: Maybe<Array<(
      { __typename?: 'ReplyType' }
      & Pick<ReplyType, 'id' | 'upvotes' | 'text' | 'replyThread' | 'replySpecialist'>
    )>> }
  )>> }
);

export type ListTopicThreadsQueryVariables = Exact<{
  topic: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListTopicThreadsQuery = (
  { __typename?: 'Query' }
  & { lisTopicThreads?: Maybe<Array<(
    { __typename?: 'ThreadType' }
    & Pick<ThreadType, 'id' | 'question' | 'threadCreator' | 'createdAt'>
    & { replies?: Maybe<Array<(
      { __typename?: 'ReplyType' }
      & Pick<ReplyType, 'id' | 'upvotes' | 'text' | 'replyThread' | 'replySpecialist'>
    )>> }
  )>> }
);

export type ListUserThreadsQueryVariables = Exact<{
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListUserThreadsQuery = (
  { __typename?: 'Query' }
  & { listUserThreads?: Maybe<Array<(
    { __typename?: 'ThreadType' }
    & Pick<ThreadType, 'id' | 'question' | 'specialization' | 'createdAt'>
  )>> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'username' | 'email'>
    ) }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'username' | 'email' | 'isSpec' | 'spec'>
  )> }
);

export type OnReplyCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnReplyCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { onReplyCreated: (
    { __typename?: 'ReplyType' }
    & Pick<ReplyType, 'id' | 'text' | 'replyThread' | 'replySpecialist' | 'upvotes'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  isSpec?: Maybe<Scalars['Boolean']>;
  spec?: Maybe<Scalars['String']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  spec?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUserInfo'>
);

export type UpvoteReplyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UpvoteReplyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'upvoteReply'>
);

export type UsersListQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersListQuery = (
  { __typename?: 'Query' }
  & { getAllUsers?: Maybe<Array<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'username' | 'email'>
  )>> }
);


export const AddReplyDocument = gql`
    mutation addReply($text: String!, $replyThread: Int!, $replySpecialist: Int!) {
  addReply(
    options: {text: $text, replyThread: $replyThread, replySpecialist: $replySpecialist}
  )
}
    `;
export type AddReplyMutationFn = Apollo.MutationFunction<AddReplyMutation, AddReplyMutationVariables>;

/**
 * __useAddReplyMutation__
 *
 * To run a mutation, you first call `useAddReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReplyMutation, { data, loading, error }] = useAddReplyMutation({
 *   variables: {
 *      text: // value for 'text'
 *      replyThread: // value for 'replyThread'
 *      replySpecialist: // value for 'replySpecialist'
 *   },
 * });
 */
export function useAddReplyMutation(baseOptions?: Apollo.MutationHookOptions<AddReplyMutation, AddReplyMutationVariables>) {
        return Apollo.useMutation<AddReplyMutation, AddReplyMutationVariables>(AddReplyDocument, baseOptions);
      }
export type AddReplyMutationHookResult = ReturnType<typeof useAddReplyMutation>;
export type AddReplyMutationResult = Apollo.MutationResult<AddReplyMutation>;
export type AddReplyMutationOptions = Apollo.BaseMutationOptions<AddReplyMutation, AddReplyMutationVariables>;
export const CreateThreadDocument = gql`
    mutation createThread($question: String!, $spec: String!) {
  createThread(options: {question: $question, specialization: $spec})
}
    `;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      question: // value for 'question'
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, baseOptions);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
export const DeleteThreadDocument = gql`
    mutation deleteThread($id: Int!) {
  deleteThread(id: $id)
}
    `;
export type DeleteThreadMutationFn = Apollo.MutationFunction<DeleteThreadMutation, DeleteThreadMutationVariables>;

/**
 * __useDeleteThreadMutation__
 *
 * To run a mutation, you first call `useDeleteThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThreadMutation, { data, loading, error }] = useDeleteThreadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteThreadMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThreadMutation, DeleteThreadMutationVariables>) {
        return Apollo.useMutation<DeleteThreadMutation, DeleteThreadMutationVariables>(DeleteThreadDocument, baseOptions);
      }
export type DeleteThreadMutationHookResult = ReturnType<typeof useDeleteThreadMutation>;
export type DeleteThreadMutationResult = Apollo.MutationResult<DeleteThreadMutation>;
export type DeleteThreadMutationOptions = Apollo.BaseMutationOptions<DeleteThreadMutation, DeleteThreadMutationVariables>;
export const GetThreadDataDocument = gql`
    query getThreadData($id: Int!, $sortBy: String!) {
  getThread(id: $id, sortBy: $sortBy) {
    question
    specialization
    threadCreator
    createdAt
    replies {
      id
      upvotes
      text
      replyThread
      replySpecialist
    }
  }
}
    `;

/**
 * __useGetThreadDataQuery__
 *
 * To run a query within a React component, call `useGetThreadDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGetThreadDataQuery(baseOptions: Apollo.QueryHookOptions<GetThreadDataQuery, GetThreadDataQueryVariables>) {
        return Apollo.useQuery<GetThreadDataQuery, GetThreadDataQueryVariables>(GetThreadDataDocument, baseOptions);
      }
export function useGetThreadDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadDataQuery, GetThreadDataQueryVariables>) {
          return Apollo.useLazyQuery<GetThreadDataQuery, GetThreadDataQueryVariables>(GetThreadDataDocument, baseOptions);
        }
export type GetThreadDataQueryHookResult = ReturnType<typeof useGetThreadDataQuery>;
export type GetThreadDataLazyQueryHookResult = ReturnType<typeof useGetThreadDataLazyQuery>;
export type GetThreadDataQueryResult = Apollo.QueryResult<GetThreadDataQuery, GetThreadDataQueryVariables>;
export const GetThreadsNumDocument = gql`
    query getThreadsNum {
  getThreadsNum
}
    `;

/**
 * __useGetThreadsNumQuery__
 *
 * To run a query within a React component, call `useGetThreadsNumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsNumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsNumQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThreadsNumQuery(baseOptions?: Apollo.QueryHookOptions<GetThreadsNumQuery, GetThreadsNumQueryVariables>) {
        return Apollo.useQuery<GetThreadsNumQuery, GetThreadsNumQueryVariables>(GetThreadsNumDocument, baseOptions);
      }
export function useGetThreadsNumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadsNumQuery, GetThreadsNumQueryVariables>) {
          return Apollo.useLazyQuery<GetThreadsNumQuery, GetThreadsNumQueryVariables>(GetThreadsNumDocument, baseOptions);
        }
export type GetThreadsNumQueryHookResult = ReturnType<typeof useGetThreadsNumQuery>;
export type GetThreadsNumLazyQueryHookResult = ReturnType<typeof useGetThreadsNumLazyQuery>;
export type GetThreadsNumQueryResult = Apollo.QueryResult<GetThreadsNumQuery, GetThreadsNumQueryVariables>;
export const GetTopicThreadsNumDocument = gql`
    query getTopicThreadsNum($topic: String!) {
  getTopicThreadsNum(topic: $topic)
}
    `;

/**
 * __useGetTopicThreadsNumQuery__
 *
 * To run a query within a React component, call `useGetTopicThreadsNumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopicThreadsNumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopicThreadsNumQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useGetTopicThreadsNumQuery(baseOptions: Apollo.QueryHookOptions<GetTopicThreadsNumQuery, GetTopicThreadsNumQueryVariables>) {
        return Apollo.useQuery<GetTopicThreadsNumQuery, GetTopicThreadsNumQueryVariables>(GetTopicThreadsNumDocument, baseOptions);
      }
export function useGetTopicThreadsNumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopicThreadsNumQuery, GetTopicThreadsNumQueryVariables>) {
          return Apollo.useLazyQuery<GetTopicThreadsNumQuery, GetTopicThreadsNumQueryVariables>(GetTopicThreadsNumDocument, baseOptions);
        }
export type GetTopicThreadsNumQueryHookResult = ReturnType<typeof useGetTopicThreadsNumQuery>;
export type GetTopicThreadsNumLazyQueryHookResult = ReturnType<typeof useGetTopicThreadsNumLazyQuery>;
export type GetTopicThreadsNumQueryResult = Apollo.QueryResult<GetTopicThreadsNumQuery, GetTopicThreadsNumQueryVariables>;
export const GetUserThreadsNumberDocument = gql`
    query getUserThreadsNumber {
  getUserThreadsNumber
}
    `;

/**
 * __useGetUserThreadsNumberQuery__
 *
 * To run a query within a React component, call `useGetUserThreadsNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserThreadsNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserThreadsNumberQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserThreadsNumberQuery(baseOptions?: Apollo.QueryHookOptions<GetUserThreadsNumberQuery, GetUserThreadsNumberQueryVariables>) {
        return Apollo.useQuery<GetUserThreadsNumberQuery, GetUserThreadsNumberQueryVariables>(GetUserThreadsNumberDocument, baseOptions);
      }
export function useGetUserThreadsNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserThreadsNumberQuery, GetUserThreadsNumberQueryVariables>) {
          return Apollo.useLazyQuery<GetUserThreadsNumberQuery, GetUserThreadsNumberQueryVariables>(GetUserThreadsNumberDocument, baseOptions);
        }
export type GetUserThreadsNumberQueryHookResult = ReturnType<typeof useGetUserThreadsNumberQuery>;
export type GetUserThreadsNumberLazyQueryHookResult = ReturnType<typeof useGetUserThreadsNumberLazyQuery>;
export type GetUserThreadsNumberQueryResult = Apollo.QueryResult<GetUserThreadsNumberQuery, GetUserThreadsNumberQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const IsUserLoggedInDocument = gql`
    query IsUserLoggedIn {
  isUserLoggedIn
}
    `;

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
        return Apollo.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, baseOptions);
      }
export function useIsUserLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          return Apollo.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, baseOptions);
        }
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInQueryResult = Apollo.QueryResult<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
export const ListOtherUserThreadsDocument = gql`
    query listOtherUserThreads($username: String!) {
  listOtherUserThreads(username: $username) {
    id
    question
    specialization
    createdAt
  }
}
    `;

/**
 * __useListOtherUserThreadsQuery__
 *
 * To run a query within a React component, call `useListOtherUserThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOtherUserThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOtherUserThreadsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useListOtherUserThreadsQuery(baseOptions: Apollo.QueryHookOptions<ListOtherUserThreadsQuery, ListOtherUserThreadsQueryVariables>) {
        return Apollo.useQuery<ListOtherUserThreadsQuery, ListOtherUserThreadsQueryVariables>(ListOtherUserThreadsDocument, baseOptions);
      }
export function useListOtherUserThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOtherUserThreadsQuery, ListOtherUserThreadsQueryVariables>) {
          return Apollo.useLazyQuery<ListOtherUserThreadsQuery, ListOtherUserThreadsQueryVariables>(ListOtherUserThreadsDocument, baseOptions);
        }
export type ListOtherUserThreadsQueryHookResult = ReturnType<typeof useListOtherUserThreadsQuery>;
export type ListOtherUserThreadsLazyQueryHookResult = ReturnType<typeof useListOtherUserThreadsLazyQuery>;
export type ListOtherUserThreadsQueryResult = Apollo.QueryResult<ListOtherUserThreadsQuery, ListOtherUserThreadsQueryVariables>;
export const ListThreadsDocument = gql`
    query listThreads($sortBy: String!, $offset: Int!, $limit: Int!) {
  listThreads(sortBy: $sortBy, offset: $offset, limit: $limit) {
    id
    question
    specialization
    threadCreator
    createdAt
    replies {
      id
      upvotes
      text
      replyThread
      replySpecialist
    }
  }
}
    `;

/**
 * __useListThreadsQuery__
 *
 * To run a query within a React component, call `useListThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListThreadsQuery({
 *   variables: {
 *      sortBy: // value for 'sortBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListThreadsQuery(baseOptions: Apollo.QueryHookOptions<ListThreadsQuery, ListThreadsQueryVariables>) {
        return Apollo.useQuery<ListThreadsQuery, ListThreadsQueryVariables>(ListThreadsDocument, baseOptions);
      }
export function useListThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListThreadsQuery, ListThreadsQueryVariables>) {
          return Apollo.useLazyQuery<ListThreadsQuery, ListThreadsQueryVariables>(ListThreadsDocument, baseOptions);
        }
export type ListThreadsQueryHookResult = ReturnType<typeof useListThreadsQuery>;
export type ListThreadsLazyQueryHookResult = ReturnType<typeof useListThreadsLazyQuery>;
export type ListThreadsQueryResult = Apollo.QueryResult<ListThreadsQuery, ListThreadsQueryVariables>;
export const ListTopicThreadsDocument = gql`
    query listTopicThreads($topic: String!, $offset: Int!, $limit: Int!) {
  lisTopicThreads(topic: $topic, offset: $offset, limit: $limit) {
    id
    question
    threadCreator
    createdAt
    replies {
      id
      upvotes
      text
      replyThread
      replySpecialist
    }
  }
}
    `;

/**
 * __useListTopicThreadsQuery__
 *
 * To run a query within a React component, call `useListTopicThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListTopicThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListTopicThreadsQuery({
 *   variables: {
 *      topic: // value for 'topic'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListTopicThreadsQuery(baseOptions: Apollo.QueryHookOptions<ListTopicThreadsQuery, ListTopicThreadsQueryVariables>) {
        return Apollo.useQuery<ListTopicThreadsQuery, ListTopicThreadsQueryVariables>(ListTopicThreadsDocument, baseOptions);
      }
export function useListTopicThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTopicThreadsQuery, ListTopicThreadsQueryVariables>) {
          return Apollo.useLazyQuery<ListTopicThreadsQuery, ListTopicThreadsQueryVariables>(ListTopicThreadsDocument, baseOptions);
        }
export type ListTopicThreadsQueryHookResult = ReturnType<typeof useListTopicThreadsQuery>;
export type ListTopicThreadsLazyQueryHookResult = ReturnType<typeof useListTopicThreadsLazyQuery>;
export type ListTopicThreadsQueryResult = Apollo.QueryResult<ListTopicThreadsQuery, ListTopicThreadsQueryVariables>;
export const ListUserThreadsDocument = gql`
    query listUserThreads($offset: Int!, $limit: Int!) {
  listUserThreads(offset: $offset, limit: $limit) {
    id
    question
    specialization
    createdAt
  }
}
    `;

/**
 * __useListUserThreadsQuery__
 *
 * To run a query within a React component, call `useListUserThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUserThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUserThreadsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListUserThreadsQuery(baseOptions: Apollo.QueryHookOptions<ListUserThreadsQuery, ListUserThreadsQueryVariables>) {
        return Apollo.useQuery<ListUserThreadsQuery, ListUserThreadsQueryVariables>(ListUserThreadsDocument, baseOptions);
      }
export function useListUserThreadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUserThreadsQuery, ListUserThreadsQueryVariables>) {
          return Apollo.useLazyQuery<ListUserThreadsQuery, ListUserThreadsQueryVariables>(ListUserThreadsDocument, baseOptions);
        }
export type ListUserThreadsQueryHookResult = ReturnType<typeof useListUserThreadsQuery>;
export type ListUserThreadsLazyQueryHookResult = ReturnType<typeof useListUserThreadsLazyQuery>;
export type ListUserThreadsQueryResult = Apollo.QueryResult<ListUserThreadsQuery, ListUserThreadsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    accessToken
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    isSpec
    spec
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const OnReplyCreatedDocument = gql`
    subscription onReplyCreated {
  onReplyCreated {
    id
    text
    replyThread
    replySpecialist
    upvotes
  }
}
    `;

/**
 * __useOnReplyCreatedSubscription__
 *
 * To run a query within a React component, call `useOnReplyCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnReplyCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnReplyCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnReplyCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnReplyCreatedSubscription, OnReplyCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<OnReplyCreatedSubscription, OnReplyCreatedSubscriptionVariables>(OnReplyCreatedDocument, baseOptions);
      }
export type OnReplyCreatedSubscriptionHookResult = ReturnType<typeof useOnReplyCreatedSubscription>;
export type OnReplyCreatedSubscriptionResult = Apollo.SubscriptionResult<OnReplyCreatedSubscription>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $isSpec: Boolean, $spec: String) {
  register(
    username: $username
    email: $email
    password: $password
    isSpec: $isSpec
    spec: $spec
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      isSpec: // value for 'isSpec'
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($username: String!, $email: String!, $spec: String) {
  updateUserInfo(options: {username: $username, email: $email, spec: $spec})
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      spec: // value for 'spec'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpvoteReplyDocument = gql`
    mutation upvoteReply($id: Int!) {
  upvoteReply(id: $id)
}
    `;
export type UpvoteReplyMutationFn = Apollo.MutationFunction<UpvoteReplyMutation, UpvoteReplyMutationVariables>;

/**
 * __useUpvoteReplyMutation__
 *
 * To run a mutation, you first call `useUpvoteReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpvoteReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upvoteReplyMutation, { data, loading, error }] = useUpvoteReplyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpvoteReplyMutation(baseOptions?: Apollo.MutationHookOptions<UpvoteReplyMutation, UpvoteReplyMutationVariables>) {
        return Apollo.useMutation<UpvoteReplyMutation, UpvoteReplyMutationVariables>(UpvoteReplyDocument, baseOptions);
      }
export type UpvoteReplyMutationHookResult = ReturnType<typeof useUpvoteReplyMutation>;
export type UpvoteReplyMutationResult = Apollo.MutationResult<UpvoteReplyMutation>;
export type UpvoteReplyMutationOptions = Apollo.BaseMutationOptions<UpvoteReplyMutation, UpvoteReplyMutationVariables>;
export const UsersListDocument = gql`
    query UsersList {
  getAllUsers {
    id
    username
    email
  }
}
    `;

/**
 * __useUsersListQuery__
 *
 * To run a query within a React component, call `useUsersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersListQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersListQuery(baseOptions?: Apollo.QueryHookOptions<UsersListQuery, UsersListQueryVariables>) {
        return Apollo.useQuery<UsersListQuery, UsersListQueryVariables>(UsersListDocument, baseOptions);
      }
export function useUsersListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersListQuery, UsersListQueryVariables>) {
          return Apollo.useLazyQuery<UsersListQuery, UsersListQueryVariables>(UsersListDocument, baseOptions);
        }
export type UsersListQueryHookResult = ReturnType<typeof useUsersListQuery>;
export type UsersListLazyQueryHookResult = ReturnType<typeof useUsersListLazyQuery>;
export type UsersListQueryResult = Apollo.QueryResult<UsersListQuery, UsersListQueryVariables>;