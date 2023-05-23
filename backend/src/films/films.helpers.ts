import { ReviewType } from './films.models';

export function getReviewType(rating: number): ReviewType {
  if (rating < 4) {
    return ReviewType.NEGATIVE;
  } else if (rating >= 4 && rating < 7) {
    return ReviewType.NEUTRAL;
  } else if (rating >= 7) {
    return ReviewType.POSITIVE;
  }
  return ReviewType.UNKNOWN;
}
