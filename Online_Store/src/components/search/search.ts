import { BookData } from '../../types/types';
import './search.css';

function search(keyword: string, data: BookData[]): BookData[] {
    const results = [];
    if (keyword.trim().length === 0) {
        return data;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (
                data[i].name.toLowerCase().includes(keyword.toLowerCase()) ||
                data[i].author.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(data[i]);
            }
        }
        if (results.length === 0) {
            alert('No search results');
        }
        console.log(results);
        return results;
    }
}

export { search };
