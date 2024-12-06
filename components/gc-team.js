class GCTeam extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.updateContent();
    }

    static get observedAttributes() {
        return ["image", "job", "name"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent();
    }

    updateContent() {
        var imgsrc = this.getAttribute("image");
        var job = this.getAttribute("job");
        var name = this.getAttribute("name");

        if(imgsrc === null){
            imgsrc = "assets/team/default.png";
        }

        if(job === null) {
            job = "Arbeitslos";
        }

        if(name === null) {
            name = "Max Musterman";
        }

        const styles = `
            .avatar {
            width: 200px;
            height: 200px;
            margin: 0 auto 10px;
            }

            img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            }

            h2 {
            font-size: 1.2em;
            margin: 10px 0;
            }

            p {
            font-size: 0.9em;
            color: #8b8b8b;
            }
      `;

        const template = `
            <div class="avatar"> <img src="${imgsrc}" alt></div>
            <h2>${name}</h2>
            <p>${job}</p>
      `;

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        ${template}
      `;
    }
}
customElements.define("gc-team", GCTeam);
