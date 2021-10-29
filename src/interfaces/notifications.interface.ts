export interface INotification {
  type: string;
  read: boolean;
  post: {
    id: string;
    title: string;
  };
  comment?: {
    id: string;
    commentText: string;
  };
  user: {
    id: string;
    name: string;
  };
}
