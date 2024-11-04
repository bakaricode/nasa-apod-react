import { useState } from 'react';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  function apiCall() {
    fetch('https://api.nasa.gov/planetary/apod?start_date=2024-08-25&end_date&api_key=8aSuka3r4tfHhgIVQT3Gq6ltlbEHvQW3as8ygWwR')
      .then(response => response.json())
      .then(data => {
        const slicedData = data.slice(-3); // Get the last 3 photos
        setPhotos(slicedData); // Store them in state
      })
      .catch(error => setError('Error: ' + error.message));
  }

  // Event handler to reset photos
  function handleReset() {
    setPhotos([]); // Clear photos from state
  }

  return (
    <div className="App">
      <h1>NASA Photo of the Day</h1>
      
      {/* Button to fetch photos */}
      <button onClick={apiCall}>Click here to see photos!</button>
      
      {/* Render any errors */}
      {error && <p>{error}</p>}

      {/* Render photos dynamically */}
      <div className="card-container">
        {photos.map((photo, index) => (
          <div key={index} className="card">
            <h3>{photo.title}</h3>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.explanation}</p>
            <p><a href={photo.url} target="_blank" rel="noopener noreferrer">View the Photo Here!</a></p>
          </div>
        ))}
      </div>
      
      {/* Button to reset the view */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
