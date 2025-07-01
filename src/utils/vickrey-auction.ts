interface Winner {
  name: string
  bid: number
}

export type Bidder = {
  name: string
  bids: number[]
}

export type VickreyAuctionResult = {
  winner: string | null
  winningPrice: number
}

export function vickreyAuction(bidders: Bidder[], reservePrice: number): VickreyAuctionResult {
  const allBids: Winner[] = [];

  if (!bidders || bidders.length === 0) {
    return {
      winner: null,
      winningPrice: reservePrice,
    };
  }

  bidders.forEach((bidder: Bidder) => {
    if (bidder.bids && Array.isArray(bidder.bids)) {
      bidder.bids.forEach((bid: number) => {
        if (typeof bid === 'number' && bid >= reservePrice) {
          allBids.push({ name: bidder.name, bid });
        }
      });
    }
  });

  allBids.sort((a: Winner, b: Winner) => b.bid - a.bid);

  if (allBids.length === 0) {
    return {
      winner: null,
      winningPrice: reservePrice,
    };
  }

  const winner = allBids[0].name;
  let winningPrice = reservePrice;

  for (const { name, bid } of allBids) {
    if (name !== winner) {
      winningPrice = bid;
      break;
    }
  }

  console.log(winner, winningPrice);

  return {
    winner,
    winningPrice,
  };
}

vickreyAuction(
  [
    { name: 'A', bids: [110, 130] },
  ],
  100,
)
