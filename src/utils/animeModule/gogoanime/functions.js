const {fetchEpisodeServersGogoAnime} = require("./fetchEpisodeServers");
const {fetchEpisodeSourcesGogoAnime} = require("./fetchEpisodeSources");
const {fetchRecentEpisodesGogoAnime} = require("./fetchRecentEpisodes");
const {fetchTopAiringGogoAnime} = require("./fetchTopAiring");
const {fetchAnimeInfoGogoAnime} = require("./fetchAnimeInfo");
const {searchGogoAnime} = require("./search");

module.exports = {
    fetchEpisodeSourcesGogoAnime: fetchEpisodeSourcesGogoAnime,
    fetchRecentEpisodesGogoAnime: fetchRecentEpisodesGogoAnime,
    fetchEpisodeServersGogoAnime: fetchEpisodeServersGogoAnime,
    fetchTopAiringGogoAnime: fetchTopAiringGogoAnime,
    fetchAnimeInfoGogoAnime: fetchAnimeInfoGogoAnime,
    searchGogoAnime: searchGogoAnime
}
