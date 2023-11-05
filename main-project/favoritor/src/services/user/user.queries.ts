import { gql } from "apollo-angular";

export const CREATE_USER = gql`
  mutation CreateUser($userData: UserInput) {
    createUser(userData: $userData) {
      user {
        id
        login
        userName
      }
      error
    }
  }
`;

export const LOGIN = gql`
  mutation Login($login: String!, $password: String!) {
    login(userLogin: $login, userPassword: $password) {
      token
      error
      user {
        about
        userName
        id
        login
        avatar
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userData: UserUpdateInput) {
    updateUser(userData: $userData) {
      user {
        about
        avatar
        userName
        login
      }
      error
    }
  }
`;