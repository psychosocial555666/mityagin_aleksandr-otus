import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumType } from 'src/common/types';
import { AlbumsService } from 'src/services/albums/albums.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {
  album: AlbumType | null = null;
  constructor(
    public sidebarModalService: SidebarModalService,
    public albumsService: AlbumsService,
    public router: Router
  ) {
    this.album = this.albumsService.getCurrentAlbum();
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
}
