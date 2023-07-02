<script>
    export let componentType;
    export let courseNumber;
    import QuestionList from "./QuestionList.svelte"
    import AnswerList from "./AnswerList.svelte"
</script>

{#if componentType==="questions"}
    <QuestionList courseNumber={courseNumber} />
{/if}
{#if componentType==="answers"}
    <AnswerList courseNumber={courseNumber}/>
{/if}

