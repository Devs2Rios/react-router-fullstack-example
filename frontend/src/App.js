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
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import EventsNavigation from './components/EventsNavigation';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsNavigation />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: 'new', element: <NewEventPage /> },
          { path: ':eventId', element: <EventDetailPage /> },
          { path: ':eventId/edit', element: <EditEventPage /> },
        ]
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
