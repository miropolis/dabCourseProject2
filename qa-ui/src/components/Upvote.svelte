<script>
    import { getUpvoteCount, getHasUserUpvoted, setUpvoteChange } from "../services/APIService";
    import { userUuid } from "../stores/stores.js";
    export let isQuestion;
    export let q_a_id;
    let upvoteCount;
    let isUpvoted = false;

    let upvoteCountPromise = getUpvoteCount(isQuestion, q_a_id);
    upvoteCountPromise.then((value) => {
        upvoteCount = value[0].count;
    });

    let hasUserUpvotedPromise = getHasUserUpvoted(isQuestion, q_a_id, $userUuid);
    hasUserUpvotedPromise.then((value) => {
        if (value.length > 0) {
            isUpvoted = true
        };
    });

    const pressUpvote = async () => {
        await setUpvoteChange(isQuestion, isUpvoted, q_a_id, $userUuid);
        if (isUpvoted) {
            isUpvoted = false;
            upvoteCount--;
        } else {
            isUpvoted = true;
            upvoteCount++;
        };
    };
</script>


<div class="">
    <button on:click={pressUpvote} class="p-2 border border-gray-300">
        {#if isUpvoted}
            <svg class="fill-blue-900" height="20px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="256.5,64.5 64.5,256.5 176.5,256.5 176.5,448.5 336.5,448.5 336.5,256.5 448.5,256.5 "/></svg>
        {:else}
            <svg class="fill-gray-500" height="20px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="256.5,64.5 64.5,256.5 176.5,256.5 176.5,448.5 336.5,448.5 336.5,256.5 448.5,256.5 "/></svg>
        {/if}
    </button>
    <span>{upvoteCount}</span>
</div>
