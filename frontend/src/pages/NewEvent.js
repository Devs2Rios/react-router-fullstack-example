import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEvent() {
    const emptyEvent = {
        id: null,
        title: '',
        image: '',
        date: '',
        description: '',
    };
    return <EventForm method='post' event={emptyEvent} />;
}

export async function action({ request }) {
    const data = await request.formData(),
        eventData = {
            // Data extracted from the form
            id: null,
            title: data.get('title'),
            image: data.get('image'),
            date: data.get('date'),
            description: data.get('description'),
        };

    const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        // Works the same for actions and loaders
        throw json({ message: 'We couldn\'t create the event!' }, { status: response.status });
    }

    return redirect('/events');
}

