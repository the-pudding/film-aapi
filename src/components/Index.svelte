<script>
	import { getContext } from "svelte";
	// import Demo from "$components/demo/Demo.svelte";
	import AAPI from "$components/AAPI/AAPI.svelte"
	import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	// const data = getContext("data");
</script>

<!-- <Demo /> -->
<AAPI {copy} />
<Footer />
