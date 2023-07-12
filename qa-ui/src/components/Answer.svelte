<script>
    import Upvote from "./Upvote.svelte";
    export let answerID;
    export let answerTitle;
    export let answerContent;
    export let answerDate;

    // How to get questionID?
</script>

<div class="ml-28 mb-4 pb-20 p-6 bg-white border border-gray-200 rounded-lg shadow">
    <span class="float-right text-sm mr-2">Posted on: {answerDate}</span>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{answerTitle}</h5>
    <p class="font-normal text-gray-700">{answerContent}</p>
    <Upvote isQuestion={false} q_a_id={answerID}/>
</div>