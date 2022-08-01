const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();

async function searchGogoAnime(query, page = 1){
    return await gogoanime.search(query, page);
}

module.exports = {
    searchGogoAnime: searchGogoAnime
}
