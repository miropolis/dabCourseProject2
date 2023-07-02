<script>
    export let courseNumber;
    export let questionNumber;
    import Answer from "./Answer.svelte";
    let answers = ["Answer 1", "Answer 2", ];
</script>

<h1 class="text-2xl font-bold text-blue-950">Question {questionNumber}</h1>
<a href={"/course-" + courseNumber}>Go back to all questions</a>
{#each answers as answer}
    <Answer answer={answer}/>
{/each}