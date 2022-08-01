const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();

async function fetchRecentEpisodesGogoAnime(page = 1, type){
    return await gogoanime.fetchRecentEpisodes(page, type);
}

module.exports = {
    fetchRecentEpisodesGogoAnime: fetchRecentEpisodesGogoAnime
}
