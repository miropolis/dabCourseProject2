<script>
    export let questionTitle;
    export let questionContent;
    export let questionDate;
    //export let courseNumber;
    export let questionID;
</script>

<div class="mb-4 pb-20 p-6 bg-white border border-gray-200 rounded-lg shadow">
    <span class="float-right text-sm">Upvotes: 4</span>
    <span class="float-right text-sm mr-2">Answers: 5</span>
    <span class="float-right text-sm mr-2">Posted on: {questionDate}</span>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{questionTitle}</h5>
    <p class="font-normal text-gray-700">{questionContent}</p>
    <span class="bg-blue-600"><a href={"/questions/" + questionID}>Show answers!</a></span>
</div>