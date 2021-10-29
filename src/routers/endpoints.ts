import { IEndpoint } from '../interfaces/misc.interface';
import NotificationController from '../controllers/notification';

const endpoints: Array<IEndpoint> = [
  {
    route: 'notifications',
    methods: ['post'],
    middlewares: {
      post: [NotificationController.addNotification],
    },
  },
  {
    route: 'notifications/post/:postId',
    methods: ['get'],
    middlewares: {
      get: [NotificationController.getNotificationsByPostId],
    },
  },
  {
    route: 'notifications/mark-all-read',
    methods: ['patch'],
    middlewares: {
      patch: [NotificationController.markNotificationAsRead],
    },
  },
];

export default endpoints;
