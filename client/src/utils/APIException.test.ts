
import APIException from './APIException';
describe('APIException Class', () => {
    let instance: APIException;
    let response = new Response(JSON.stringify({}), { 'status': 401, 'statusText': 'test error' });
    beforeEach(() => {
        instance = new APIException('test msg', response);
    });

    it('binds an inputted Response\'s status statusCode and status to values', () => {
        expect(instance.statusCode).toBe(401);
        expect(instance.status).toBe('test error');
    });
});