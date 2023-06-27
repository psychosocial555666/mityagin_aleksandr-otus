import { Component } from '@angular/core';
import { AlbumsService } from 'src/services/albums/albums.service';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.scss']
})
export class AlbumPreviewComponent {
  constructor(public albumsService: AlbumsService) {}
}
