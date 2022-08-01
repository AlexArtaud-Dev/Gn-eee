const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();

async function fetchEpisodeServersGogoAnime(episodeID){
    return await gogoanime.fetchEpisodeServers(episodeID);
}

module.exports = {
    fetchEpisodeServersGogoAnime: fetchEpisodeServersGogoAnime
}
