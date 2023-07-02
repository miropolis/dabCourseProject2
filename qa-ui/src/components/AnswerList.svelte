<script>
    export let courseNumber;
    export let questionNumber;
    import Answer from "./Answer.svelte";
    import { getCourseQuestionAnswers } from "../services/APIService";
    let answersPromise = getCourseQuestionAnswers(courseNumber, questionNumber);
    let answers = ["Answer 1", "Answer 2", ];
</script>

<h1 class="text-2xl font-bold text-blue-950">Question {questionNumber}</h1>
<a href={"/course-" + courseNumber}>Go back to all questions</a>

{#await answersPromise}
    <p>Loading answers</p>
{:then answers}
    <p>Course Answers from Database: {answers[0].title}</p>
    <p>{typeof answers}</p>
    {#each answers as answer}
        <Answer answer={answer.title + " " + answer.answer_content}/>
    {/each}
{/await}

<p>--------------------</p>
<p>Placeholder style stuff</p>
{#each answers as answer}
    <Answer answer={answer}/>
{/each}