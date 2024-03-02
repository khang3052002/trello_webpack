import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TicketRevenueComponent from "../ui/ticket-revenue/ticket-revenue.component";
import { CardService } from "../services/card.service";
import { ICard, ITicketRevenuePerList } from "../models/card.model";

let intervalId: NodeJS.Timeout;
let testId: NodeJS.Timeout;
const data = [
  { num_ticket: 2, money: 100 },
  { num_ticket: 3, money: 200 },
  { num_ticket: 4, money: 300 },
  { num_ticket: 5, money: 100 },
  { num_ticket: 2, money: 100 },
  { num_ticket: 2, money: 100 },
  { num_ticket: 2, money: 100 },
  { num_ticket: 1, money: 100 },
  { num_ticket: 2, money: 100 },
  { num_ticket: 23, money: 100 },
];

const url = window.location.href;
const regexBoardUrl = /https:\/\/trello\.com\/b\/([^\/]+)\/([^\/]+)-([^\/]+)/;
const matches = url.match(regexBoardUrl);
const shortCodeBoard = matches ? matches[1] : "";

const App = () => {
  const cardService = new CardService();

  const [cards, setCards] = useState<ICard[]>([]);
  const [cardGroupByList, setCardGroupByList] =
    useState<Record<string, ICard[]>>();
  const [ticketRevenueLists, setTicketRevenueLists] = useState<
    ITicketRevenuePerList[]
  >([]);

  const groupByList = (cards: ICard[]): Record<string, ICard[]> => {
    return cards.reduce((accumulator, card) => {
      if (!accumulator[card.idList]) {
        accumulator[card.idList] = [];
      }
      accumulator[card.idList].push(card);
      return accumulator;
    }, {} as Record<string, ICard[]>);
  };

  const statisticTicketRevenuePerList = (record: Record<string, ICard[]>) => {
    const ticketRevenueList: ITicketRevenuePerList[] = [];

    for (const [idList, cards] of Object.entries(record)) {
      var totalRevenue = 0;
      cards.forEach((card, index) => {
        const priceMatch = card.desc.toUpperCase().match(/PRICE=\$(\d+)/);

        if (priceMatch) {
          const price = parseInt(priceMatch[1], 10);

          totalRevenue = totalRevenue + price;
        } else {
          console.log("No price found in the string.");
        }
      });

      ticketRevenueList.push({
        idList,
        tickets: cards.length,
        revenue: totalRevenue,
      });
    }

    console.log("Da vao day");
    setTicketRevenueLists(ticketRevenueList);
  };

  useEffect(() => {
    const getAllCardInBoard = async () => {
      try {
        const data = await cardService.getAllCardInBoard(shortCodeBoard);
        const groupedCards = groupByList(data);

        setCardGroupByList(groupedCards);
        setCards(data);
        statisticTicketRevenuePerList(groupedCards);
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (shortCodeBoard) {
      getAllCardInBoard();
    }
  }, [shortCodeBoard]);

  useEffect(() => {
    if (document && ticketRevenueLists.length > 0) {
      const divElements = document.querySelectorAll(
        '[data-testid="list-wrapper"]'
      );

      if (divElements.length > 0 && divElements) {
        //   console.log("lien tuc vao day");
        divElements.forEach((item, index) => {
          console.log(item);

          if (item instanceof HTMLElement) {
            console.log(item.getAttribute("data-list-id"));
            const idList = item.getAttribute("data-list-id");
            const element = item.querySelector('[data-testid="list-header"]');

            let lastElement = element?.lastElementChild;

            if (lastElement instanceof HTMLElement) {
              lastElement.style.height = "unset";
              lastElement.classList.add("ticket-revenue");

              const ticketRevenueInList = ticketRevenueLists.find(
                (item) => item.idList === idList
              );

              console.log("ticket tim: ", ticketRevenueInList);

              if (ticketRevenueInList) {
                ReactDOM.render(
                  <TicketRevenueComponent
                    key={ticketRevenueInList.idList}
                    num_ticket={ticketRevenueInList.tickets}
                    revenue={ticketRevenueInList.revenue}
                  />,
                  lastElement
                );
              }
            }
          }
        });
      }
    }
  }, [ticketRevenueLists]);

  return null;
};

export default App;
