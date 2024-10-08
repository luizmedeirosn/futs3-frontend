import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ViewAction } from 'src/app/models/events/ViewAction';
import PlayerMinDTO from 'src/app/models/dto/player/response/PlayerMinDTO';
import PageMin from '../../../../models/dto/generics/response/PageMin';
import { TableLazyLoadEvent } from 'primeng/table';
import ChangePageAction from '../../../../models/events/ChangePageAction';
import Pageable from '../../../../models/dto/generics/request/Pageable';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayersTableComponent implements OnInit {
  @Input()
  public pageable!: Pageable;

  @Input()
  public previousKeyword!: string;

  @Input()
  public loading$!: BehaviorSubject<boolean>;

  @Input()
  public page!: PageMin<PlayerMinDTO>;

  // The change detection is related to the change of state of the view
  @Input()
  public playerView$!: Subject<boolean>;

  // Access to the change detector of the parent component to notify the changes
  @Input()
  public homeChangeDetectorRef!: ChangeDetectorRef;

  @Output()
  public changePageEvent: EventEmitter<ChangePageAction> = new EventEmitter();

  @Output()
  public viewEvent: EventEmitter<ViewAction> = new EventEmitter();

  public ngOnInit() {
    // Changes in the table state through positionView$ from the menubar need to be detected by the 'parent component'
    this.playerView$.subscribe(() => this.homeChangeDetectorRef.detectChanges());
  }

  public handleChangePageEvent($event: TableLazyLoadEvent): void {
    if ($event && $event.first !== undefined && $event.rows) {
      const pageNumber: number = Math.ceil($event.first / $event.rows);
      const pageSize: number = $event.rows !== 0 ? $event.rows : 5;

      const fields: string | string[] = $event.sortField ?? 'name';
      const sortField: string = Array.isArray(fields) ? fields[0] : fields;

      const sortDirection: number = $event.sortOrder ?? 1;

      this.pageable = new Pageable(this.pageable.keyword, pageNumber, pageSize, sortField, sortDirection);

      this.changePageEvent.emit({
        keyword: this.pageable.keyword,
        pageNumber,
        pageSize,
        sortField,
        sortDirection,
      });
    }
  }

  public handleFindByKeywordEvent(): void {
    if (this.pageable.keywordIsValid() && this.previousKeyword !== this.pageable.keyword.trim()) {
      this.changePageEvent.emit({
        keyword: this.pageable.keyword,
        pageNumber: this.pageable.pageNumber,
        pageSize: this.pageable.pageSize,
        sortField: this.pageable.sortField,
        sortDirection: this.pageable.sortDirection,
      });
    }
  }

  public handleViewFullDataPlayerEvent(id: number): void {
    if (id) {
      this.viewEvent.emit({
        id: id,
      });
    }
  }
}
