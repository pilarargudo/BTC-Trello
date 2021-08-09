import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CardSchema } from "../cardschema";
import { ListSchema } from "../listschema";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})

export class CardComponent implements OnInit {
  
  faTrash = faTrash;

  @Input() card!: CardSchema;
  @Input() list!: ListSchema;
 
  @Output() deletedChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}
  
  dragStart(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  // Delete event
  deleteCard(id: any) {
    this.deletedChange.emit(id);
  }

} 