<script>
    export let courseNumber;
    import Question from "./Question.svelte";
    import PostQuestionButtonModal from "./PostQuestionButtonModal.svelte";
    import { getCourseQuestions } from "../services/APIService";
    import viewport from '../services/useViewportAction';
    import {onMount} from "svelte";

    let questions = [];
    let newBatchOfQuestions = [];
    let offsetNumber = 1;
    let resolved = false;

    const eventSource = new EventSource("/api/q-a-updates");
    eventSource.onmessage = (event) => {
        if (event.data.substring(0,6) === "QAdded" && event.data.substring(6) == courseNumber) {
            handleAddedQuestion();
        };
    };

    const loadFirstQuestions = async () => {
        newBatchOfQuestions = await getCourseQuestions(courseNumber, 0);
        resolved = true;
    };

    const handleAddedQuestion = () => {
        questions = [];
        newBatchOfQuestions = [];
        resolved = false;
        offsetNumber = 1;
        loadFirstQuestions();
    };

    const loadMoreQuestions = async () => {
        await new Promise(r => setTimeout(r, 1000));
        newBatchOfQuestions = await getCourseQuestions(courseNumber, offsetNumber);
        offsetNumber++;
    };

    onMount( async () => {
		// load first batch onMount
        loadFirstQuestions();
	})

    $: questions = [
		...questions,
        ...newBatchOfQuestions
    ];
    
</script>

<h1 class="text-3xl font-bold mb-4">Course {courseNumber}</h1>
<span class="float-right p-2 border border-gray-300"><a href="/">Go back to course selection</a></span>
<div>
    <!-- Removed on:change{handleAddedQuestion} because it is updated by SSE -->
    <PostQuestionButtonModal courseNumber={courseNumber}/>
</div>

{#each questions as question}
    <Question questionTitle={question.title} questionContent={question.question_content} questionDate= {question.posted} questionID={question.id}/>
{/each}
{#if questions.length == 0}
    <p>Looks like there are no questions in this course yet. Feel free to ask the first one!</p>
{/if}

{#if resolved}
    <p use:viewport
        on:enterViewport={() => loadMoreQuestions()}
    ></p>
{/if}
