const {searchGogoAnime, fetchAnimeInfoGogoAnime, fetchEpisodeServersGogoAnime, fetchTopAiringGogoAnime} = require("../../../animeModule/gogoanime/functions");
const {GneeEmbedProvider} = require("../../../../providers/EmbedProvider");
const {MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const {truncate} = require("../../other/string");

async function search(interaction, name, page = 1, updateEmbed = false) {
    let data, row, embed, previousButton, nextButton, deleteButton, selectMenu, selectRow;
    let options = [];
    let distinctResults = [];
    const embedProvider =  new GneeEmbedProvider();
    if (!name) return interaction.reply("Please provide an anime name.");
    try {
        data = await searchGogoAnime(name, page);
        if (!updateEmbed) {
            if (data.results.length === 0) {
                return interaction.reply({content: "No results found.", components: []});
            }
        } else {
            if (data.results.length === 0) {
                return interaction.update({content: "No results found.", components: []});
            }
        }
    }catch (e) {
        if (updateEmbed) return interaction.reply({ content: "No results found." , components: [] });
        else return interaction.update({ content: "No results found." , components: [] });
    }
    data.searchName = name;
    embed = await embedProvider.generateEmbed("AnimeSearch", data, null);
    data.results.forEach(anime => {
        if (!distinctResults.includes(anime.id)) {
            options.push(
              {
                  label: truncate(anime.title, 95),
                  value: anime.id
              }
            );
            distinctResults.push(anime.id);
        }
    });
    row = new MessageActionRow()
    previousButton = new MessageButton().setCustomId("previousButtonSearch").setLabel("←").setStyle("PRIMARY");
    nextButton = new MessageButton().setCustomId("nextButtonSearch").setLabel("→").setStyle("PRIMARY");
    deleteButton = new MessageButton().setCustomId("deleteInteractionButton").setLabel("X").setStyle("DANGER");
    selectMenu = new MessageSelectMenu().setCustomId("searchAnimeSelector").setPlaceholder("Choose an anime").addOptions(options);
    selectRow = new MessageActionRow().addComponents(selectMenu);
    if (data.currentPage === 1 && data.hasNextPage) {
        row.addComponents(deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (data.currentPage !== 1 && data.hasNextPage) {
        row.addComponents(previousButton, deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (!data.hasNextPage && data.currentPage !== 1) {
        row.addComponents(previousButton, deleteButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    } else {
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow] });
        else interaction.reply({ embeds: [embed], components: [selectRow] });
    }
}

async function getAnimeInfos(selectMenu) {
    let embedProvider = new GneeEmbedProvider();
    const data = await fetchAnimeInfoGogoAnime(selectMenu.values[0]);
    let animeInfoEmbed = await embedProvider.generateEmbed("AnimeInfo", data, null);
    await selectMenu.reply({ embeds: [animeInfoEmbed] });
    await selectMenu.message.delete();
}

async function stream(interaction, episode) {
    let data, embed;
    let rowArray = [];
    const embedProvider =  new GneeEmbedProvider();
    embed = await embedProvider.generateEmbed("AnimeStream", null, null);
    try {
        data = await fetchEpisodeServersGogoAnime(episode);
    }catch (e) {
        return interaction.reply("No results found.");
    }
    const chunkSize = 4;
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        let e = new MessageActionRow();
        chunk.forEach(server => {
            e.addComponents(
              new MessageButton()
                .setURL(server.url)
                .setLabel(server.name)
                .setStyle("LINK")
            )
        });
        rowArray.push(e);
    }

    interaction.reply({embeds: [embed], components: rowArray});
}

async function topAiring(interaction, page = 1, updateEmbed = false) {
    let data, row, embed, previousButton, nextButton, deleteButton, selectMenu, selectRow;
    let options = [];
    let distinctResults = [];
    const embedProvider =  new GneeEmbedProvider();
    try {
        data = await fetchTopAiringGogoAnime(page);
        if (!updateEmbed) {
            if (data.results.length === 0) {
                return interaction.reply({content: "No top airing anime found.", components: []});
            }
        } else {
            if (data.results.length === 0) {
                return interaction.update({content: "No top airing anime found.", components: []});
            }
        }
    }catch (e) {
        if (updateEmbed) return interaction.reply({ content: "No top airing anime found." , components: [] });
        else return interaction.update({ content: "No top airing anime found." , components: [] });
    }
    embed = await embedProvider.generateEmbed("AnimeTopAiring", data, null);
    data.results.forEach(anime => {
        if (!distinctResults.includes(anime.id)) {
            options.push(
              {
                  label: truncate(anime.title, 95),
                  value: anime.id
              }
            );
            distinctResults.push(anime.id);
        }
    });
    row = new MessageActionRow()
    previousButton = new MessageButton().setCustomId("previousButtonTopAiring").setLabel("←").setStyle("PRIMARY");
    nextButton = new MessageButton().setCustomId("nextButtonTopAiring").setLabel("→").setStyle("PRIMARY");
    deleteButton = new MessageButton().setCustomId("deleteInteractionButton").setLabel("X").setStyle("DANGER");
    selectMenu = new MessageSelectMenu().setCustomId("searchAnimeSelector").setPlaceholder("Choose an anime").addOptions(options);
    selectRow = new MessageActionRow().addComponents(selectMenu);
    if (data.currentPage === 1 && data.hasNextPage) {
        row.addComponents(deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (data.currentPage !== 1 && data.hasNextPage) {
        row.addComponents(previousButton, deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (!data.hasNextPage && data.currentPage !== 1) {
        row.addComponents(previousButton, deleteButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    } else {
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow] });
        else interaction.reply({ embeds: [embed], components: [selectRow] });
    }
}

async function recentEpisodes(interaction, page = 1, updateEmbed = false) {
    let data, row, embed, previousButton, nextButton, deleteButton, selectMenu, selectRow;
    let options = [];
    let distinctResults = [];
    const embedProvider =  new GneeEmbedProvider();
    try {
        data = await fetchTopAiringGogoAnime(page);
        if (!updateEmbed) {
            if (data.results.length === 0) {
                return interaction.reply({content: "No top airing anime found.", components: []});
            }
        } else {
            if (data.results.length === 0) {
                return interaction.update({content: "No top airing anime found.", components: []});
            }
        }
    }catch (e) {
        if (updateEmbed) return interaction.reply({ content: "No top airing anime found." , components: [] });
        else return interaction.update({ content: "No top airing anime found." , components: [] });
    }
    embed = await embedProvider.generateEmbed("AnimeRecentEpisodes", data, null);
    data.results.forEach(anime => {
        if (!distinctResults.includes(anime.id)) {
            options.push(
              {
                  label: truncate(anime.title, 95),
                  value: anime.id
              }
            );
            distinctResults.push(anime.id);
        }
    });
    row = new MessageActionRow()
    previousButton = new MessageButton().setCustomId("previousButtonRecentEpisodes").setLabel("←").setStyle("PRIMARY");
    nextButton = new MessageButton().setCustomId("nextButtonRecentEpisodes").setLabel("→").setStyle("PRIMARY");
    deleteButton = new MessageButton().setCustomId("deleteInteractionButton").setLabel("X").setStyle("DANGER");
    selectMenu = new MessageSelectMenu().setCustomId("searchAnimeSelector").setPlaceholder("Choose an anime").addOptions(options);
    selectRow = new MessageActionRow().addComponents(selectMenu);
    if (data.currentPage === 1 && data.hasNextPage) {
        row.addComponents(deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (data.currentPage !== 1 && data.hasNextPage) {
        row.addComponents(previousButton, deleteButton, nextButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    }else if (!data.hasNextPage && data.currentPage !== 1) {
        row.addComponents(previousButton, deleteButton)
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow, row] });
        else interaction.reply({ embeds: [embed], components: [selectRow, row] });
    } else {
        if (updateEmbed) interaction.update({ embeds: [embed], components: [selectRow] });
        else interaction.reply({ embeds: [embed], components: [selectRow] });
    }
}


module.exports = {
    search: search,
    getAnimeInfos: getAnimeInfos,
    stream: stream,
    topAiring: topAiring,
    recentEpisodes: recentEpisodes
}
