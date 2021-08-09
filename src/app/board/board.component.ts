import { Component, OnInit } from '@angular/core';
import { CardStore } from '../cardstore';
import { ListSchema } from '../listschema';

import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  faPlus = faPlus;

  cardStore!: CardStore;

  lists!: ListSchema[];
  
  constructor() { }

  setMockData(): void {
   
    this.cardStore = new CardStore();

    const lists: ListSchema[] = [
      {
        name: 'To Do',
        cards: []
      },
      {
        name: 'Doing',
        cards: []
      },
      {
        name: 'Done',
        cards: []
      }
    ]

    this.lists = lists;
  }

  ngOnInit() {
    this.setMockData();
  }

  addList(value: string, event: any) {
    this.lists.push({name:value});
    // console.log(this.lists);
    event.preventDefault();
  }

  deleteList(value: any) {
    // filtramos las listas que no sean el id borrado
    this.lists = this.lists.filter(item => item !== value);
    // console.log(value);   
  }

}