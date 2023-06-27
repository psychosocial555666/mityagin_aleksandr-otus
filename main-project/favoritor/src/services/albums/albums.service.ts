import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  ShortAlbumType,
  AlbumType,
  AlbumInputType,
  ExternalAlbumType,
} from 'src/common/types';
import { filterBySearch } from 'src/common/utils';
import { MainService } from '../main/main.service';
import {
  MODAL_TITLES,
  SidebarModalService,
} from '../sidebar-modal/sidebar-modal.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import {
  CREATE_ALBUM,
  DELETE_ALBUM,
  GET_ALBUMS,
  GET_ALBUM_BY_ID,
  UPDATE_ALBUM,
} from './albums.queries';
import _ from "lodash";

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  private albums: ShortAlbumType[] = [];
  private filteredAlbums: ShortAlbumType[] = [];
  private currentAlbum: AlbumType | null = null;
  public list: ExternalAlbumType[] = [];
  public isDataLoading: boolean = false;
  public isSongsLoading: boolean = false;
  constructor(
    private apollo: Apollo,
    private sidebarModalService: SidebarModalService,
    private snackbarService: SnackbarService,
    private mainService: MainService,
    public router: Router
  ) {}

  setAlbums(albums: ShortAlbumType[]): void {
    this.albums = albums;
    this.filterAlbums();
  }

  setFiltered(albums: ShortAlbumType[]) {
    this.filteredAlbums = albums;
  }

  getAlbums(): ShortAlbumType[] {
    return this.albums;
  }

  getFiltered(): ShortAlbumType[] {
    return this.filteredAlbums;
  }

  setCurrentAlbum(album: AlbumType | null): void {
    this.currentAlbum = album;
  }

  getCurrentAlbum() {
    return this.currentAlbum;
  }

  updateCurrentAlbum(input: AlbumInputType): void {
    const result = { ...this.currentAlbum, ...input } as AlbumType;
    this.setCurrentAlbum(result);
  }

  includeAlbum(album: AlbumType): void {
    const result = [...this.albums];
    result.push(album);
    this.setAlbums(result);
  }

  excludeAlbum(id: string): void {
    this.setAlbums(this.albums.filter((album) => album.id !== id));
  }

  updateAlbumsWithAlbum(album: AlbumType): void {
    const index = this.albums.findIndex((a) => a.id === album.id);
    const result = [...this.albums];
    result.splice(index, 1, album);
    this.setAlbums(result);
  }

  requestAlbums() {
    this.apollo
      .query({
        query: GET_ALBUMS,
      })
      .subscribe({
        next: (value: any) => {
          const { getAlbums } = value.data;
          this.setAlbums(getAlbums);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  filterAlbums() {
    const filtered = this.albums.filter((album) =>
      filterBySearch(album, this.mainService.search)
    );
    this.setFiltered(filtered);
  }

  requestAlbumById(id: string) {
    this.apollo
      .query({
        query: GET_ALBUM_BY_ID,
        variables: {
          albumId: id,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { getAlbumById } = value.data;
          this.setCurrentAlbum(getAlbumById);
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  createAlbum(albumData: AlbumInputType) {
    this.apollo
      .mutate({
        mutation: CREATE_ALBUM,
        variables: {
          albumData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { album, error } = value.data.createAlbum;
          if (album) {
            this.snackbarService.showSnackBar('success', 'Готово!');
            this.setCurrentAlbum(album);
            this.includeAlbum(album);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  updateAlbum(albumData: AlbumInputType) {
    this.apollo
      .mutate({
        mutation: UPDATE_ALBUM,
        variables: {
          albumData,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { album, error } = value.data.updateAlbum;
          if (album) {
            this.snackbarService.showSnackBar('success', 'Изменено');
            this.setCurrentAlbum(album);
            this.updateAlbumsWithAlbum(album);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  deleteAlbum(deleteAlbumId: string) {
    this.apollo
      .mutate({
        mutation: DELETE_ALBUM,
        variables: {
          deleteAlbumId,
        },
      })
      .subscribe({
        next: (value: any) => {
          const { deleted, error } = value.data?.deleteAlbum;
          if (deleted) {
            this.snackbarService.showSnackBar('success', 'Удалено');
            this.setCurrentAlbum(null);
            this.excludeAlbum(deleteAlbumId);
          }
          if (!!error?.length) {
            this.snackbarService.showSnackBar('error', error);
          }
        },
        error: (err) => this.snackbarService.showSnackBar('error', err),
      });
  }

  getDeezerDataByName() {
    this.isDataLoading = true;
    this.isSongsLoading = true;
    fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${
        this.getCurrentAlbum()?.name || ''
      } ${this.getCurrentAlbum()?.author || ''}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '3b702e9276msha4f2d5d503fe0a5p1f5881jsn90a90e22f00f',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (!json.data) {
          this.snackbarService.showSnackBar('error', 'Данные не найдены');
          this.isDataLoading = false;
          return;
        }
        //@ts-ignore
        this.list = _.uniqBy(json.data.map((item: any) => ({
          albumId: item.album.id,
          name: item.album.title,
          logo: item.album.cover_big,
          author: item.artist.name,
        })), 'albumId');
      })
      .catch((err) => console.log(err));
  }

  onAlbumSelect(albumId: number) {
    const data = this.list.find((item: any) => item.albumId === albumId);
    this.updateCurrentAlbum(data as AlbumInputType);
    this.getDeezerAlbumInfo(albumId);
    this.list = [];
  }

  onListClose() {
    this.list = [];
    this.isDataLoading = false;
    this.isSongsLoading = false;
  }

  getDeezerAlbumInfo(id: number) {
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${id}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3b702e9276msha4f2d5d503fe0a5p1f5881jsn90a90e22f00f',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.isDataLoading = false;
        let albumFromData = {
          genre: data.genres.data.map((item: any) => item.name).join(','),
          year: data.release_date.slice(0, 4),
          songs: data.tracks.data.map((track: any) => track.title),
        };
        this.updateCurrentAlbum(albumFromData);
        this.enableEdit();
      })
      .catch((err) => console.log(err));
  }

  enableEdit() {
    this.router.navigate([
      {
        outlets: {
          modal: ['album', 'edit', this.getCurrentAlbum()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_ALBUM);
  }
}
