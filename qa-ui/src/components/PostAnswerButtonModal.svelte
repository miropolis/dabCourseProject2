<script>
    export let questionID;
    import { setCourseQuestionAnswer } from "../services/APIService";
    import { createEventDispatcher } from 'svelte';
    import { userUuid } from "../stores/stores.js";

    const dispatch = createEventDispatcher();

    let isModalVisible = false;
    let answerTitle = "";
    let answerContent = "";

    const showModal = () => {
        isModalVisible = true;
    };
    const hideModal = () => {
        isModalVisible = false;
        answerTitle = answerContent = "";
    };
    const postAnswer = async () => {
        const response = await setCourseQuestionAnswer(questionID, answerTitle, answerContent, $userUuid);
        if (response.questionAdded === false) {
            alert("Please wait " + response.seconds + " more seconds before posting a new question or answer!");
        } else {
            isModalVisible = false;
            answerTitle = answerContent = "";
            dispatch('change');
        };
    };

</script>

<button on:click={showModal} class="mb-4 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
    Post a new answer!
</button>

{#if isModalVisible}
<!-- Main modal -->
<div tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 bg-gray-200 bg-opacity-75 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900">
                    New Answer
                </h3>
                <button on:click={hideModal} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <p class="text-base leading-relaxed">
                    Try to provide an answer that is easy to understand and actually helps the asking person.
                </p>
                <p class="text-base leading-relaxed text-gray-500">Answer title</p>
                <input id="answer-title-input" type="text" bind:value={answerTitle} class="border border-gray-500 rounded-lg p-1" />
                <p class="text-base leading-relaxed text-gray-500">Answer text</p>
                <textarea bind:value={answerContent} class="w-full border border-gray-500 rounded-lg p-1"></textarea>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button on:click={postAnswer} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Give answer</button>
                <button on:click={hideModal} class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
            </div>
        </div>
    </div>
</div>
{/if}