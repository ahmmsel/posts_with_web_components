const template = document.createElement("template");

template.innerHTML = `

    <link rel="stylesheet" href="./styles/posts/posts.css">

    <article class="post">
      <figure class="image">
        <img />
      </figure>
      <div class="content">
        <div class="text">
          <div class="heading">
            <h1></h1>
            <small>wrttien by</small>
          </div>
          <p><slot name="description" /></p>
        </div>
        <div class="action">
          <button class="open btn primary-btn">read more</button>
        </div>
      </div>
    </article>

    <div class="modal">
        <article class="post">
            <figure class="image">
                <img />
            </figure>
            <div class="content">
              <div class="text">
                <div class="heading">
                  <h1>frist post</h1>
                  <small>wrttien by</small>
                </div>
                <p><slot name="details" /></p>
              </div>
              <button class="close btn primary-btn">close</button>
            </div>
        </article>
    </div>

`;

class PostArticle extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const name = this.shadowRoot.querySelectorAll(".heading h1");
    name.forEach(title => {
      title.innerText = this.getAttribute("title");
    });

    const subtitle = this.shadowRoot.querySelectorAll(".heading small");
    subtitle.forEach(author => {
      author.innerText += this.getAttribute("author");
    });

    const image = this.shadowRoot.querySelectorAll(".image img");
    image.forEach(img => {
      img.src = this.getAttribute("image");
    });
  }
  
  openModal(){
    this.shadowRoot.querySelector(".modal").classList.add("active");
  }

  closeModal(){
    this.shadowRoot.querySelector(".modal").classList.remove("active");
  }

  connectedCallback(){
    this.shadowRoot.querySelector(".open").addEventListener("click", () => this.openModal());
    this.shadowRoot.querySelector(".close").addEventListener("click", () => this.closeModal());
  }

  disconnectedCallback(){
    this.shadowRoot.querySelector(".open").removeEventListener("click", () => this.openModal());
    this.shadowRoot.querySelector(".close").removeEventListener("click", () => this.closeModal());
  }
}

window.customElements.define("post-article", PostArticle);
