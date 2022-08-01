const { ANIME } = require('@consumet/extensions')
const gogoanime = new ANIME.Gogoanime();

async function fetchAnimeInfoGogoAnime(id){
    return await gogoanime.fetchAnimeInfo(id);
}

module.exports = {
    fetchAnimeInfoGogoAnime: fetchAnimeInfoGogoAnime
}
