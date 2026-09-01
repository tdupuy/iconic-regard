export function buildBeautySalonJsonLd() {
	const data = {
		'@context': 'https://schema.org',
		'@type': 'BeautySalon',
		name: 'Iconic Regard',
		image: 'https://iconic-regard.com/assets/logo.png',
		url: 'https://iconic-regard.com',
		telephone: '+33766128958',
		address: {
			'@type': 'PostalAddress',
			streetAddress: "Espace Parta'gée Bien-être, 1 Rue Nationale",
			addressLocality: 'Coulans-sur-Gée',
			postalCode: '72550',
			addressCountry: 'FR'
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Monday',
				opens: '09:15',
				closes: '19:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Tuesday',
				opens: '09:15',
				closes: '20:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Thursday',
				opens: '09:15',
				closes: '17:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Friday',
				opens: '09:15',
				closes: '20:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'Saturday',
				opens: '09:00',
				closes: '15:00'
			}
		]
	};

	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
