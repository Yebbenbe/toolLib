import React, { useEffect, useState } from 'react';
import '../styles/RequestHistoryPage.scss';
import Navigation from 'components/NavigationBar';

const RequestHistoryPage = () => {
    const [histories, setHistories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const response = await fetch('http://localhost:3005/requests', {
                    method: 'GET',
                    credentials: 'include', // Ensure cookies are included
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistories(data.requests);
            } catch (error) {
                setError('There was a problem fetching the request histories');
                console.error('Error:', error);
            }
        };

        fetchHistories();
    }, []);

    return (
      <div className="request-history-page">
          <Navigation />
          <div className='request-history-content'>
              <h1>Request Histories</h1>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <ul>
                  {histories.map((history) => (
                      <li key={history.RequestID}>
                          <p>Tool ID: {history.ToolID}</p>
                          <p>Borrower ID: {history.BorrowerID}</p>
                          <p>Owner ID: {history.OwnerID}</p>
                          <p>Status: {history.Status}</p>
                          <p>Request Date: {new Date(history.RequestDate).toLocaleString()}</p>
                          <p>Approve Date: {history.ApproveDate ? new Date(history.ApproveDate).toLocaleString() : 'N/A'}</p>
                          <p>Borrow Date: {history.BorrowDate ? new Date(history.BorrowDate).toLocaleString() : 'N/A'}</p>
                          <p>Return Date: {history.ReturnDate ? new Date(history.ReturnDate).toLocaleString() : 'N/A'}</p>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
};

export default RequestHistoryPage;
