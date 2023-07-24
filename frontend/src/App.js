// Challenge / Exercise

// 1. [x] Add five new (dummy) page components (content can be simple <h1> elements)
//    - [x] HomePage
//    - [x] EventsPage
//    - [x] EventDetailPage
//    - [x] NewEventPage
//    - [x] EditEventPage
// 2. [x] Add routing & route definitions for these five pages
//    - [x] / => HomePage
//    - [x] /events => EventsPage
//    - [x] /events/<some-id> => EventDetailPage
//    - [x] /events/new => NewEventPage
//    - [x] /events/<some-id>/edit => EditEventPage
// 3. [x] Add a root layout that adds the <MainNavigation> component above all page components
// 4. [x] Add properly working links to the MainNavigation
// 5. [x] Ensure that the links in MainNavigation receive an "active" class when active
// 6. [x] Output a list of dummy events to the EventsPage
//        Every list item should include a link to the respective EventDetailPage
// 7. [x] Output the ID of the selected event on the EventDetailPage
// [x] BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import NewEvent from './pages/NewEvent';
import EventDetail from './pages/EventDetail';
import EditEvent from './pages/EditEvent';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import EventsLayout from './components/EventsLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventsLayout />,
        children: [
          { index: true, element: <Events /> },
          { path: 'new', element: <NewEvent /> },
          { path: ':eventId', element: <EventDetail /> },
          { path: ':eventId/edit', element: <EditEvent /> },
        ]
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
