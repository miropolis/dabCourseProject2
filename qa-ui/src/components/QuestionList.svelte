<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    import { getCourseQuestions } from "../services/APIService";
    let questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5", ];

    let questionsPromise = getCourseQuestions(courseNumber);
</script>

<span class="float-right p-2 border border-gray-300"><a href="/">Go back to course selection</a></span>
<h1 class="text-3xl font-bold mb-4">Course {courseNumber}</h1>
{#await questionsPromise}
    <p>Loading questions</p>
{:then questions}
    {#each questions as question, i}
        <Question questionTitle={question.title} questionContent={question.question_content} questionDate= {question.posted} courseNumber={courseNumber} questionNumber={i+1}/>
    {/each}
{/await}

<p>------------------------------------</p>
<p>Placeholder style stuff</p>
{#each questions as question, i}
    <Question questionTitle={question} questionContent="blank" courseNumber={courseNumber} questionNumber={i+1}/>
{/each}
