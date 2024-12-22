class GCGame extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.updateContent();
  }

  static get observedAttributes() {
    return ["image", "description", "title"];  
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateContent();
  }

  updateContent() {
    const imgsrc = this.getAttribute("image");
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");

    const styles = `
          img{
            width: 100%;
            height: auto; /* Beibehaltung des Seitenverhältnisses */
            border-radius: 15px;
            object-fit: cover; /* Alternative: 'contain', falls Ränder erlaubt sind */
            display: block;
          }
          h1 {
            text-transform: uppercase;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 2rem;
            font-family: 'Roboto',Arial,sans-serif;
          }

          p {
            padding-top: 10px;
            font-size: 1.2rem;
            line-height: 1.6;
          }
          @media only screen and (max-width: 1160px) {
            img {
              width: 100%;
            }

            h1 {
              font-size: 1.5rem;
            }

            p {
              font-size: 1rem;
            }
          }
    `;

    const template = `
          <img part="game-img" src="${imgsrc}" alt="Game-Thumbnail" />
          <div class="game-info">
              <h1>${title}</h1>
              <p>${description}</p>
          </div>
    `;

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      ${template}
    `;
  }
}
customElements.define("gc-game", GCGame);
