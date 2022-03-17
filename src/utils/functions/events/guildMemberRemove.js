const { createRemovedMemberCard } = require('../other/canvas');

module.exports = {
    createRemovedMemberCard : async function (member) {
        return await createRemovedMemberCard(member);
    }
}
