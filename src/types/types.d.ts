export interface IArticleCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url?: string;
  isPending?: boolean;
}

interface IArticleSource {
    id: string;
    name: string;
}

export interface IArticleData {
  source: IArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleModalProps {
  isOpen: boolean;
  onCancel: () => void;
  article: IArticleCardProps;
}

export interface IUserProfileForm {
    email: string;
    password: string;
}

export interface IPrivateRouteProps {
    element: any;
    path: string;
}

export interface IPageData{
  page: number;
  totalPages: number;
  articles: any[];
}