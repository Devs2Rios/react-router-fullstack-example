import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetail() {
    const data = useRouteLoaderData('event-detail');
    if (data.isError) return <p>{data.message}</p>;
    return <EventItem event={data.event} />;
}

export const eventLoader = async ({ request, params }) => {
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
    if (!response.ok) {
        throw json({ message: 'Couldn\'t fetch the event' }, { status: 500 });
    }
    const data = await response.json();
    return data;
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