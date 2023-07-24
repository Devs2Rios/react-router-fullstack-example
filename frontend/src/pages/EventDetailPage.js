import { useParams } from "react-router-dom";

export default function EventDetailPage() {
    const { eventId } = useParams();
    return <h1>Event {eventId} Detail</h1>;
}