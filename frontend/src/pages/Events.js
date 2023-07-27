import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

export default function Events() {
    const data = useLoaderData();
    if (data.isError) return <p>{data.message}</p>;
    return <EventsList events={data.events} />;
}

export const eventsLoader = async () => {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        throw new Response('Couldn\'t fetch events', { status: 500 });
    }
    const data = await response.json();
    return data;
};