import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store';
import { increment, decrement } from './store/counterSlice';
import ErrorBoundary from './ErrorBoundary';
import './styles.css';

// Lazy load the remote components
const MockAuthComponent = React.lazy(() => import('auth/MockAuthComponent'));
const MockTicketComponent = React.lazy(() => import('ticket/MockTicketComponent'));
const MockNotificationComponent = React.lazy(() => import('notification/MockNotificationComponent'));

// Loading component
const Loading = () => (
  <div style={{ padding: '20px', border: '2px dashed gray', margin: '10px' }}>
    Loading component...
  </div>
);

function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="counter">
      <h2>Shared Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <h1>Host Application</h1>
      <Counter />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/auth">Auth</Link></li>
          <li><Link to="/ticket">Ticket</Link></li>
          <li><Link to="/notification">Notification</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<p>Welcome to the Host Application</p>} />
        <Route path="/auth" element={
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MockAuthComponent />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="/ticket" element={
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MockTicketComponent />
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="/notification" element={
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MockNotificationComponent />
            </Suspense>
          </ErrorBoundary>
        } />
      </Routes>
    </div>
  );
}

export default App;
