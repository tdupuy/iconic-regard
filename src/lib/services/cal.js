// @ts-nocheck Can't determine types for Cal

const initializedNamespaces = new Set();

export function initCal() {
	// if (window.Cal) return; // Keep this commented or remove if Cal can be re-initialized safely
	(function (C, A, L) {
		let p = function (a, ar) {
			a.q.push(ar);
		};
		let d = C.document;
		C.Cal =
			C.Cal ||
			function () {
				let cal = C.Cal;
				let ar = arguments;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					d.head.appendChild(d.createElement('script')).src = A;
					cal.loaded = true;
				}
				if (ar[0] === L) {
					const api = function () {
						p(api, arguments);
					};
					const namespace = ar[1];
					api.q = api.q || [];
					if (typeof namespace === 'string') {
						cal.ns[namespace] = cal.ns[namespace] || api;
						p(cal.ns[namespace], ar);
						p(cal, ['initNamespace', namespace]);
					} else p(cal, ar);
					return;
				}
				p(cal, ar);
			};
	})(window, 'https://app.cal.com/embed/embed.js', 'init');
}

export function initNamespace(namespace, options = { origin: 'https://cal.com' }) {
	initCal(); // Ensures Cal global and script loading logic is in place

	const namespaceKey = `${namespace}-${options.origin}`;

	if (!initializedNamespaces.has(namespaceKey)) {
		window.Cal('init', namespace, options);
		initializedNamespaces.add(namespaceKey);
	}

	// The rest of the logic for ensuring Cal.ns[namespace] exists is handled by initCal's core logic
}

export function callNamespaceMethod(namespace, method, ...args) {
	if (window.Cal && window.Cal.ns && window.Cal.ns[namespace]) {
		window.Cal.ns[namespace](method, ...args);
	} else {
		// Queue it if the namespace isn't ready yet, or warn.
		// The original Cal script has a built-in queue, so this might also be handled if `initNamespace`
		// has been called and `embed.js` is just loading.
		// For robustness, you might consider adding a local queue here too or relying on Cal's internal one.
		// console.warn(`Namespace ${namespace} not fully initialized or Cal.com script not loaded yet. Attempting to queue call.`);
		// Fallback to global queue if namespace specific queue isn't set up by embed.js yet
		window.Cal(namespace, method, ...args);
	}
}
