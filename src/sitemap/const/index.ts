import { TopLevelCategory } from '../../page/models/page.model';

type RouteMap = Record<TopLevelCategory, string>;

export const CATEGORY_URL: RouteMap = {
  1: '/courses',
  2: '/services',
  3: '/books',
  4: '/products',
};
