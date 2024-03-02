export interface ICard {
  id: string;
  name: string;
  shortLink: string;
  start: string;
  url: string;
  desc: string;
  idBoard: string;
  idMembers: string[];
  idShort: number;
  idList: string;
}

export interface ICardsRespone {}

export interface ITicketRevenuePerList {
  idList: string;
  tickets: number;
  revenue: number;
}
