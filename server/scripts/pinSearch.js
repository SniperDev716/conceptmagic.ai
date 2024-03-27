const axios = require('axios');

exports.pinterestSearch = async (query, _cookie, _token, _bookmarks) => {
  try {


    const searchUrl = `https://www.pinterest.com/resource/BaseSearchResource/get`;
    let res;
    if (_bookmarks) {
      res = await axios.post(searchUrl, {
        source_url: `/search/pins/?q=${query}&rs=typed`,
        data: { "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "", "bookmarks": _bookmarks }, "context": {} },
      }, {
        headers: {
          // 'Authorization': `Bearer ${''}`,
          // "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrftoken": _token,
          "Cookie": _cookie
        },
      });

    } else {
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
    }

    const cookie = _cookie || res.headers['set-cookie'][0];
    const token = _token || cookie.split("; ")[0].split("=")[1];
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