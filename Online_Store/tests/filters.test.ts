import { contains } from '../src/components/filters/filters';

describe('contains function', () => {
    test('should return true', () => {
        expect(contains(['Novel', 'Adventures', 'Action'], ['Adventures'])).toBeTruthy();
    });
});
