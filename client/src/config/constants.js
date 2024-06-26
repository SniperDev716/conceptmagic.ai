const constants = {
  HOST_URL: process.env.REACT_APP_HOST_URL || '/api/',
  // HOST_URL: process.env.REACT_APP_HOST_URL || 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  multipartHeaders: {
    "Content-Type": "multipart/form-data",
    Accept: 'multipart/form-data',
  },
  stripePK: 'pk_live_51NJdNuHnQ3da7QZ33oSKsSTWhiuXa43CI3X8DsJKCkikdThO0uiRbEbvmzY1VKdlKNuTlFvLmQkkcrC1HnM9MFaZ000QnQ1Hae',
  stripePK: 'pk_test_51MqDHeIhTKltFnGq3WGCHjZi5ZfUg5T8aiGVPa7XFZcrse4SGLvTjDbXDNb5inKjlOaJqHJRDv5HsPQ6tbnfsxRL00rwetwKzu',
  SOCKET_URL: '',
  // SOCKET_URL: 'http://localhost:5000',
};

export default constants;

