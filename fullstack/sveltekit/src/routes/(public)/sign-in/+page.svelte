<script lang="ts">
	import FormInput from '$lib/components/FormInput.svelte';

	let { form } = $props();
</script>

<div
	class="flex min-h-screen w-full max-w-96 items-center justify-center font-[family-name:var(--font-geist-sans)]"
>
	<main class="row-start-2 flex w-full flex-col items-center gap-8 sm:items-start">
		<h1 class="w-full text-center text-3xl font-semibold">Sign In</h1>
		<form class="w-full" method="POST" action="/sign-in">
			<FormInput id="name" name="name" errors={form?.errors} className="w-full">
				<input
					id="email"
					name="email"
					autocomplete="email webauthn"
					placeholder="Full Name"
					type="email"
					class="w-full rounded-md p-2 text-xs placeholder:text-xs"
				/>
			</FormInput>
			<FormInput id="password" name="password" errors={form?.errors} className="w-full">
				<input
					id="password"
					name="password"
					autocomplete="current-password webauthn"
					placeholder="Password"
					type="password"
					class="w-full rounded-md p-2 text-xs placeholder:text-xs"
				/>
			</FormInput>

			<div class="mt-12 w-full">
				<button
					type="submit"
					class="bg-primary w-full cursor-pointer rounded-md px-3 py-2 text-sm text-white shadow-xs"
					>Sign In</button
				>
				{#if form?.errorMsg}
					<div
						class="min-h-6 px-1 pt-1 text-center whitespace-pre-line text-red-600"
						aria-invalid="true"
					>
						{form.errorMsg}
					</div>
				{/if}
			</div>
		</form>
		<div class="flex w-full items-center justify-center gap-2">
			<p>Does not have an account?</p>
			<a href="/sign-up" class="text-link"> Sign Up </a>
		</div>
	</main>
</div>
