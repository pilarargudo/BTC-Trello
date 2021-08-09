import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CardStore } from "../cardstore";
import { ListSchema } from "../listschema";

import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {

  faPlus = faPlus;
  faTrash = faTrash;
  
  @Input() list!: ListSchema;
  @Input() cardStore!: CardStore;

  @Output() deletedChange = new EventEmitter();

  displayAddCard = false;

  constructor() {}

  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }

  ngOnInit(): void {}

  allowDrop($event: any) {
    $event.preventDefault();
  }

  drop($event: any) {

    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    let target = $event.target;
    const targetClassName = target.className;

    while (target.className !== "dragAndDrop") {
      target = target.parentNode;
    }

    target = target.querySelector(".cards");

    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === "list_title") {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }

  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list!.cards!.push(cardId);
  }

  deleteCard(id: any) {
    // filtramos las tareas que no sean el id borrado
    this.list.cards = this.list!.cards!.filter(item => item !== id);
  }

  // Delete event
  deleteList(value: any) {    
    this.deletedChange.emit(this.deletedChange);
  }

}
