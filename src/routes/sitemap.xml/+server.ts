export async function GET() {
	const pages = ['', '/services', '/booking', '/contact', '/legalnotice'];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>https://iconic-regard.com${p}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
