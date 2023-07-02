<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    let questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", ];
</script>

<h1 class="text-3xl font-bold">Course {courseNumber}</h1>
<a href="/">Go back to course selection</a>
{#each questions as question, i}
    <Question question={question} courseNumber={courseNumber} questionNumber={i+1}/>
{/each}
