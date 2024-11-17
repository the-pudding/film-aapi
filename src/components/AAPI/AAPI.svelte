<script>
	import AAPIScrolly from "$components/AAPI/AAPI.Scrolly.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
    import textData from "$data/copy.json";
    let scrollyValue = 0;

    // Filter text for the intro section
    let introText = textData.body.filter((item) => item.section === "intro");
</script>

<div id="demo">
    

    <section id="scrolly-section">
        <h2> insert section here</h2>
        <div class = "scrolly-content">
            <AAPIScrolly
                bind:value={scrollyValue}
                texts={introText}
                topPadding="20vh"
                bottomPadding="20vh"
            />
        </div>
    </section>
    <AAPITitle />
    

    <section id="scrolly-section">
        <div class="figure-background">
            <AAPITier1 />
        </div>

        <div class = "scrolly-content">
            <AAPIScrolly />
        </div>
    </section>

    <section id="another-section">
        <h2> insert another section here</h2>
    </section>
</div>

<style>
    #demo {
		padding: 16px;
		margin: 0 auto;
	}
    
    #scrolly-section {
        position: relative;
        display: block;
		justify-content: space-between;
		align-items: flex-start;
        width: 100%;
        /* height: 790vh; Adjust based on the length of your scrolly content */
    }
    #another-section {
        height: 100vh;
    }

    .figure-background {
		position: sticky;
		top: 0;
		left: 0;
		width: 50%;
		height: 100vh; /* Full viewport height */
		z-index: -1;
    }

    .scrolly-content {
		position: relative;
        /* width: 45%;  */
		z-index: 1; /* Keep it above the background */
        padding-right: 5%;
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
    @media (min-width: 601px) {
        #scrolly-section {
            display: flex; /* Apply flexbox layout on desktop */
            padding-left: 5em; /* Space on the left side */
            justify-content: space-between; /* Space out the content */
        }

        .scrolly-content {
            width: 45%; /* Adjust width for larger screens */
        }
    }

    @media (max-width: 600px) {
        #scrolly-section {
            justify-content: center; /* Center the content */
            /* height: 790vh; Adjust based on the length of your scrolly content */
            align-items: flex-start;
            width: 100%;
        }

        .figure-background {
            width: 100%; /* Ensure the background takes the full width */
            height: auto; /* Adjust height on mobile */
        }

        .scrolly-content {
            width: 100%; /* Ensure the scrolly content takes the full width */
            padding: 10px; /* Add padding for mobile if needed */
            box-sizing: border-box; /* Make sure padding doesn’t overflow the width */

        }
    }
</style>
