import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Output() setPaginate: EventEmitter<{ start: number; end: number }> = new EventEmitter();

  pages: number[] = []; // pages num
  perPage: number; // number album(s) per page variable d'env 
  total: number = 0; // total albums
  numberPages: number = 0;
  currentPage: number;

  constructor(private aS: AlbumService) {
    this.perPage = this.aS.paginateNumberPage();
  }

  ngOnInit() {
    this.aS.count().subscribe(
      total => {
        this.init(total, 1);
      }
    );

    // Observable qui va recevoir le journal ...
    this.aS.sendCurrentNumberPage.subscribe(numberPage => {
      this.init(this.total, numberPage)
    });
  }

  /**
 * init : définir les paramètres de la pagination
 * 
 * @param num 
 */
  init(total: number, page: number): void {
    this.total = total;
    this.numberPages = Math.ceil(total / this.perPage);
    this.currentPage = page;
    this.pages = [];
    for (let i = 1; i < this.numberPages + 1; i++) {
      this.pages.push(i);
    }
  }

  selectedPage(page: number) {
    this.currentPage = page;
    this.setPaginate.emit(this.paginate(page));
    this.aS.currentPage(this.currentPage); // mettre à jour les autres components paginate
  }

  next() {
    if (this.currentPage >= this.numberPages) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
    }
    this.setPaginate.emit(this.paginate(this.currentPage)); // émettre la page courante
    this.aS.currentPage(this.currentPage); // mettre à jour les autres components paginate
  }

  previous() {
    if (this.currentPage == 1) {
      this.currentPage = this.numberPages;
    } else {
      this.currentPage--;
    }
    this.setPaginate.emit(this.paginate(this.currentPage));
    this.aS.currentPage(this.currentPage); // mettre à jour les autres components paginate
  }

  paginate(page: number): { start: number, end: number } {
    let start = (page - 1) * this.perPage; // 0 2
    let end = start + this.perPage; // 2 4

    return { start: start, end: end };
  }

}