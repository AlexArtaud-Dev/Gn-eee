function isVolumeInvalid(volume){
    return (volume < 0 || volume > 100);
}

module.exports = {
    isVolumeInvalid
}
