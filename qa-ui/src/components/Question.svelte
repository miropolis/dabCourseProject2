<script>
    export let question;
    export let courseNumber;
    export let questionNumber;
</script>

<div class="bg-gray-300 my-2 px-2 pt-2 pb-20">
    <span>{question}</span>
    <span class="bg-blue-600"><a href={"/course-" + courseNumber + "/question-" + questionNumber}>Show answers!</a></span>
    <span class="float-right text-sm">Upvotes: 4</span>
    <span class="float-right text-sm mr-2">Answers: 5</span>
</div>