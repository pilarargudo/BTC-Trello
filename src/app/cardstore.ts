import { CardSchema } from "./cardschema";

export class CardStore {

  cards: any = {};
  lastid: any = -1;

  addCard(card: CardSchema) {
    card.id = String(++this.lastid);
    this.cards[card.id] = card;
    return card.id;
  }

  getCard(cardId: string) {
    return this.cards[cardId];
  }

  newCard(description: string): string {
    const card = new CardSchema();
    card.description = description;
    return this.addCard(card);
  }
}