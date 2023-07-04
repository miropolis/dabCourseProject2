<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    import PostQuestionButtonModal from "./PostQuestionButtonModal.svelte";
    import { getCourseQuestions } from "../services/APIService";

    let questionsPromise = getCourseQuestions(courseNumber);
    const handleAddedQuestion = () => {
        console.log("AnswerList.svelte has gotten an update!");
        questionsPromise = getCourseQuestions(courseNumber);
    };
    
</script>

<span class="float-right p-2 border border-gray-300"><a href="/">Go back to course selection</a></span>
<h1 class="text-3xl font-bold mb-4">Course {courseNumber}</h1>
<div>
    <PostQuestionButtonModal on:change={handleAddedQuestion} courseNumber={courseNumber}/>
</div>
{#await questionsPromise}
    <p>Loading questions</p>
{:then questions}
    {#if questions.length === 0}
        <p>There are no questions for this course yet. Feel free to start asking!</p>
    {/if}
    {#each questions as question, i}
        <Question questionTitle={question.title} questionContent={question.question_content} questionDate= {question.posted} questionID={question.id}/>
    {/each}
{/await}
