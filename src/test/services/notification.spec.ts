import testDependencies from '../init';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
const expect = chai.expect;
chai.use(chaiAsPromised);
chai.should();

const service = testDependencies.notificationService;

/**
 * Test Suite for Notifications Service
 */
describe('Notifications Service Test Suites', () => {
  it('Get notifications by post Id', () => {
    return Promise.resolve(
      service.getNotificationByPostId('b1638f970c3ddd528671df76c4dcf13e'),
    ).then((notifications) => {
      expect(notifications.length).to.eql(6);
    });
  });

  it('Post new notification', () => {
    const notification = {
      type: 'Like',
      read: false,
      post: {
        id: 'b1638f970c3ddd528671df76c4dcf13e',
        title: 'Acme Inc dynamically scales niches worldwide',
      },
      user: {
        id: '403f220c3d413fe9cb0b36142ebfb93d',
        name: 'Praise Onubiyi',
      },
    };

    return Promise.resolve(service.insert(notification)).then(
      (notification) => {
        expect(notification.user.id).to.eql('403f220c3d413fe9cb0b36142ebfb93d');
      },
    );
  });

  it('Update all notifications to read', () => {
    return Promise.resolve(service.markNotificationsAsRead()).then(
      (notifications) => {
        notifications.forEach((n) => {
          expect(n.read).to.eql(true);
        });
      },
    );
  });
});
