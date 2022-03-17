const { createNewMemberCard } = require('../other/canvas');

module.exports = {
    createNewMemberCard: async function (member) {
        return await createNewMemberCard(member);
    }
}
