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
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getAllUsers?: Maybe<Array<UserType>>;
  test: Scalars['String'];
  listMyThreads?: Maybe<Array<ThreadType>>;
  listUserThread?: Maybe<Array<ThreadType>>;
  listThreads?: Maybe<Array<ThreadType>>;
};


export type QueryListUserThreadArgs = {
  id: Scalars['Int'];
};

export type UserType = {
  __typename?: 'UserType';
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type ThreadType = {
  __typename?: 'ThreadType';
  id: Scalars['Int'];
  question: Scalars['String'];
  specialization: Scalars['String'];
  threadCreator: Scalars['String'];
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
};


export type MutationRegisterArgs = {
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
  id: Scalars['Int'];
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

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: UserType;
};

export type UserUpdateInputType = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


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