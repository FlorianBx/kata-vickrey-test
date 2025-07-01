import { describe, it, expect } from 'vitest';
import { vickreyAuction, type Bidder } from './vickrey-auction';

describe('vickreyAuction', () => {
  describe('Normal cases', () => {
    it('should return correct winner and price for the basic example', () => {
      const bidders: Bidder[] = [
        { name: "A", bids: [110, 130] },
        { name: "B", bids: [] },
        { name: "C", bids: [125] },
        { name: "D", bids: [105, 115, 90] },
        { name: "E", bids: [132, 135, 140] }
      ];

      const result = vickreyAuction(bidders, 100);

      expect(result.winner).toBe("E");
      expect(result.winningPrice).toBe(130);
    });

  //   it('should handle multiple bids from the same bidder', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100, 110, 120] },
  //       { name: "B", bids: [105] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(105);
  //   });
  //
  //   it('should handle ties by taking the first bidder in order', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [120] },
  //       { name: "B", bids: [120] },
  //       { name: "C", bids: [110] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(120);
  //   });
  //
  //   it('should work with exact reserve price bids', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100] },
  //       { name: "B", bids: [110] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("B");
  //     expect(result.winningPrice).toBe(100);
  //   });
  // });
  //
  // describe('Edge cases', () => {
  //   it('should return null winner when no bids meet reserve price', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [50, 80] },
  //       { name: "B", bids: [90] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBeNull();
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should return reserve price when only one valid bidder', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [150] },
  //       { name: "B", bids: [50] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should handle empty bidders array', () => {
  //     const result = vickreyAuction([], 100);
  //
  //     expect(result.winner).toBeNull();
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should handle bidders with only empty bid arrays', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [] },
  //       { name: "B", bids: [] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBeNull();
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should handle all bids from winning bidder scenario', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100, 110, 120, 130] },
  //       { name: "B", bids: [50] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(100);
  //   });
  // });
  //
  // describe('Input validation', () => {
  //   it('should handle null/undefined bidders gracefully', () => {
  //     const result = vickreyAuction(null as any, 100);
  //
  //     expect(result.winner).toBeNull();
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should handle negative reserve price', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [10] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, -10);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(-10);
  //   });
  //
  //   it('should handle invalid bid values', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100, null as any, undefined as any, "invalid" as any] },
  //       { name: "B", bids: [110] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("B");
  //     expect(result.winningPrice).toBe(100);
  //   });
  //
  //   it('should handle bidders without bids property', () => {
  //     const bidders = [
  //       { name: "A" }, // Missing bids property
  //       { name: "B", bids: [110] }
  //     ] as Bidder[];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("B");
  //     expect(result.winningPrice).toBe(100);
  //   });
  // });
  //
  // describe('Complex scenarios', () => {
  //   it('should handle large number of bidders', () => {
  //     const bidders: Bidder[] = Array.from({ length: 100 }, (_, i) => ({
  //       name: `Bidder${i}`,
  //       bids: [100 + i, 150 + i]
  //     }));
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("Bidder99");
  //     expect(result.winningPrice).toBe(248);
  //   });
  //
  //   it('should handle decimal values', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100.50, 110.75] },
  //       { name: "B", bids: [105.25] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("A");
  //     expect(result.winningPrice).toBe(105.25);
  //   });
  //
  //   it('should maintain precision with floating point numbers', () => {
  //     const bidders: Bidder[] = [
  //       { name: "A", bids: [100.01] },
  //       { name: "B", bids: [100.02] }
  //     ];
  //
  //     const result = vickreyAuction(bidders, 100);
  //
  //     expect(result.winner).toBe("B");
  //     expect(result.winningPrice).toBe(100.01);
  //   });
  });
});
