import { ICard } from "../models/card.model";
import { customAxios } from "../api/custom-axios";
import {
  API_GET_ALL_CARDS_IN_BOARD,
  API_KEY,
  API_TOKEN,
} from "../api/api.constant";

const FIELDS_CARD =
  "id,name,desc,shortLink,start,url,desc,idBoard,idMembers,idShort,idList";

export class CardService {
  async getAllCardInBoard(boardShortCode: string): Promise<ICard[]> {
    const { data: response } = await customAxios.get<ICard[]>(
      `${API_GET_ALL_CARDS_IN_BOARD.replace("{boardId}", boardShortCode)}`,
      {
        params: {
          key: API_KEY,
          token: API_TOKEN,
          fields: FIELDS_CARD,
        },
      }
    );

    return response;
  }
}
