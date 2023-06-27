import { Component } from '@angular/core';
import { AlbumsService } from 'src/services/albums/albums.service';
import { MainService } from 'src/services/main/main.service';
import { SidebarModalService, MODAL_TITLES } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  constructor(
    public sidebarModalService: SidebarModalService,
    public albumsService: AlbumsService,
    public mainService: MainService
  ) {}

  openAlbumCardHandler(id: string | undefined | null): void {
    if (!id) return;
    this.albumsService.requestAlbumById(id);
    this.sidebarModalService.setOpened();
    this.sidebarModalService.setTitle(MODAL_TITLES.ABOUT_ALBUM);
  }
}
