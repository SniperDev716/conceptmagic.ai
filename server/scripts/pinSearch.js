const axios = require('axios');

exports.pinterestSearch = async (query, _cookie, _token, _bookmarks) => {
  try {
    const searchUrl = `https://www.pinterest.com/resource/BaseSearchResource/get`;
    const cookie = `csrftoken=acf48405f24de43f431826aa40df3faa; sessionFunnelEventLogged=1; _routing_id="1a618ed3-926c-4372-b191-d927397970d5"; g_state={"i_p":1712179338984,"i_l":3}; _b="AXrI0B95c+dC2rnG6BNgQqBEhFesc6RAtMY6EhLHiw2ba45BZiNTB7IlBKDNbWP/Als="; cm_sub=denied; l_o=Vi9UVnJvSEIxYTdRb1hBbURGQnUxM3hBc1NTTVE1K2g2RzRHTnl1QzlxT2JZK2U2Z1oxMmlBbEx5VXNCWXZGKyt2QUZhbzdNdmF0dmI3alA4VnR2ZFVxbFVkNGY3Y3VsM0NXbXpydTFQSEE9JjM0MmZBWDFkRytsdTlucmlNRWkwQVRpeVdtTT0=; _auth=1; _pinterest_sess=TWc9PSZINWR5dVFNb2VhZVFUcmdkRWg0NVh4dUIxeUZ3cjl2N2dmUHlDSmhCWDZtaXF4aENHTFpxVE0veHVTbmxpT3c1Q3dVQlhkZUZ0N2JXaHAwSGFHazN2OEJBTWx2WDVTUzZFa0xKYVllckFaeHROcTNINFdmekZMbG9QWFIzeWlXSm90K2crVmJOOWowcWJncDFQcXJZRml4R01PUEE0WXRtTXV0SVhWa2NFbVgzanpuV3E1R2l2clU3a2dOSE8vb20wc2ZnTTFSKzV3QTdNdDNOZDNleldiTkUwQXRKSkswb092UEovRi8xL01KaTlwcEs5bnltNWo1OTBkK2cxUWRLUWhFTW11eHUrSnc4dU1ZYURYdjNiOWM5UGF3NGhoejZWWU5Dd2NiWmdkRFlOd3RWUzJIQkM1OEhkKzdySUliM2RNYWFEcHNNbW1YZ2xkSFhqcmoxZVNDbzFZcTQxSUJSQ3ROM2drNFZ4UVY2LzJhVDNOTE94cFBJK1NqVWNmdE44b1pvY3N1WGwyWHUrRmhDaFRBU1VuQWN0VHJpNFh1ZUhaN1RNTGQ4S2FpYWpNU2tKbjFDZjBPeG9NeHNmVUJEcHVSQWRmRDJ0WCttNlJjVCszUE1HRmVxYUFsS00wVWI5Zkh6YnZtNWNnNkJUNFdlMktyWW1TNlU0WUNBa3dzUm04MjE0d3lHZ3BETzJDbktUSGdIN1A2Um5jekJHc281dXlDRjAvRU1FemhLQnRUalpZZEJBRnVZQUlTQnZXZG5TRmUyT1FQUXRnYVlWRVkrMUVPVHZSV2NyMXhJV0lyR0dmYjlvZXRZM2huZ3NOVFNhNVc0K0pSRERPNG1iVVNKZlFaRTFPNWhFQUt0V2hNSG53aWRmYUZWRHN4ckE1M0FLNlFTS2crMkZZaUtHVTN5OWYxRjJ6M3o4ZkVEMG1YSlkwaDhjVnJZcFMzTFhDQnE0MXQrcWZEZlhWUWlkb3FQU2h4WUQzaUtlSWU0S1NXNWx0bkozaWtKcU9sNlZYMEtSSEtldUtPVVJYMlZtQjhldFVmaXczR0kzRCtiVnkzaDhwc1NVL2xZY1JpK0F6dWdMeUxqOERGSXhxSWdmTy83N0dlenNwbnBwM3B6NFFKTWROdzlVc0V5bTMwMFpON3EwVTRYTWRDUkZmdjFsLysvZElhQ3FYTCt6YXRSMGthR3MzbXFuSHA0UGhUVFBYekdpV25idFYvenpMTDk2ZFJEalc2eTJxbVA5NmpFaWdkcnc4TUpkMlJaSzNtaXNrbUdyT3Yrd1VxUGxBaldjMUJGUERGMUpWOWlwc0xGMUVvR3pBQ291N1pnQ3cwaUlZeThWYThPUGs1ZXg3S0ZEbFJHUDltNDVQbzZraUpsZHRWRmhPWHQ4NGc3YmN2L1JwL3hyajVmdGdJVDdVSDBwY05xWHpKdnVINGt0VW95RWxEWUFPVDNjK1lnem5meGwzbDNNUlpXUWlvZ1RhYngrMzBDMFFTaWttbExRQWlQeWJLc2Q5TndaK1k0Z0IzOE4yVngzVmZXcUhrZHdrOFZCNzA4N0JTZ1hkNko4YWs1WDFWUjJuVDc4Rmd4Q1Fud2tPK3doM0VhVDVFcjc2ZWtsdEZLTjNnSEYxbnhFdWxLNnBzaE1lVVkrM2prQ1FrZktFamZqSDRIbFNBK1hFSzRsUEw1MUZLWU95MXZhMmFSeWdIVEFBRTdYbk52R3hncnRKUjdqWmhQSDZTL2JUd1NQVVg3cGllMFpYcTRVUFFIdjAzNm1aZmdnQTJVbzJGMllVMEkmL2ROMWVQazl4TG13YkUxWHp6UkY5TzNXRUtrPQ==;`/* _cookie || res.headers['set-cookie'][0] */;
    const token = "acf48405f24de43f431826aa40df3faa"/* _token || cookie.split("; ")[0].split("=")[1] */;
    let res;
    // if (_bookmarks) {
      res = await axios.post(searchUrl, {
        source_url: `/search/pins/?q=${query}&rs=typed`,
        data: { "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "", "bookmarks": _bookmarks }, "context": {} },
      }, {
        headers: {
          // 'Authorization': `Bearer ${''}`,
          // "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrftoken": token,
          "Cookie": cookie
        },
      });

    // }
     /* else {
      // let params = new URLSearchParams({
      //   source_url: `/search/pins/?q=${query}&rs=typed`,
      //   data: { "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "" }, "context": {} },
      // })
      res = await axios.get(searchUrl, {
        params: {
          source_url: `/search/pins/?q=${query}&rs=typed`,
          data: JSON.stringify({ "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "" }, "context": {} }),
        }
      });
    } */

    const data = res.data.resource_response.data.results;
    // console.log(data[0]);
    const bookmarks = res.data.resource.options.bookmarks;
    // const pins = res.items;
    // console.log(bookmarks, _bookmarks);
    return {
      cookie,
      token,
      bookmarks,
      images: data.filter(item => item.images).map(item => ({
        src: item.images.orig.url,
        height: item.images.orig.height,
        width: item.images.orig.width
      }))
    }
  } catch (error) {
    console.log(error);
  }
}

// start();