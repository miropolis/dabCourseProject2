<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    import { getCourseQuestions } from "../services/APIService";
    let questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", ];

    let questionsPromise = getCourseQuestions(courseNumber);
</script>

<h1 class="text-3xl font-bold">Course {courseNumber}</h1>
<p><a href="/">Go back to course selection</a></p>
{#await questionsPromise}
    <p>Loading questions</p>
{:then questions}
    <p>Course Questions from Database: {questions[0].title}</p>
    <p>{typeof questions}</p>
    {#each questions as question, i}
        <Question question={question.title + " " + question.question_content} courseNumber={courseNumber} questionNumber={i+1}/>
    {/each}
{/await}

<p>------------------------------------</p>
<p>Placeholder style stuff</p>
{#each questions as question, i}
    <Question question={question} courseNumber={courseNumber} questionNumber={i+1}/>
{/each}
