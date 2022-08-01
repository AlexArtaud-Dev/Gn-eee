const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();


async function fetchEpisodeSourcesGogoAnime(episodeID, server = null){
    return await gogoanime.fetchEpisodeSources(episodeID, server);
}

module.exports = {
    fetchEpisodeSourcesGogoAnime: fetchEpisodeSourcesGogoAnime
}
