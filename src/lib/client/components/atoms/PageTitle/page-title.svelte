<script lang="ts">
	import Separator from '../../molecules/Separator';

	let { title }: { title: string } = $props();
	console.log(title);
</script>

<h2 class="text-base-content text-center text-[clamp(2rem,5vw,2.5rem)]">{title}</h2>
<div class="mb-2 flex items-center justify-center">
	<Separator />
</div>
