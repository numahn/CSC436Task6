import Container from '../components/Container';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';

const Book = () => {
    const params = useParams();
    console.log(params)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const url = 'https://api.matgargano.com/api/books/'+params.id;
        try {
            const request = await fetch(url);
            const response = await request.json();
            console.log(response)
           
        } catch(e) {
            console.error(e.message);
        } finally {
        }
    }

    return (<Container>
        <pre>{JSON.stringify(params,0,1)}</pre>
    </Container>)
}

export default Book;