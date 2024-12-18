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
    const teamContainer = document.getElementById("team-member");
    const gamesContainer = document.getElementById("games");

    const loadTeamData = () => {
        fetch("assets/team/team.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(teamData => {
                teamData.forEach(member => {
                    const teamElement = document.createElement("gc-team");
                    teamElement.setAttribute("image", member.image);
                    teamElement.setAttribute("name", member.name);
                    teamElement.setAttribute("job", member.job);

                    teamContainer.appendChild(teamElement);
                });

            })
            .catch(error => {
                console.error("Fehler beim Laden der Teamdaten:", error);
            });
    };

    const loadGamesData = () => {
        fetch("assets/games/games.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(gamesData => {
                gamesData.forEach(game => {
                    const gameElement = document.createElement("gc-game");
                    gameElement.setAttribute("image", game.image);
                    gameElement.setAttribute("title", game.title);
                    gameElement.setAttribute("description", game.description);

                    gamesContainer.appendChild(gameElement);
                });

            })
            .catch(error => {
                console.error("Fehler beim Laden der Spieledaten:", error);
            });
    };

    loadGamesData();
    loadTeamData();
});
