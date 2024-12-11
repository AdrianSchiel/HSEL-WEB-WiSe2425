document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav").classList.toggle("mobile-nav");
    this.classList.toggle("is-active");
});

document.addEventListener("DOMContentLoaded", () => {
    const teamContainer = document.getElementById("team-member");
    const gamesContainer = document.getElementById("games");

    const loadTeamData = () => {
        if (teamContainer.getAttribute("data-loaded") === "true") return;

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

                teamContainer.setAttribute("data-loaded", "true");
            })
            .catch(error => {
                console.error("Fehler beim Laden der Teamdaten:", error);
            });
    };

    const loadGamesData = () => {
        if (gamesContainer.getAttribute("data-loaded") === "true") return;

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

                gamesContainer.setAttribute("data-loaded", "true");
            })
            .catch(error => {
                console.error("Fehler beim Laden der Spieledaten:", error);
            });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadTeamData();
                observer.unobserve(teamContainer);
                loadGamesData();
                observer.unobserve(gamesContainer);
            }
        });
    });

    observer.observe(teamContainer);
    observer.observe(gamesContainer);
});
