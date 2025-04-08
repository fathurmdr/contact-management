<script>
	import Icon from '@iconify/svelte';
</script>

<div
	class="grid min-h-dvh grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20"
>
	<main class="row-start-2 flex flex-col items-center gap-8">
		<div class="flex items-center gap-2">
			<Icon icon="ant-design:phone-outlined" class="text-3xl text-black" />
			<h1 class="text-2xl font-semibold">Contact Management</h1>
		</div>
		<ol
			class="list-inside list-decimal text-left font-[family-name:var(--font-geist-mono)] text-sm"
		>
			<li class="mb-2">Manage your contacts easly and efficiently.</li>
			<li>Create contact groups to organize your contacts.</li>
		</ol>

		<div class="flex items-center gap-4">
			<a
				href="/sign-in"
				class="bg-primary rounded-full border border-gray-300 px-6 py-2 text-white"
			>
				Sign In
			</a>
			<a href="/sign-up" class="rounded-full border border-gray-300 px-6 py-2"> Sign Up </a>
		</div>
	</main>
	<footer class="row-start-3 flex flex-wrap items-center justify-center gap-6">
		<a
			class="flex items-center gap-2 hover:underline hover:underline-offset-4"
			href="https://github.com/fathurmdr/contact-management/tree/main/fullstack/nextjs"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img aria-hidden="true" src="/file.svg" alt="File icon" width={16} height={16} />
			Source Code
		</a>
		<a
			class="flex items-center gap-2 hover:underline hover:underline-offset-4"
			href="https://github.com/fathurmdr/contact-management/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img aria-hidden="true" src="/window.svg" alt="Window icon" width={16} height={16} />
			Repository
		</a>
		<a
			class="flex items-center gap-2 hover:underline hover:underline-offset-4"
			href="https://www.linkedin.com/in/fathur208/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img aria-hidden="true" src="/globe.svg" alt="Globe icon" width={16} height={16} />
			See My LinkedIn →
		</a>
	</footer>
</div>
