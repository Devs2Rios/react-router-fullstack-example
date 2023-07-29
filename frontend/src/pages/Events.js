import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';

export default function Events() {
    const { events } = useLoaderData();
    // Await allows us to wait for the data to be loaded before rendering the component
    // Suspense allows to render something while other stuff happens
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={events}>{
                loadedEvents => <EventsList events={loadedEvents} />
            }
            </Await>
        </Suspense>
    );
}

async function loadEvents() {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
        throw json({ message: 'Couldn\'t fetch events' }, { status: 500 });
    }
    const data = await response.json();
    return data.events;
}

export const loader = async () => {
    return defer({
        events: loadEvents()
        // Defer allows us to load the data asynchronously and resolve it when it's ready
    });
};