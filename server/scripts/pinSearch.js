const axios = require('axios');

const start = async () => {
  try {

    const searchUrl = `https://api.pinterest.com/v5/search/pins?query=${encodeURIComponent("Logo Design")}&topic_based=true`;
    const res = await axios.get(searchUrl, {
      headers: {
        'Authorization': `Bearer ${''}`,
      },
    });

    console.log(res);
    // const pins = res.items;
  } catch (error) {
    console.log(error);
  }
}

start();