<script>
    export let slug;
    import QuestionList from "./QuestionList.svelte"
    import AnswerList from "./AnswerList.svelte"

    let componentType = "questions"
    let questionNumber;
    // TODO change condition
    if (slug.length > 8) {
        componentType = "answers"
        questionNumber = slug.substring(18,19);
    };
    const courseNumber = slug.substring(7,8);
</script>

{#if componentType==="questions"}
    <QuestionList courseNumber={courseNumber} />
{/if}
{#if componentType==="answers"}
    <AnswerList courseNumber={courseNumber} questionNumber={questionNumber}/>
{/if}

