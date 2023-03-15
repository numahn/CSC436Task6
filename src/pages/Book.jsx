import Container from '../components/Container';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner' 
const Book = () => {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false);
    const [res, setRes] = useState({})
    const params = useParams();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const url = 'https://api.matgargano.com/api/books/'+ params.id;
        try {
            const request = await fetch(url);
            const response = await request.json();
            console.log(response);
            setRes(response)
        } catch(e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    return (<Container>
        {!error && loading ? <div className="flex justify-center"><Oval height={600}/></div>:
        <div className="container">
            <div className="text-sm breadcrumb">Back to List</div>
            <div className="flex flex-col items-center book-card">
                <h1 className="text-3xl book-title">{res.title}</h1>
                <p className="book-author text-x1">{res.author}</p>
                <img src={res.imageURL} alt="bookimage"></img>
                <div className="book-info flex flex-row justify-between">
                    <p className="mr-3">Pages: {res.pages} pages</p>
                    <p className="mr-3">Year Published: {res.year}</p>
                </div>
                    <div className="book-info flex flex-row justify-between">
                    <p className="mr-3">Publisher: {res.publisher}</p>
                    <p className="mr-3">Book ID: {res.id}</p>
                </div>
            </div>
        </div>
        
        }
        
    </Container>)
}

export default Book;