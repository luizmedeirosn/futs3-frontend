import { Component, Input } from '@angular/core';
import { PlayerMinDTO } from 'src/app/models/interfaces/player/response/PlayerMinDTO';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: []
})
export class PlayersTableComponent {

    @Input()
    public players: Array<PlayerMinDTO> = [];

}
