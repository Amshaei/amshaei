


function songSelect(songID)
{
    const musicContent = document.getElementById("music-content");
    musicContent.scrollTop = musicContent.clientHeight * songID;
}