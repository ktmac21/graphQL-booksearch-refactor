import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
  `;

export const SAVE_BOOK = gql`
mutation saveBook(
  $bookInfo: bookInfo!
  ) {
   saveBook(
     bookInfo: $bookInfo!
     ){
       _id
       description
       title
       bookId
       image
       link
       authors
    }
  }
}
`;

export const REMOVE_BOOK = gql`
mutation deleteBook(
  $bookInfo: $bookId: ID!
  ) {
   deleteBook(
     bookInfo: bookId: $ID!
     )
  }
}
  `;