import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  me?: Maybe<User>;
  getMovies: PaginatedMovies;
  getMoviesWatched: PaginatedMovies;
  getMyMovies: PaginatedMovies;
  getPopularMovies: PaginatedMovies;
  getMovie?: Maybe<Movie>;
  getStar: Star;
};


export type QueryGetMoviesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetMoviesWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetMyMoviesArgs = {
  cursor?: Maybe<Scalars['String']>;
  creatorId: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryGetPopularMoviesArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryGetMovieArgs = {
  id: Scalars['Int'];
};


export type QueryGetStarArgs = {
  userId: Scalars['Int'];
  movieId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  secret?: Maybe<Scalars['String']>;
};

export type PaginatedMovies = {
  __typename?: 'PaginatedMovies';
  movies: Array<Movie>;
  hasMore: Scalars['Boolean'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  releasedAt?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  description: Scalars['String'];
  poster: Scalars['String'];
  reason: Scalars['String'];
  rating: Scalars['String'];
  points: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  userVotes?: Maybe<Scalars['Int']>;
  userStars?: Maybe<Scalars['Int']>;
  totalStars: Scalars['Float'];
  starStatus?: Maybe<Scalars['Int']>;
  seen?: Maybe<Scalars['Boolean']>;
};

export type Star = {
  __typename?: 'Star';
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  resetPassword: Scalars['Boolean'];
  registerUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  vote: Scalars['Boolean'];
  setStars: Scalars['Boolean'];
  addMovie: Movie;
  updateMovie?: Maybe<Movie>;
  updateSeen?: Maybe<Movie>;
  deleteMovie: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  options: UserCredentials;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  movieId: Scalars['Int'];
};


export type MutationSetStarsArgs = {
  value: Scalars['Int'];
  movieId: Scalars['Int'];
};


export type MutationAddMovieArgs = {
  input: MovieInput;
};


export type MutationUpdateMovieArgs = {
  input: MovieInput;
  id: Scalars['Int'];
};


export type MutationUpdateSeenArgs = {
  seen: Scalars['Boolean'];
  id: Scalars['Int'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserCredentials = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  secret: Scalars['String'];
};

export type MovieInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  poster: Scalars['String'];
  reason: Scalars['String'];
  rating: Scalars['String'];
};

export type MovieInfoFragment = (
  { __typename?: 'Movie' }
  & Pick<Movie, 'id' | 'createdAt' | 'updatedAt' | 'releasedAt' | 'title' | 'rating' | 'description' | 'reason' | 'poster' | 'points' | 'voteStatus' | 'seen' | 'userStars' | 'userVotes' | 'starStatus' | 'totalStars'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  ) }
);

export type MovieUpdateFragment = (
  { __typename?: 'Movie' }
  & Pick<Movie, 'id' | 'title' | 'releasedAt' | 'rating' | 'description' | 'reason' | 'poster'>
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'secret'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserCredentials;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SetStarsMutationVariables = Exact<{
  value: Scalars['Int'];
  movieId: Scalars['Int'];
}>;


export type SetStarsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setStars'>
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  movieId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type AddMovieMutationVariables = Exact<{
  input: MovieInput;
}>;


export type AddMovieMutation = (
  { __typename?: 'Mutation' }
  & { addMovie: (
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'createdAt' | 'updatedAt' | 'releasedAt' | 'title' | 'description' | 'reason' | 'poster' | 'rating' | 'creatorId'>
  ) }
);

export type DeleteMovieMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMovieMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMovie'>
);

export type UpdateMovieMutationVariables = Exact<{
  id: Scalars['Int'];
  input: MovieInput;
}>;


export type UpdateMovieMutation = (
  { __typename?: 'Mutation' }
  & { updateMovie?: Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id'>
    & MovieUpdateFragment
  )> }
);

export type UpdateSeenMutationVariables = Exact<{
  id: Scalars['Int'];
  seen: Scalars['Boolean'];
}>;


