<script lang="ts">
	import Logo from '$lib/client/components/atoms/Logo';
</script>

<div class="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white p-4">
	<Logo />
	<div class="relative h-14 w-14">
		<div class="absolute inset-0 origin-center animate-spin" style="animation-duration: 1.8s;">
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.4rem; height: 0.4rem; transform: translate(-50%, -50%) rotate(0deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.36rem; height: 0.36rem; transform: translate(-50%, -50%) rotate(45deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.32rem; height: 0.32rem; transform: translate(-50%, -50%) rotate(90deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.28rem; height: 0.28rem; transform: translate(-50%, -50%) rotate(135deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.24rem; height: 0.24rem; transform: translate(-50%, -50%) rotate(180deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.2rem; height: 0.2rem; transform: translate(-50%, -50%) rotate(225deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.16rem; height: 0.16rem; transform: translate(-50%, -50%) rotate(270deg) translateY(-18px);"></span>
			<span class="absolute left-1/2 top-1/2 rounded-full bg-primary"
				style="width: 0.12rem; height: 0.12rem; transform: translate(-50%, -50%) rotate(315deg) translateY(-18px);"></span>
		</div>
	</div>
</div>
