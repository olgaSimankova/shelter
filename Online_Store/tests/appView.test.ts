import { getCategories } from '../src/components/appView/AppView';

const progucts = [
    {
        id: '3',
        name: 'The Three Musketeers',
        cover: 'https://m.media-amazon.com/images/I/41COSAStoNL._SY346_.jpg',
        author: 'Alexandre Dumas',
        description:
            'When d’Artagnan goes to Paris to become a Musketeer, he embarks on a swashbuckling adventure with the legendary Porthos, Athos, and Aramis. If they wish to trump the nefarious Cardinal Richelieu, it’s got to be “all for one, one for all.”',
        price: 12.99,
        language: 'en',
        publisher: 'New Harbinger Publications',
        publication_year: '2011',
        pages: 832,
        type: 'Fiction',
        category: ['Novel', 'Adventures'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
    {
        id: '4',
        name: 'The Power of Positive Thinking',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41RBZptQ4NL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
        author: 'Dr. Norman Vincent Peale',
        description:
            'An international bestseller with over five million copies in print, The Power of Positive Thinking has helped men and women around the world to achieve fulfillment in their lives through Dr. Norman Vincent Peale’s powerful message of faith and inspiration.',
        price: 2.7,
        language: 'en',
        publisher: 'Touchstone',
        publication_year: '2003',
        pages: 218,
        type: 'Self-Help',
        category: ['Inspiration'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
    {
        id: '5',
        name: 'Find Your People',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41h4+an7etL._SY344_BO1,204,203,200_.jpg',
        author: 'Jennie Allen',
        description:
            'In a world that’s both more connected and more isolating than ever before, we’re often tempted to do life alone, whether because we’re so busy or because relationships feel risky and hard. But science confirms that consistent, meaningful connection with others has a powerful impact on our well-being. We are meant to live known and loved. But so many are hiding behind emotional walls that we’re experiencing an epidemic of loneliness.',
        price: 11.54,
        language: 'en',
        publisher: 'WaterBrook',
        publication_year: '2022',
        pages: 272,
        type: 'Self-Help',
        category: ['Friendship'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
];

describe('get categories test', () => {
    test('should return aray of existing categories', () => {
        expect(getCategories(progucts)).toEqual(
            new Set<string>(['Novel', 'Adventures', 'Inspiration', 'Friendship'])
        );
    });
});