export type UpdateSeenMutation = (
  { __typename?: 'Mutation' }
  & { updateSeen?: Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id'>
    & MovieUpdateFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type GetMovieQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetMovieQuery = (
  { __typename?: 'Query' }
  & { getMovie?: Maybe<(
    { __typename?: 'Movie' }
    & MovieInfoFragment
  )> }
);

export type GetMoviesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMoviesQuery = (
  { __typename?: 'Query' }
  & { getMovies: (
    { __typename?: 'PaginatedMovies' }
    & Pick<PaginatedMovies, 'hasMore'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type GetMoviesWatchedQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMoviesWatchedQuery = (
  { __typename?: 'Query' }
  & { getMoviesWatched: (
    { __typename?: 'PaginatedMovies' }
    & Pick<PaginatedMovies, 'hasMore'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type GetMyMoviesQueryVariables = Exact<{
  limit: Scalars['Int'];
  creatorId: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetMyMoviesQuery = (
  { __typename?: 'Query' }
  & { getMyMovies: (
    { __typename?: 'PaginatedMovies' }
    & Pick<PaginatedMovies, 'hasMore'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type GetPopularMoviesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['Int']>;
}>;


export type GetPopularMoviesQuery = (
  { __typename?: 'Query' }
  & { getPopularMovies: (
    { __typename?: 'PaginatedMovies' }
    & Pick<PaginatedMovies, 'hasMore'>
    & { movies: Array<(
      { __typename?: 'Movie' }
      & MovieInfoFragment
    )> }
  ) }
);

export type GetStarQueryVariables = Exact<{
  movieId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type GetStarQuery = (
  { __typename?: 'Query' }
  & { getStar: (
    { __typename?: 'Star' }
    & Pick<Star, 'value'>
  ) }
);

export const MovieInfoFragmentDoc = gql`
    fragment MovieInfo on Movie {
  id
  createdAt
  updatedAt
  releasedAt
  title
  rating
  description
  reason
  poster
  points
  voteStatus
  seen
  userStars
  userVotes
  starStatus
  totalStars
  creator {
    id
    username
    email
  }
}
    `;
export const MovieUpdateFragmentDoc = gql`
    fragment MovieUpdate on Movie {
  id
  title
  releasedAt
  rating
  description
  reason
  poster
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment UserInfo on User {
  id
  username
  email
  secret
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...UserInfo
  }
}
    ${RegularErrorFragmentDoc}
${UserInfoFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!) {
  resetPassword(email: $email)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
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
export const RegisterDocument = gql`
    mutation Register($options: UserCredentials!) {
  registerUser(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
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
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetStarsDocument = gql`
    mutation setStars($value: Int!, $movieId: Int!) {
  setStars(value: $value, movieId: $movieId)
}
    `;
export type SetStarsMutationFn = Apollo.MutationFunction<SetStarsMutation, SetStarsMutationVariables>;

/**
 * __useSetStarsMutation__
 *
 * To run a mutation, you first call `useSetStarsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStarsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStarsMutation, { data, loading, error }] = useSetStarsMutation({
 *   variables: {
 *      value: // value for 'value'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useSetStarsMutation(baseOptions?: Apollo.MutationHookOptions<SetStarsMutation, SetStarsMutationVariables>) {
        return Apollo.useMutation<SetStarsMutation, SetStarsMutationVariables>(SetStarsDocument, baseOptions);
      }
export type SetStarsMutationHookResult = ReturnType<typeof useSetStarsMutation>;
export type SetStarsMutationResult = Apollo.MutationResult<SetStarsMutation>;
export type SetStarsMutationOptions = Apollo.BaseMutationOptions<SetStarsMutation, SetStarsMutationVariables>;
export const VoteDocument = gql`
    mutation vote($value: Int!, $movieId: Int!) {
  vote(value: $value, movieId: $movieId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      movieId: // value for 'movieId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, baseOptions);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const AddMovieDocument = gql`
    mutation addMovie($input: MovieInput!) {
  addMovie(input: $input) {
    id
    createdAt
    updatedAt
    releasedAt
    title
    description
    reason
    poster
    rating
    creatorId
  }
}
    `;
export type AddMovieMutationFn = Apollo.MutationFunction<AddMovieMutation, AddMovieMutationVariables>;

/**
 * __useAddMovieMutation__
 *
 * To run a mutation, you first call `useAddMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMovieMutation, { data, loading, error }] = useAddMovieMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMovieMutation(baseOptions?: Apollo.MutationHookOptions<AddMovieMutation, AddMovieMutationVariables>) {
        return Apollo.useMutation<AddMovieMutation, AddMovieMutationVariables>(AddMovieDocument, baseOptions);
      }
export type AddMovieMutationHookResult = ReturnType<typeof useAddMovieMutation>;
export type AddMovieMutationResult = Apollo.MutationResult<AddMovieMutation>;
export type AddMovieMutationOptions = Apollo.BaseMutationOptions<AddMovieMutation, AddMovieMutationVariables>;
export const DeleteMovieDocument = gql`
    mutation deleteMovie($id: Int!) {
  deleteMovie(id: $id)
}
    `;
export type DeleteMovieMutationFn = Apollo.MutationFunction<DeleteMovieMutation, DeleteMovieMutationVariables>;

/**
 * __useDeleteMovieMutation__
 *
 * To run a mutation, you first call `useDeleteMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMovieMutation, { data, loading, error }] = useDeleteMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMovieMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMovieMutation, DeleteMovieMutationVariables>) {
        return Apollo.useMutation<DeleteMovieMutation, DeleteMovieMutationVariables>(DeleteMovieDocument, baseOptions);
      }
export type DeleteMovieMutationHookResult = ReturnType<typeof useDeleteMovieMutation>;
export type DeleteMovieMutationResult = Apollo.MutationResult<DeleteMovieMutation>;
export type DeleteMovieMutationOptions = Apollo.BaseMutationOptions<DeleteMovieMutation, DeleteMovieMutationVariables>;
export const UpdateMovieDocument = gql`
    mutation updateMovie($id: Int!, $input: MovieInput!) {
  updateMovie(id: $id, input: $input) {
    id
    ...MovieUpdate
  }
}
    ${MovieUpdateFragmentDoc}`;
export type UpdateMovieMutationFn = Apollo.MutationFunction<UpdateMovieMutation, UpdateMovieMutationVariables>;

/**
 * __useUpdateMovieMutation__
 *
 * To run a mutation, you first call `useUpdateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovieMutation, { data, loading, error }] = useUpdateMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMovieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovieMutation, UpdateMovieMutationVariables>) {
        return Apollo.useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(UpdateMovieDocument, baseOptions);
      }
export type UpdateMovieMutationHookResult = ReturnType<typeof useUpdateMovieMutation>;
export type UpdateMovieMutationResult = Apollo.MutationResult<UpdateMovieMutation>;
export type UpdateMovieMutationOptions = Apollo.BaseMutationOptions<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const UpdateSeenDocument = gql`
    mutation updateSeen($id: Int!, $seen: Boolean!) {
  updateSeen(id: $id, seen: $seen) {
    id
    ...MovieUpdate
  }
}
    ${MovieUpdateFragmentDoc}`;
export type UpdateSeenMutationFn = Apollo.MutationFunction<UpdateSeenMutation, UpdateSeenMutationVariables>;

/**
 * __useUpdateSeenMutation__
 *
 * To run a mutation, you first call `useUpdateSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeenMutation, { data, loading, error }] = useUpdateSeenMutation({
 *   variables: {
 *      id: // value for 'id'
 *      seen: // value for 'seen'
 *   },
 * });
 */
export function useUpdateSeenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSeenMutation, UpdateSeenMutationVariables>) {
        return Apollo.useMutation<UpdateSeenMutation, UpdateSeenMutationVariables>(UpdateSeenDocument, baseOptions);
      }
export type UpdateSeenMutationHookResult = ReturnType<typeof useUpdateSeenMutation>;
export type UpdateSeenMutationResult = Apollo.MutationResult<UpdateSeenMutation>;
export type UpdateSeenMutationOptions = Apollo.BaseMutationOptions<UpdateSeenMutation, UpdateSeenMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserInfo
  }
}
    ${UserInfoFragmentDoc}`;

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
export const GetMovieDocument = gql`
    query getMovie($id: Int!) {
  getMovie(id: $id) {
    ...MovieInfo
  }
}
    ${MovieInfoFragmentDoc}`;

/**
 * __useGetMovieQuery__
 *
 * To run a query within a React component, call `useGetMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMovieQuery(baseOptions: Apollo.QueryHookOptions<GetMovieQuery, GetMovieQueryVariables>) {
        return Apollo.useQuery<GetMovieQuery, GetMovieQueryVariables>(GetMovieDocument, baseOptions);
      }
export function useGetMovieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMovieQuery, GetMovieQueryVariables>) {
          return Apollo.useLazyQuery<GetMovieQuery, GetMovieQueryVariables>(GetMovieDocument, baseOptions);
        }
export type GetMovieQueryHookResult = ReturnType<typeof useGetMovieQuery>;
export type GetMovieLazyQueryHookResult = ReturnType<typeof useGetMovieLazyQuery>;
export type GetMovieQueryResult = Apollo.QueryResult<GetMovieQuery, GetMovieQueryVariables>;
export const GetMoviesDocument = gql`
    query getMovies($limit: Int!, $cursor: String) {
  getMovies(cursor: $cursor, limit: $limit) {
    hasMore
    movies {
      ...MovieInfo
    }
  }
}
    ${MovieInfoFragmentDoc}`;

/**
 * __useGetMoviesQuery__
 *
 * To run a query within a React component, call `useGetMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMoviesQuery(baseOptions: Apollo.QueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
        return Apollo.useQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, baseOptions);
      }
export function useGetMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoviesQuery, GetMoviesQueryVariables>) {
          return Apollo.useLazyQuery<GetMoviesQuery, GetMoviesQueryVariables>(GetMoviesDocument, baseOptions);
        }
export type GetMoviesQueryHookResult = ReturnType<typeof useGetMoviesQuery>;
export type GetMoviesLazyQueryHookResult = ReturnType<typeof useGetMoviesLazyQuery>;
export type GetMoviesQueryResult = Apollo.QueryResult<GetMoviesQuery, GetMoviesQueryVariables>;
export const GetMoviesWatchedDocument = gql`
    query getMoviesWatched($limit: Int!, $cursor: String) {
  getMoviesWatched(cursor: $cursor, limit: $limit) {
    hasMore
    movies {
      ...MovieInfo
    }
  }
}
    ${MovieInfoFragmentDoc}`;

/**
 * __useGetMoviesWatchedQuery__
 *
 * To run a query within a React component, call `useGetMoviesWatchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoviesWatchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoviesWatchedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMoviesWatchedQuery(baseOptions: Apollo.QueryHookOptions<GetMoviesWatchedQuery, GetMoviesWatchedQueryVariables>) {
        return Apollo.useQuery<GetMoviesWatchedQuery, GetMoviesWatchedQueryVariables>(GetMoviesWatchedDocument, baseOptions);
      }
export function useGetMoviesWatchedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoviesWatchedQuery, GetMoviesWatchedQueryVariables>) {
          return Apollo.useLazyQuery<GetMoviesWatchedQuery, GetMoviesWatchedQueryVariables>(GetMoviesWatchedDocument, baseOptions);
        }
export type GetMoviesWatchedQueryHookResult = ReturnType<typeof useGetMoviesWatchedQuery>;
export type GetMoviesWatchedLazyQueryHookResult = ReturnType<typeof useGetMoviesWatchedLazyQuery>;
export type GetMoviesWatchedQueryResult = Apollo.QueryResult<GetMoviesWatchedQuery, GetMoviesWatchedQueryVariables>;
export const GetMyMoviesDocument = gql`
    query getMyMovies($limit: Int!, $creatorId: Int!, $cursor: String) {
  getMyMovies(cursor: $cursor, creatorId: $creatorId, limit: $limit) {
    hasMore
    movies {
      ...MovieInfo
    }
  }
}
    ${MovieInfoFragmentDoc}`;

/**
 * __useGetMyMoviesQuery__
 *
 * To run a query within a React component, call `useGetMyMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyMoviesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      creatorId: // value for 'creatorId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetMyMoviesQuery(baseOptions: Apollo.QueryHookOptions<GetMyMoviesQuery, GetMyMoviesQueryVariables>) {
        return Apollo.useQuery<GetMyMoviesQuery, GetMyMoviesQueryVariables>(GetMyMoviesDocument, baseOptions);
      }
export function useGetMyMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMoviesQuery, GetMyMoviesQueryVariables>) {
          return Apollo.useLazyQuery<GetMyMoviesQuery, GetMyMoviesQueryVariables>(GetMyMoviesDocument, baseOptions);
        }
export type GetMyMoviesQueryHookResult = ReturnType<typeof useGetMyMoviesQuery>;
export type GetMyMoviesLazyQueryHookResult = ReturnType<typeof useGetMyMoviesLazyQuery>;
export type GetMyMoviesQueryResult = Apollo.QueryResult<GetMyMoviesQuery, GetMyMoviesQueryVariables>;
export const GetPopularMoviesDocument = gql`
    query getPopularMovies($limit: Int!, $cursor: Int) {
  getPopularMovies(cursor: $cursor, limit: $limit) {
    hasMore
    movies {
      ...MovieInfo
    }
  }
}
    ${MovieInfoFragmentDoc}`;

/**
 * __useGetPopularMoviesQuery__
 *
 * To run a query within a React component, call `useGetPopularMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularMoviesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetPopularMoviesQuery(baseOptions: Apollo.QueryHookOptions<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>) {
        return Apollo.useQuery<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>(GetPopularMoviesDocument, baseOptions);
      }
export function useGetPopularMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>) {
          return Apollo.useLazyQuery<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>(GetPopularMoviesDocument, baseOptions);
        }
export type GetPopularMoviesQueryHookResult = ReturnType<typeof useGetPopularMoviesQuery>;
export type GetPopularMoviesLazyQueryHookResult = ReturnType<typeof useGetPopularMoviesLazyQuery>;
export type GetPopularMoviesQueryResult = Apollo.QueryResult<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>;
export const GetStarDocument = gql`
    query getStar($movieId: Int!, $userId: Int!) {
  getStar(movieId: $movieId, userId: $userId) {
    value
  }
}
    `;

/**
 * __useGetStarQuery__
 *
 * To run a query within a React component, call `useGetStarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStarQuery({
 *   variables: {
 *      movieId: // value for 'movieId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetStarQuery(baseOptions: Apollo.QueryHookOptions<GetStarQuery, GetStarQueryVariables>) {
        return Apollo.useQuery<GetStarQuery, GetStarQueryVariables>(GetStarDocument, baseOptions);
      }
export function useGetStarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStarQuery, GetStarQueryVariables>) {
          return Apollo.useLazyQuery<GetStarQuery, GetStarQueryVariables>(GetStarDocument, baseOptions);
        }
export type GetStarQueryHookResult = ReturnType<typeof useGetStarQuery>;
export type GetStarLazyQueryHookResult = ReturnType<typeof useGetStarLazyQuery>;
export type GetStarQueryResult = Apollo.QueryResult<GetStarQuery, GetStarQueryVariables>;