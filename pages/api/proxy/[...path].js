import axios from 'axios';

export default async function handler(req, res) {
  const { path } = req.query;
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  const url = `${backendUrl}/${path.join('/')}`;
  
  try {
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      params: req.query,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { message: 'Internal Server Error' };
    return res.status(status).json(data);
  }
}
