<script lang="ts">
	import Logo from '$lib/client/components/atoms/Logo';
	import BrandName from '../../atoms/BrandName';
	import CatchPhrase from '../../atoms/CatchPhrase';
	import Tagline from '../../atoms/Tagline';
	import Separator from '../Separator';
</script>

<div class="flex flex-col items-center lg:items-start">
	<Logo />
	<Tagline />
	<BrandName />

	<Separator />

	<CatchPhrase />
</div>
