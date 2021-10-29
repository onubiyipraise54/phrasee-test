import testDependencies from '../init';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as supertest from 'supertest';

const request = supertest(testDependencies.server);
chai.use(chaiAsPromised);
chai.should();

/**
 * Test Suite for Notifications Controller
 */
describe('Notifications Controller Test Suites', () => {
  it('Get notifications by post Id', () => {
    return request
      .get('/notifications/post/b1638f970c3ddd528671df76c4dcf13e')
      .expect(200)
      .expect((res) => {
        res.body.notifications.length.should.equal(6);
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

    return request
      .post('/notifications')
      .send(notification)
      .expect(201)
      .expect((res) => {
        res.body.notification.user.id.should.equal(
          '403f220c3d413fe9cb0b36142ebfb93d',
        );
      });
  });

  it('Update all notifications to read', () => {
    return request
      .patch('/notifications/mark-all-read')
      .expect(200)
      .expect((res) => {
        res.body.notifications.forEach((n) => {
          n.read.should.equal(true);
        });
      });
  });
});
