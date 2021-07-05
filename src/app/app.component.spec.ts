import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sudoku-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sudoku-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card span').textContent).toContain('sudoku-app');
  });

  it('should render the board', () => {
    const fixture = TestBed.createComponent(AppComponent);fixture.detectChanges();
    const app = fixture.componentInstance;
    let button = fixture.debugElement.nativeElement.querySelector('.sudoku-header button');
    button.click();
    expect(app.board[0]).toBeTruthy();
    button.click();
    expect(app.board[0]).toBeTruthy();
    button.click();
    expect(app.board[0]).toBeTruthy();
  });

  it('should highlight the selected number from the cell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.startGame();
    app.selectedValue(1);
    expect(app.hightlightNumber[1]).toBeTruthy();
    app.selectedValue(1);
    expect(app.hightlightNumber[1]).toBeFalsy();
  });

  it('should highlight the selected Tile from the board', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.startGame();
    app.selectedTile(1);
    expect(app.hightlightTile[1]).toBeTruthy();
    app.selectedTile(1);
    expect(app.hightlightTile[1]).toBeFalsy();
  });

  it('should display the value on the board', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.startGame();
    app.selectedTile(1);
    app.selectedValue(8);
    expect(app.board[0].charAt(+1)).toEqual(app.board[1].charAt(+1));
  });

  it('should complete the game', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.startGame();
    app.board =  [
      "6-5329174971485326234761859362574981549618732718293465823946517197852643456137298",
      "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
    ];
    app.selectedTile(1);
    app.selectedValue(8);
    expect(app.board[0].charAt(+1)).toEqual(app.board[1].charAt(+1));
    expect(app.isWon).toBeTruthy();
  });

  it('should not display the value on the board', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.startGame();
    app.selectedTile(1);
    app.selectedValue(9);
    tick(1501);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.board[0].charAt(+1)).not.toEqual(app.board[1].charAt(+1));
    });
  }));

});
