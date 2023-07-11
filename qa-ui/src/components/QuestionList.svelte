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

    const loadFirstQuestions = async () => {
        newBatchOfQuestions = await getCourseQuestions(courseNumber, 0);
        console.log(newBatchOfQuestions);
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
        console.log("Now more questions should be loaded");
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

<span class="float-right p-2 border border-gray-300"><a href="/">Go back to course selection</a></span>
<h1 class="text-3xl font-bold mb-4">Course {courseNumber}</h1>
<div>
    <PostQuestionButtonModal on:change={handleAddedQuestion} courseNumber={courseNumber}/>
</div>

{#each questions as question}
    <Question questionTitle={question.title} questionContent={question.question_content} questionDate= {question.posted} questionID={question.id}/>
{/each}

{#if resolved}
    <p use:viewport
        on:enterViewport={() => loadMoreQuestions()}
        on:exitViewport={() => console.log('exit!')}
    ></p>
{/if}
