<script>
	let { children } = $props();

	export const prerender = true;
</script>

<h1><a href="/">NoNotTools</a></h1>
{@render children()}

<style>
	:root {
		font-family: sans-serif;
	}
</style>
