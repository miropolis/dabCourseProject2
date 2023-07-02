<script>
    export let courseNumber;
    import Answer from "./Answer.svelte";
    let answers = ["Answer 1", "Answer 2", ];
</script>

<a href={"/course-" + courseNumber}>Go back to all questions</a>
This is the courseNumber in AnswerList: {courseNumber}
{#each answers as answer}
    <Answer answer={answer}/>
{/each}