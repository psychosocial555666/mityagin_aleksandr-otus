import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmsService } from 'src/services/films/films.service';
import { MODAL_TITLES, SidebarModalService } from 'src/services/sidebar-modal/sidebar-modal.service';

@Component({
  selector: 'app-sidebar-modal',
  templateUrl: './sidebar-modal.component.html',
  styleUrls: ['./sidebar-modal.component.scss'],
})
export class SidebarModalComponent {
  constructor(public sidebarModalService: SidebarModalService, public filmsService: FilmsService, public router: Router,) {}

}
