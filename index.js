async function fetch_recent() {
  /** @type {HTMLUListElement | null} */
  const recent = document.getElementById("recent");
  const writing_url = "https://writing.justdeeevin.dev";

  const res = await fetch(`${writing_url}/api/articles`);

  /** @type {{title: string, date: string, slug: string}[]} */
  const articles = await res.json();

  for (const article of articles) {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `${writing_url}/articles/${article.slug}`;
    link.innerText = article.title;
    link.target = "_self";
    li.innerHTML = `${link.outerHTML} - ${article.date}`;
    recent.appendChild(li);
  }
}

fetch_recent();
