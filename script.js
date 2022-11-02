


function songSelect(songID)
{
    const musicContent = document.getElementById("music-content");
    musicContent.scrollTop = musicContent.clientHeight * songID;
}

function themeDropdown() {
    const themeSelect = document.getElementById("theme-select");
    if (window.getComputedStyle(themeSelect).transform === 'matrix(1, 0, 0, 1, 0, -160)'){
        themeSelect.setAttribute("style", "transform: translateY(0)");
    }
    else {
        themeSelect.setAttribute("style", "transform: translateY(-8)");
    }
    console.log(window.getComputedStyle(themeSelect).transform)
}