<script lang="ts">
	import { User, Sparkles, Calendar } from '@lucide/svelte';
	import {
		TypicalFormField,
		ReadonlyFormField
	} from '$lib/client/components/admin/atoms/FormFields';

	let { customerName }: { customerName: string } = $props();

	let date = $state('');

	const prestationOptions = [
		{ value: 'regard', label: 'Beauté du regard' },
		{ value: 'soin_visage', label: 'Soin du visage' },
		{ value: 'epilation', label: 'Épilation' }
	];

	let prestationType = $state('');
	let prestationQuery = $state('');
	let isDropdownOpen = $state(false);

	const filteredOptions = $derived(
		prestationOptions.filter((option) =>
			option.label.toLowerCase().includes(prestationQuery.toLowerCase())
		)
	);

	function selectPrestation(option: (typeof prestationOptions)[number]) {
		prestationType = option.value;
		prestationQuery = option.label;
		isDropdownOpen = false;
	}

	// Enforces a valid selection: reverts free text that doesn't match an option
	function handleBlur() {
		setTimeout(() => {
			isDropdownOpen = false;
			const match = prestationOptions.find((option) => option.label === prestationQuery);
			if (!match) {
				prestationType = '';
				prestationQuery = '';
			}
		}, 150);
	}
</script>

<form class="card w-full">
	<div class="card-body w-full gap-3 rounded-xl border border-gray-400 bg-white p-4">
		<div class="flex flex-col gap-1">
			<ReadonlyFormField label="Client" icon={User} value={customerName} />
		</div>

		<div class="flex flex-col gap-1">
			<label for="prestation_type" class="flex items-center gap-1 text-sm font-medium">
				<Sparkles class="text-primary h-3.5 w-3.5 shrink-0" />
				Type de prestation
			</label>
			<div class="relative">
				<input
					id="prestation_type"
					type="text"
					bind:value={prestationQuery}
					onfocus={() => (isDropdownOpen = true)}
					onblur={handleBlur}
					placeholder="Rechercher une prestation..."
					autocomplete="off"
					class="input input-bordered w-full"
				/>
				{#if isDropdownOpen && filteredOptions.length > 0}
					<ul
						class="menu bg-base-100 rounded-box absolute z-10 mt-1 w-full border border-gray-200 shadow-md"
					>
						{#each filteredOptions as option (option.value)}
							<li>
								<button type="button" onmousedown={() => selectPrestation(option)}>
									{option.label}
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
			<input type="hidden" name="prestation_type" value={prestationType} />
		</div>

		<div class="flex flex-col gap-1">
			<label for="date" class="flex items-center gap-1 text-sm font-medium">
				<Calendar class="text-primary h-3.5 w-3.5 shrink-0" />
				Date
			</label>
			<div class="relative">
				<input id="date" type="text" bind:value={date} class="input input-bordered w-full" />
			</div>
		</div>
	</div>

	<button type="submit" class="btn btn-primary mt-5 w-full">Valider</button>
</form>
