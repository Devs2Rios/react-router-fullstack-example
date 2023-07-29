import { Suspense } from "react";
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

export default function EventDetail() {
    const { event, events } = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={event}>
                    {loadedEvent => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={events}>
                    {loadedEvents => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
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

async function loadEvent(id) {
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if (!response.ok) {
        throw json({ message: 'Couldn\'t fetch the event' }, { status: 500 });
    }
    const data = await response.json();
    return data.event;
};

export const loader = async ({ request, params }) => {
    const id = params.eventId;

    return defer({
        events: loadEvents(),
        event: await loadEvent(id)
    });
};

export const action = async ({ request, params }) => {
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
        method: request.method
    });
    if (!response.ok) {
        throw json({ message: 'Couldn\'t delete the event' }, { status: 500 });
    }
    return redirect('/events');
};