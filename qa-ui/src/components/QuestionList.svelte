<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    import PostQuestionButtonModal from "./PostQuestionButtonModal.svelte";
    import { getCourseQuestions } from "../services/APIService";

    let questionsPromise = getCourseQuestions(courseNumber);
</script>

<span class="float-right p-2 border border-gray-300"><a href="/">Go back to course selection</a></span>
<h1 class="text-3xl font-bold mb-4">Course {courseNumber}</h1>
<div>
    <PostQuestionButtonModal courseNumber={courseNumber}/>
</div>
{#await questionsPromise}
    <p>Loading questions</p>
{:then questions}
    {#each questions as question, i}
        <Question questionTitle={question.title} questionContent={question.question_content} questionDate= {question.posted} courseNumber={courseNumber} questionID={question.id}/>
    {/each}
{/await}
