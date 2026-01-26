export type CreateReviewPayload = {
  transactionId: string;
  restaurantId: number;
  star: 1 | 2 | 3 | 4 | 5;
  comment: string;
  menuIds: number[];
};
