import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumsService } from 'src/services/albums/albums.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';
import { SnackbarService } from 'src/services/snackbar/snackbar.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.scss'],
})
export class AlbumFormComponent {
  albumEditForm;
  constructor(
    private formBuilder: FormBuilder,
    public albumsService: AlbumsService,
    private http: HttpClient,
    public router: Router,
    public sidebarModalService: SidebarModalService,
    private snackbarService: SnackbarService
  ) {
    const album = albumsService.getCurrentAlbum();
    this.albumEditForm = this.formBuilder.group({
      name: new FormControl(album?.name || '', [Validators.required]),
      year: new FormControl(album?.year || ''),
      genre: new FormControl(album?.genre || ''),
      author: new FormControl(album?.author || ''),
      impressions: new FormControl(album?.impressions || ''),
    });
  }

  public updateSongs(songs: string[]) {
    this.albumsService.updateCurrentAlbum({ songs });
  }

  onLogoUpload(target: EventTarget | null) {
    const tar = target as HTMLInputElement;
    const file: File | undefined = tar?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('logo', file);
      const upload$ = this.http.post('http://localhost:4000/albums', formData);
      upload$.subscribe({
        next: (data: any) => {
          const url = 'http://localhost:4000/' + data.url;
          this.albumsService.updateCurrentAlbum({ logo: url });
          this.snackbarService.showSnackBar('success', 'Загружено');
        },
        error: (error) => this.snackbarService.showSnackBar('error', error),
      });
    }
  }

  onSubmit(): void {
    let currentAlbum = this.albumsService.getCurrentAlbum();
    let albumData = {
      ...this.albumEditForm.value,
      logo: currentAlbum?.logo,
      rating: Number(currentAlbum?.rating),
      songs: currentAlbum?.songs,
    };
    if (currentAlbum?.id !== '-1') {
      this.albumsService.updateAlbum({ ...albumData, id: currentAlbum?.id });
    } else {
      this.albumsService.createAlbum(albumData);
    }
    this.sidebarModalService.disableEditing();
    this.backClick();
  }

  onDelete(): void {
    let currentAlbum = this.albumsService.getCurrentAlbum();
    if (currentAlbum?.id) {
      this.albumsService.deleteAlbum(currentAlbum?.id);
    }
    this.sidebarModalService.setEditClosed();
  }

  public updateRating(rating: number) {
    this.albumsService.updateCurrentAlbum({ rating });
  }

  public editClickHandler() {
    this.router.navigate([
      {
        outlets: {
          modal: ['album', 'edit', this.albumsService.getCurrentAlbum()?.id],
        },
      },
    ]);
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.EDIT_ALBUM);
  }

  public backClick() {
    if (this.albumsService.getCurrentAlbum()?.id === '-1') {
      this.sidebarModalService.setClosed();
    } else {
      this.sidebarModalService.setEditClosed();
    }
  }
}
