<script lang="ts">
	import Separator from '../../molecules/Separator';

	let { title }: { title: string } = $props();
	console.log(title);
</script>

<h2 class="text-base-content text-center text-xl">{title}</h2>
<div class="mb-2">
	<Separator />
</div>
