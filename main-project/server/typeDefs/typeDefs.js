export const typeDefs = `
  input UserInput {
    login: String!
    userName: String!
    password: String!
  }

  input UserUpdateInput {
    userName: String
    password: String
    avatar: String
    about: String
  }  

  type SignUpPayload {
    user: User
    error: String
  }

  type UserUpdatePayload {
    user: User
    error: String
  }
 
  type User {
    id: ID!
    login: String!
    userName: String!
    avatar: String
    about: String
  }

  type Film {
    id: ID!
    name: String!
    type: String
    logo: String
    rating: Int
    country: String
    genre: String
    director: String
    artists: [String]
    description: String
    impressions: String
    createdAt: String
  }

  input FilmInput {
    id: ID!
    name: String
    type: String
    logo: String
    rating: Int
    country: String
    genre: String
    director: String
    artists: [String]
    description: String
    impressions: String
  }

  input NewFilmInput {
    name: String!
    type: String
    logo: String
    rating: Int
    country: String
    genre: String
    director: String
    artists: [String]
    description: String
    impressions: String
  }

  type AuthPayload {
    token: String
    user: User
    error: String
  }

  type FilmDeletePayload {
    deleted: Boolean
    error: String
  }

  type Query {
    getUsers: [User]!
    getFilms: [Film]!
    getUserById(id: ID): User
    getFilmById(id: ID): Film
  } 

  type Mutation {
    createUser(userData: UserInput): SignUpPayload!
    login (userLogin: String!, userPassword: String!): AuthPayload!
    updateUser(userData: UserUpdateInput): UserUpdatePayload!
    createFilm(filmData: NewFilmInput): Film!
    updateFilm(filmData: FilmInput): Film!
    deleteFilm(id: ID!): FilmDeletePayload
  }

`;
