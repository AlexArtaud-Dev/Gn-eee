const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();

async function fetchTopAiringGogoAnime(page = 1){
    return await gogoanime.fetchTopAiring(page);
}

module.exports = {
    fetchTopAiringGogoAnime: fetchTopAiringGogoAnime
}
