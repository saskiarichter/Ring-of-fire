import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, DialogAddPlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game = new Game;
  currentCard: string = '';

  readonly dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game;
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card != undefined) {
        this.currentCard = card;
      }
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);

      
    }
  }

  openDialog(): void {
    const dialogRefGame = this.dialog.open(DialogAddPlayerComponent);

    dialogRefGame.afterClosed().subscribe((name: string) => {
      if (name != undefined) {
        this.game.players.push(name);
      }
      console.log(this.game);
    });
  }
}
