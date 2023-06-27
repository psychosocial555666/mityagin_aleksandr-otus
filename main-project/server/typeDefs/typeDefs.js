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

  type AuthPayload {
    token: String
    user: User
    error: String
  }

  type Film {
    id: ID!
    name: String!
    type: String
    logo: String
    rating: Int
    country: String
    genre: String
    director: [String]
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
    director: [String]
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
    director: [String]
    artists: [String]
    description: String
    impressions: String
  }

  type FilmPayload {
    film: Film
    error: String
  }
  
  type FilmDeletePayload {
    deleted: Boolean
    error: String
  }
  
  type Book {
    id: ID!
    name: String!
    logo: String
    rating: Int
    genre: String
    author: String
    description: String
    impressions: String
    createdAt: String
  }

  input BookInput {
    id: ID!
    name: String
    logo: String
    rating: Int
    genre: String
    author: String
    description: String
    impressions: String
  }

  input NewBookInput {
    name: String!
    logo: String
    rating: Int
    genre: String
    author: String
    description: String
    impressions: String
  }

  type BookPayload {
    book: Book
    error: String
  }
  
  type BookDeletePayload {
    deleted: Boolean
    error: String
  }

  type Album {
    id: ID!
    name: String!
    logo: String
    rating: Int
    genre: String
    author: String
    year: String
    songs: [String]
    impressions: String
    createdAt: String
  }

  input AlbumInput {
    id: ID!
    name: String!
    logo: String
    rating: Int
    genre: String
    author: String
    year: String
    songs: [String]
    impressions: String
  }

  input NewAlbumInput {
    name: String!
    logo: String
    rating: Int
    genre: String
    author: String
    year: String
    songs: [String]
    impressions: String
  }

  type AlbumPayload {
    album: Album
    error: String
  }
  
  type AlbumDeletePayload {
    deleted: Boolean
    error: String
  }

  type Query {
    getUsers: [User]!
    getFilms: [Film]!
    getBooks: [Book]!
    getAlbums: [Book]!
    getUserById(id: ID): User
    getFilmById(id: ID): Film
    getBookById(id: ID): Book
    getAlbumById(id: ID): Album
  } 

  type Mutation {
    createUser(userData: UserInput): SignUpPayload!
    login (userLogin: String!, userPassword: String!): AuthPayload!
    updateUser(userData: UserUpdateInput): UserUpdatePayload!
    createFilm(filmData: NewFilmInput): FilmPayload
    updateFilm(filmData: FilmInput): FilmPayload
    deleteFilm(id: ID!): FilmDeletePayload
    createBook(bookData: NewBookInput): BookPayload
    updateBook(bookData: BookInput): BookPayload
    deleteBook(id: ID!): BookDeletePayload
    createAlbum(albumData: NewAlbumInput): AlbumPayload
    updateAlbum(albumData: AlbumInput): AlbumPayload
    deleteAlbum(id: ID!): AlbumDeletePayload
  }
`;
