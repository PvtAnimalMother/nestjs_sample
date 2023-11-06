export class CreateReviewDto {
  name: string;
  title: string;
  description: string;
  rating: number;
  // productId: Types.ObjectId;
  productId: string;
}
