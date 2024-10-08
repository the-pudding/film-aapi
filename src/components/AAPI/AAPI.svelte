<script>
	import AAPIScrolly from "$components/AAPI/AAPI.Scrolly.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
</script>

<div id="demo">
	<h1>AAPI ARTICLE</h1>
    <AAPITier1 />
	<AAPIScrolly />
</div>

<style>
	#demo {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#demo section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#demo section > section) {
		margin: 0 auto;
		padding-top: 0;
	}

	:global(#demo h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
