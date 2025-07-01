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

  if (bidders.length === 0) {
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

  const winner = allBids[0].name;
  let winningPrice = 0;

  for (const { name, bid } of allBids) {
    if (name !== winner) {
      winningPrice = bid;
      break;
    }
  }

  return {
    winner,
    winningPrice,
  };
}

vickreyAuction(
  [
    { name: 'A', bids: [110, 130] },
    { name: 'B', bids: [] },
    { name: 'C', bids: [125] },
    { name: 'D', bids: [105, 115, 90] },
    { name: 'E', bids: [132, 135, 140] },
  ],
  100,
)
