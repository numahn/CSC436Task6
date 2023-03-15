import Container from '../components/Container';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner' 
import { NavLink as RouterLink } from 'react-router-dom';
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
            <div className="text-sm breadcrumb"><RouterLink to="/books" className="hover:text-green-700"> Back to List</RouterLink></div>
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