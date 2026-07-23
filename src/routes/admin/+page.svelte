<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating } from '$app/state';
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

	function toDateParam(date: Date): string {
		const y = date.getFullYear();
		const m = String(date.getMonth() + 1).padStart(2, '0');
		const d = String(date.getDate()).padStart(2, '0');
		return `${y}-${m}-${d}`;
	}

	function shiftWeek(delta: number) {
		const newStart = new Date(data.weekStart);
		newStart.setDate(newStart.getDate() + delta * 7);
		const params = new URLSearchParams();
		params.set('semaine', toDateParam(newStart));
		goto(`?${params.toString()}`);
	}

	// Chargement en cours = navigation SvelteKit active (le load function refetch Cal.com)
	const isLoading = $derived(Boolean(navigating.to));

	const today = new Date();

	// Swipe : doigt qui va vers la gauche = semaine +1, vers la droite = semaine -1
	let touchStartX = 0;
	const SWIPE_THRESHOLD = 50;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		const diff = e.changedTouches[0].clientX - touchStartX;
		if (diff < -SWIPE_THRESHOLD) {
			shiftWeek(1);
		} else if (diff > SWIPE_THRESHOLD) {
			shiftWeek(-1);
		}
	}
</script>

<div
	class="relative w-full"
	role="group"
	aria-label="Planning de la semaine, balayer pour changer de semaine"
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<!-- Overlay de chargement -->
	{#if isLoading}
		<div
			class="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-[1px]"
		>
			<span class="loading loading-spinner loading-lg text-primary"></span>
		</div>
	{/if}

	<!-- Barre de navigation -->
	<div class="mb-6 flex items-center justify-center gap-4">
		<button
			class="btn btn-ghost btn-circle text-xl md:text-2xl"
			aria-label="Semaine précédente"
			onclick={() => shiftWeek(-1)}
			disabled={isLoading}
		>
			‹
		</button>
		<span class="min-w-[220px] text-center text-base font-medium md:text-lg">
			{days[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} -
			{days[5].toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
		</span>
		<button
			class="btn btn-ghost btn-circle text-xl md:text-2xl"
			aria-label="Semaine suivante"
			onclick={() => shiftWeek(1)}
			disabled={isLoading}
		>
			›
		</button>
	</div>

	<!-- Vue grille : desktop -->
	<div class="hidden grid-cols-6 gap-3 md:grid">
		{#each days as day, i (day.toISOString())}
			{@const isToday = isSameDay(day, today)}
			<div class={isToday ? 'bg-base-200 rounded-lg pb-2' : ''}>
				<div class="border-base-300 border-b py-2 text-center">
					<p class={`text-sm ${isToday ? 'text-primary font-medium' : 'text-base-content/50'}`}>
						{dayLabels[i]}
					</p>
					<p class="text-base font-medium">{day.getDate()}</p>
				</div>
				<div class="mt-2 flex flex-col gap-2 px-1">
					{#if bookingsByDay[i].length === 0}
						<p class="text-base-content/40 my-2 text-center text-sm">Aucun RDV</p>
					{:else}
						{#each bookingsByDay[i] as booking (booking.uid)}
							<button
								class="bg-primary/10 hover:bg-primary/20 cursor-pointer rounded-lg p-3 text-left transition-colors"
								onclick={() => openBooking(booking)}
							>
								<p class="text-sm font-medium">{formatTime(booking.start)}</p>
								<p class="truncate text-base font-medium">{clientName(booking)}</p>
								<p class="text-base-content/60 truncate text-sm">{booking.title}</p>
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
				<p class={`mb-2 text-base font-medium ${isToday ? 'text-primary' : ''}`}>
					{dayLabels[i]}
					{day.getDate()}
					{day.toLocaleDateString('fr-FR', { month: 'short' })}
				</p>
				{#if bookingsByDay[i].length === 0}
					<p class="text-base-content/40 pl-1 text-sm">Aucun RDV</p>
				{:else}
					<div class="flex flex-col gap-2">
						{#each bookingsByDay[i] as booking (booking.uid)}
							<button
								class="bg-primary/10 flex items-center justify-between rounded-lg p-3 text-left"
								onclick={() => openBooking(booking)}
							>
								<div>
									<p class="text-base font-medium">{clientName(booking)}</p>
									<p class="text-base-content/60 text-sm">{booking.title}</p>
								</div>
								<p class="ml-2 shrink-0 text-base font-medium">{formatTime(booking.start)}</p>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
