import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { newAlbum } from 'src/common/const';
import { AlbumsService } from 'src/services/albums/albums.service';
import {
  SidebarModalService,
  MODAL_TITLES,
} from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.scss'],
})
export class AlbumAddComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public router: Router,
    public albumsService: AlbumsService
  ) {}

  public addClickHandler() {
    this.albumsService.setCurrentAlbum(newAlbum);
    this.router.navigate([{ outlets: { modal: ['album', 'edit', '-1'] } }]);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.enableEditing();
    this.sidebarModalService.setTitle(MODAL_TITLES.NEW_ALBUM);
  }
}
