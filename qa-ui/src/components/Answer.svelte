<script>
    export let answerTitle;
    export let answerContent;
    export let answerDate;
</script>

<div class="ml-28 mb-4 pb-20 p-6 bg-white border border-gray-200 rounded-lg shadow">
    <span class="float-right text-sm">Upvotes: 4</span>
    <span class="float-right text-sm mr-2">Posted on: {answerDate}</span>
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{answerTitle}</h5>
    <p class="font-normal text-gray-700">{answerContent}</p>
</div>