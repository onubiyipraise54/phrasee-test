import { INotification } from '../interfaces/notifications.interface';

export default class NotificationService {
  constructor(private model: INotification[]) {
    this.model = model;
    this.insert = this.insert.bind(this);
    this.getNotificationByPostId = this.getNotificationByPostId.bind(this);
    this.markNotificationsAsRead = this.markNotificationsAsRead.bind(this);
  }

  __call(method: string) {
    console.log(`'${method}()' is missing!`);
  }

  async insert(doc: INotification) {
    try {
      await this.model.push(doc);
      return doc;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getNotificationByPostId(postId: string) {
    try {
      return this.model.filter((d) => d.post?.id === postId);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async markNotificationsAsRead() {
    try {
      this.model.forEach((n) => (n.read = true));
      return this.model;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
