<script lang="ts">
	import { CustomerForm } from '$lib/client/components/admin/organisms/CustomerForm';
</script>

<CustomerForm
	action="?/createCustomer"
	title="Nouveau client"
	description="Renseignez les informations du nouveau client."
	submitLabel="Créer"
	type="create"
/>
