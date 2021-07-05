import {Component} from '@angular/core';
import {BOARD_LENGTH, EASY, HARD, MEDIUM, NUMBER_SEQUENCE} from "../shared/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'sudoku-app';
  public selectedLevel: string = "";
  public board = ["", ""];
  public boardLength = BOARD_LENGTH;
  public numbersequence = NUMBER_SEQUENCE;
  public hightlightNumber: Array<boolean> = [];
  public hightlightTile: Array<boolean> = [];
  public highlightIncorrect: Array<boolean> = [];
  public isWon = false;
  private previousNumber: number = 0;
  private previousTile: number = 0;
  private selectedNumber: string = "";
  private selectedTileValue: string = "";

  public startGame(): void {
    if (!this.selectedLevel || this.selectedLevel === 'hard') {
      this.board = [...EASY];
      this.selectedLevel = 'easy';
    } else if (this.selectedLevel === 'easy') {
      this.board = [...MEDIUM];
      this.selectedLevel = 'medium';
    } else {
      this.board = [...HARD];
      this.selectedLevel = 'hard';
    }
    this.resetAll();
  }

  public selectedValue(cellValue: number): void {
    if (this.previousNumber && this.previousNumber === cellValue) {
      this.hightlightNumber[cellValue] = !this.hightlightNumber[cellValue];
      this.selectedNumber = "";
    } else {
      this.previousNumber = cellValue;
      this.hightlightNumber = [];
      this.hightlightNumber[cellValue] = true;
      this.selectedNumber = cellValue.toString();
    }
    this.updateMove();
  }

  public selectedTile(boardValue: number): void {
    if (this.previousTile && this.previousTile === boardValue) {
      this.hightlightTile[boardValue] = !this.hightlightTile[boardValue];
      this.selectedTileValue = "";
    } else {
      this.previousTile = boardValue;
      this.hightlightTile = [];
      this.hightlightTile[boardValue] = true;
      this.selectedTileValue = boardValue.toString();
    }
    this.updateMove();
  }

  private updateMove(): void {
    // If number and tile are selected
    if (this.selectedTileValue && this.selectedNumber) {
      this.board[0] = this.board[0].substring(0, +this.selectedTileValue) + this.selectedNumber + this.board[0].substring(+this.selectedTileValue + 1);
      // For incorrect scenario
      if (this.board[1].charAt(+this.selectedTileValue) !== this.board[0].charAt(+this.selectedTileValue)) {
        this.highlightIncorrect[+this.selectedTileValue] = true;
        let that = this;
        setTimeout(function () {
          that.board[0] = that.board[0].substring(0, +that.selectedTileValue) + '-' + that.board[0].substring(+that.selectedTileValue + 1);
          that.resetAll();
        }, 1500);
      } else {
        this.resetAll();
        if(this.board[0] === this.board[1]) {
          this.isWon = true;
        }
      }
    }
  }

  private resetAll(): void {
    this.resetNumber();
    this.resetTile();
    this.resetPreviousSelection();
    this.isWon = false;
  }

  private resetPreviousSelection(): void {
    this.previousTile = 0;
    this.previousNumber = 0;
  }

  private resetTile(): void {
    this.highlightIncorrect = [];
    this.hightlightTile = [];
    this.selectedTileValue = "";
  }

  private resetNumber(): void {
    this.hightlightNumber = [];
    this.selectedNumber = "";
  }
}
