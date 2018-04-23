export class Category {
  id: number;
  header: string;
  title: string;
  imgSrc: string;
  childs: Category[];
  categoryDetail: {
    title: string;
    description: string;
    imgSrc: string;
  }
  requestDetail: {
    text: string;
  }
  parentCategory: number;
  isDetail: boolean;
  sortOrder: number;

  constructor() {}

}
