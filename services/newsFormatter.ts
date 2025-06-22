export function formatNewsAsHTML(newsData: { category: string, latest: any[] }[]): string {
    let html = `<h2>Your Latest News Digest</h2>`;

    for (const { category, latest } of newsData) {
        if (latest.length === 0) continue;

        html += `<h3>${category}</h3><ul>`;
        for (const item of latest) {
            html += `<li>
                        <a href="${item.link}" target="_blank">${item.title}</a>
                        <br/>
                        <small>${item.pubDate}</small>
                    </li>`;
        }
        html += `</ul><hr/>`;
    }

    return html;
}
