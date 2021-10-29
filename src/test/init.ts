import NotificationModel from '../models/notification';
import NotificationService from '../services/notification';

import server from '../../bootstrap';

const notificationService = new NotificationService(NotificationModel);

export default {
  server,
  notificationService,
};
