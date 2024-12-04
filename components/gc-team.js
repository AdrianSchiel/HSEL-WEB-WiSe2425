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
        const imgsrc = this.getAttribute("image");
        const job = this.getAttribute("job");
        const name = this.getAttribute("name");

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
