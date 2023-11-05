import { UserQueries } from "../queries/UserQueries.js";
import { FilmQueries } from "../queries/FilmQueries.js";
import { BookQueries } from "../queries/BookQueries.js";
import { AlbumQueries } from "../queries/AlbumQueries.js";
import { UserMutations } from "../mutations/UserMutations.js";
import { FilmMautations } from "../mutations/FilmMutations.js";
import { BookMutations } from "../mutations/BookMutations.js";
import { AlbumMutations } from "../mutations/AlbumMutations.js";

export const resolvers = {
  Query: {
    ...UserQueries,
    ...FilmQueries,
    ...BookQueries,
    ...AlbumQueries,
  },
  Mutation: {
    ...UserMutations,
    ...FilmMautations,
    ...BookMutations,
    ...AlbumMutations,
  },
};
