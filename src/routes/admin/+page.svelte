<script lang="ts">
	import { goto } from '$app/navigation';
	import type { CalBooking } from '$lib/server/cal';

	type Props = {
		data: {
			weekStart: string;
			bookings: CalBooking[];
		};
	};

	let { data }: Props = $props();

	const dayLabels = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

	// 6 jours : lundi -> samedi, pas de dimanche
	const days = $derived(
		Array.from({ length: 6 }, (_, i) => {
			const date = new Date(data.weekStart);
			date.setDate(date.getDate() + i);
			return date;
		})
	);

	function isSameDay(a: Date, b: Date): boolean {
		return a.toDateString() === b.toDateString();
	}

	const bookingsByDay = $derived(
		days.map((day) =>
			data.bookings
				.filter((b) => isSameDay(new Date(b.start), day))
				.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
		)
	);

	function formatTime(iso: string): string {
		return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
	}

	function clientName(booking: CalBooking): string {
		return booking.attendees[0]?.name ?? 'Client';
	}

	function openBooking(booking: CalBooking) {
		goto(`/planning/${booking.uid}`);
	}

	function shiftWeek(delta: number) {
		const newStart = new Date(data.weekStart);
		newStart.setDate(newStart.getDate() + delta * 7);
		const params = new URLSearchParams();
		params.set('semaine', newStart.toISOString().slice(0, 10));
		goto(`?${params.toString()}`);
	}

	const today = new Date();
</script>

<div class="w-full">
	<!-- Barre de navigation -->
	<div class="mb-4 flex flex-wrap items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<button
				class="btn btn-sm btn-ghost btn-circle"
				aria-label="Semaine précédente"
				onclick={() => shiftWeek(-1)}
			>
				‹
			</button>
			<span class="text-sm font-medium">
				{days[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} -
				{days[5].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
			</span>
			<button
				class="btn btn-sm btn-ghost btn-circle"
				aria-label="Semaine suivante"
				onclick={() => shiftWeek(1)}
			>
				›
			</button>
		</div>

		<div class="join">
			<a href="/planning/jour" class="btn btn-sm join-item">Jour</a>
			<a href="/planning/semaine" class="btn btn-sm join-item btn-active">Semaine</a>
			<a href="/planning/mois" class="btn btn-sm join-item">Mois</a>
		</div>
	</div>

	<!-- Vue grille : desktop -->
	<div class="hidden grid-cols-6 gap-2 md:grid">
		{#each days as day, i (day.toISOString())}
			{@const isToday = isSameDay(day, today)}
			<div class={isToday ? 'bg-base-200 rounded-lg pb-2' : ''}>
				<div class="border-base-300 border-b py-1 text-center">
					<p class={`text-xs ${isToday ? 'text-primary font-medium' : 'text-base-content/50'}`}>
						{dayLabels[i]}
					</p>
					<p class="text-sm font-medium">{day.getDate()}</p>
				</div>
				<div class="mt-2 flex flex-col gap-1.5 px-1">
					{#if bookingsByDay[i].length === 0}
						<p class="text-base-content/40 my-2 text-center text-xs">Aucun RDV</p>
					{:else}
						{#each bookingsByDay[i] as booking (booking.uid)}
							<button
								class="bg-primary/10 hover:bg-primary/20 cursor-pointer rounded-lg p-2 text-left transition-colors"
								onclick={() => openBooking(booking)}
							>
								<p class="text-xs font-medium">{formatTime(booking.start)}</p>
								<p class="truncate text-sm font-medium">{clientName(booking)}</p>
								<p class="text-base-content/60 truncate text-xs">{booking.title}</p>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<!-- Vue liste : mobile -->
	<div class="flex flex-col gap-4 md:hidden">
		{#each days as day, i (day.toISOString())}
			{@const isToday = isSameDay(day, today)}
			<div>
				<p class={`mb-2 text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
					{dayLabels[i]}
					{day.getDate()}
					{day.toLocaleDateString('fr-FR', { month: 'short' })}
				</p>
				{#if bookingsByDay[i].length === 0}
					<p class="text-base-content/40 pl-1 text-xs">Aucun RDV</p>
				{:else}
					<div class="flex flex-col gap-2">
						{#each bookingsByDay[i] as booking (booking.uid)}
							<button
								class="bg-primary/10 flex items-center justify-between rounded-lg p-3 text-left"
								onclick={() => openBooking(booking)}
							>
								<div>
									<p class="text-sm font-medium">{clientName(booking)}</p>
									<p class="text-base-content/60 text-xs">{booking.title}</p>
								</div>
								<p class="ml-2 shrink-0 text-sm font-medium">{formatTime(booking.start)}</p>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
