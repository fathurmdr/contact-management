<script lang="ts">
	export let id: string;
	export let name: string | string[];
	export let label: string = '';
	export let errors: { path: string | string[]; message: string }[] = [];
	export let className: string = '';

	function getErrorText() {
		if (!Array.isArray(errors)) {
			return '';
		}
		const currentError = errors.find(({ path }) => {
			if (Array.isArray(path) && Array.isArray(name)) {
				return path.join('') === name.join('');
			}
			if (Array.isArray(path) && typeof name === 'string') {
				return path.join('') === name;
			}
			if (typeof path === 'string' && Array.isArray(name)) {
				return path === name.join('');
			}
			return path === name;
		});

		return currentError ? currentError.message : '';
	}

	let errorText = getErrorText();
</script>

<div class={['mb-6 text-xs', className].join(' ')}>
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-900">{label}</label>
	{/if}
	<slot></slot>
	{#if errorText}
		<div class="min-h-6 px-1 pt-1 whitespace-pre-line text-red-600" aria-invalid="true">
			{errorText}
		</div>
	{/if}
</div>
{#if errorText}
	<div class="ant-form-item-margin-offset" style="margin-bottom: -24px;"></div>
{/if}
