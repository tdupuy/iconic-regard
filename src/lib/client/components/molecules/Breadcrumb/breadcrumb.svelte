<script lang="ts">
	import { page } from '$app/state';
</script>

<div
	class="breadcrumbs font-body-light text-base-200 mb-2 ml-2 text-sm text-[clamp(0.52rem,1.4vw,0.7rem)] tracking-widest uppercase"
>
	<ul>
		<li><a href="/">Accueil</a></li>
		<li><a href={page.url.pathname}>{page.data.title}</a></li>
	</ul>
</div>
