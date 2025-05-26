export const pingBackend = async () => {
  try {
    const response = await fetch('https://appointment-1-pq6g.onrender.com/api/auth/ping');
    const data = await response.json();
    console.log('Ping response:', data);
  } catch (error) {
    console.error('Frontend ping failed:', error.message);
  }
};
