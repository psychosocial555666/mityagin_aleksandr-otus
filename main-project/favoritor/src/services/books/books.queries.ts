import { gql } from 'apollo-angular';

export const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      id
      name
      logo
      rating
      genre
      author
      createdAt
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: ID) {
    getBookById(id: $bookId) {
      id
      name
      logo
      rating
      genre
      author
      description
      impressions
      createdAt
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($bookData: NewBookInput) {
    createBook(bookData: $bookData) {
      book {
        id
        name
        logo
        rating
        genre
        author
        description
        impressions
        createdAt
      }
      error
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($bookData: BookInput) {
    updateBook(bookData: $bookData) {
      book {
        id
        name
        logo
        rating
        genre
        author
        description
        impressions
        createdAt
      }
      error
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId) {
      deleted
      error
    }
  }
`;
