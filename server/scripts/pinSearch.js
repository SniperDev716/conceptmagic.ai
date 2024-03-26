const axios = require('axios');

exports.pinterestSearch = async (query, _cookie, _token, _bookmarks) => {
  try {


    const searchUrl = `https://www.pinterest.com/resource/BaseSearchResource/get`;
    let res;
    if (_bookmarks) {
      res = await axios.post(searchUrl, {
        /* headers: {
          'Authorization': `Bearer ${''}`,
        }, */
        params: {
          source_url: `/search/pins/?q=${query}&rs=typed`,
          data: { "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "" }, "context": {}, "bookmarks": _bookmarks },
        }
      });
    } else {
      res = await axios.get(searchUrl, {
        /* headers: {
          'Authorization': `Bearer ${''}`,
        }, */
        params: {
          source_url: `/search/pins/?q=${query}&rs=typed`,
          data: { "options": { "applied_filters": null, "appliedProductFilters": "---", "article": null, "auto_correction_disabled": false, "corpus": null, "customized_rerank_type": null, "domains": null, "filters": null, "first_page_size": null, "page_size": null, "price_max": null, "price_min": null, "query_pin_sigs": null, "query": query, "redux_normalize_feed": true, "rs": "typed", "scope": "pins", "source_id": null, "top_pin_id": "" }, "context": {} },
        }
      });
    }

    // console.log(res);
    const cookie = res.headers['set-cookie'][0];
    const token = cookie.split("; ")[0].split("=")[1];
    const data = res.data.resource_response.data.results;
    const bookmarks = res.data.resource.options.bookmarks;
    // const pins = res.items;
    return {
      cookie,
      token,
      bookmarks,
      images: data.map(item => ({
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