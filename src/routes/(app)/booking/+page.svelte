<script lang="ts">
	import Cal from '$lib/client/components/organisms/Cal';
	import { PUBLIC_CAL_LINK } from '$env/static/public';
</script>

<!--<Cal embedType="inline" namespace="mes-prestations" calLink="{PUBLIC_CAL_LINK}/30min" />-->
<Cal namespace="15min" />
<button
	data-cal-link="{PUBLIC_CAL_LINK}/30min"
	data-cal-namespace="15min"
	class="rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-blue-700"
>
	Book a 15min Meeting
</button>
