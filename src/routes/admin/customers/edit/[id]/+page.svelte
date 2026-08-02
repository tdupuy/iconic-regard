<script lang="ts">
	import type { PageData } from './$types';
	import { CustomerForm } from '$lib/client/components/admin/organisms/CustomerForm';

	let { data }: { data: PageData } = $props();
</script>

<CustomerForm
	customer={data.customer}
	action="?/updateCustomer"
	title="Édition de client"
	description="Modifiez les informations du client ci-dessous."
/>
