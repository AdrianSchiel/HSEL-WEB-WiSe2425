document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav").classList.toggle("mobile-nav");
    this.classList.toggle("is-active");
});

const closeMobileNav = () => {
    const nav = document.querySelector(".nav");
    const menuToggle = document.querySelector(".menu-toggle");
    if (nav.classList.contains("mobile-nav")) {
        nav.classList.remove("mobile-nav");
        menuToggle.classList.remove("is-active");
    }
}

window.addEventListener("scroll", function() {
    closeMobileNav();
});

document.querySelectorAll(".nav-item a").forEach(item => {
    item.addEventListener("click", function() {
        closeMobileNav();
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const renderTeamData = (teamData) => {
        const teamContainer = document.getElementById("team-member");
    
        teamData.forEach(member => {
            const teamElement = document.createElement("gc-team");
            teamElement.setAttribute("image", member.image);
            teamElement.setAttribute("name", member.name);
            teamElement.setAttribute("job", member.job);
    
            teamContainer.appendChild(teamElement);
        });
    };

    const renderGamesData = (gameData) => {
        const gamesContainer = document.getElementById("games");

        gameData.forEach(game => {
            const gameElement = document.createElement("gc-game");
            gameElement.setAttribute("image", game.image);
            gameElement.setAttribute("title", game.title);
            gameElement.setAttribute("description", game.description);

            gamesContainer.appendChild(gameElement);
        });
    };

    const loadTeamData = () => {

        const storedData = localStorage.getItem("teamData");
        if (storedData) {
            console.log("Daten aus dem LocalStorage geladen.");
            const teamData = JSON.parse(storedData);
            renderTeamData(teamData);
        } else {
            fetch("assets/team/team.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(teamData => {
                    localStorage.setItem("teamData", JSON.stringify(teamData));
                    console.log("Daten wurden in LocalStorage gespeichert.");
    
                    renderTeamData(teamData);
                })
                .catch(error => {
                    console.error("Fehler beim Laden der Teamdaten:", error);
                });
        }
    };

    const loadGamesData = () => {

        const storedData = localStorage.getItem("gamesData");
        if (storedData) {
            console.log("Daten aus dem LocalStorage geladen.");
            const gamesData = JSON.parse(storedData);
            renderGamesData(gamesData);
        } else {
            fetch("assets/games/games.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(gamesData => {
                    localStorage.setItem("gamesData", JSON.stringify(gamesData));
                    console.log("Daten wurden in LocalStorage gespeichert.");
        
                    renderGamesData(gamesData);
                })
                .catch(error => {
                    console.error("Fehler beim Laden der Spieledaten:", error);
                });
        }
    };

    loadGamesData();
    loadTeamData();
});
