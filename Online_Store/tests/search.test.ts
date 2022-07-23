import { search } from '../src/components/search/search';
import { BookData } from '../src/types/types';

const data: BookData[] = [
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
    {
        id: '6',
        name: 'Moby Dick: or, the White Whale',
        cover: 'https://m.media-amazon.com/images/I/31NHy1G75uS._SY346_.jpg',
        author: 'Herman Melville',
        description:
            "A masterpiece of storytelling, this epic saga pits Ahab, a brooding and fantastical sea captain, against the great white whale that crippled him. In telling the tale of Ahab's passion for revenge and the fateful voyage that ensued, Melville produced far more than the narrative of a hair-raising journey; Moby-Dick is a tale for the ages that sounds the deepest depths of the human soul.",
        price: 27.68,
        language: 'en',
        publisher: 'WaterBrook',
        publication_year: '2022',
        pages: 1395,
        type: 'Fiction',
        category: ['Novel', 'Adventures', 'Action'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
    {
        id: '7',
        name: 'The Master and Margarita',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/41NSZENdbFL._SX322_BO1,204,203,200_.jpg',
        author: 'Mikhail Bulgakov',
        description:
            'The underground masterpiece of twentieth-century Russian fiction, this classic novel was written during Stalin’s regime and could not be published until many years after its author’s death.',
        price: 38.95,
        language: 'en',
        publisher: 'TalentSmart',
        publication_year: '1996',
        pages: 384,
        type: 'Fiction',
        category: ['Novel'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
];

const expectedResult = [
    {
        id: '6',
        name: 'Moby Dick: or, the White Whale',
        cover: 'https://m.media-amazon.com/images/I/31NHy1G75uS._SY346_.jpg',
        author: 'Herman Melville',
        description:
            "A masterpiece of storytelling, this epic saga pits Ahab, a brooding and fantastical sea captain, against the great white whale that crippled him. In telling the tale of Ahab's passion for revenge and the fateful voyage that ensued, Melville produced far more than the narrative of a hair-raising journey; Moby-Dick is a tale for the ages that sounds the deepest depths of the human soul.",
        price: 27.68,
        language: 'en',
        publisher: 'WaterBrook',
        publication_year: '2022',
        pages: 1395,
        type: 'Fiction',
        category: ['Novel', 'Adventures', 'Action'],
        favorite: false,
        inChart: false,
        qtyInChart: 0,
    },
];

describe('search function normal search', () => {
    test('should return relevant objects', () => {
        expect(search('Moby', data)).toStrictEqual(expectedResult);
    });
});

describe('search function: search with "     "', () => {
    test('should return all data with empty search', () => {
        expect(search('     ', data)).toStrictEqual(data);
    });
});

describe('search function: alert with "no search results"', () => {
    test('should call alert with "no search results"', () => {
        window.alert = jest.fn().mockReturnValue('No search results');
        search('qwerty', data);
        expect(window.alert).toBeCalledWith('No search results');
    });
});
