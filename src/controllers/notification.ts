import { Request, Response } from 'express';
import { NotificationModel } from './../models';
import NotificationService from './../services/notification';

class NotificationController {
  protected name = 'Notification';
  constructor(private service: NotificationService) {
    this.getNotificationsByPostId = this.getNotificationsByPostId.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  async getNotificationsByPostId(req: Request, res: Response) {
    const notifications = await this.service.getNotificationByPostId(
      req.params.postId,
    );
    return res.send({ notifications, count: notifications.length });
  }

  async addNotification(req: Request, res: Response) {
    const notification = await this.service.insert(req.body);
    return res
      .status(201)
      .send({ notification, message: `${this.name} added successfully` });
  }

  async markNotificationAsRead(req: Request, res: Response) {
    const notifications = await this.service.markNotificationsAsRead();
    return res.status(200).send({ notifications });
  }
}

export default new NotificationController(
  new NotificationService(NotificationModel),
);
