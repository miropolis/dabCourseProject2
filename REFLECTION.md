TODO: There is a brief description of the application in REFLECTION.md that highlights key design decisions for the application. The document also contains a reflection of possible improvements that should be done to improve the performance of the application.


## Usability

Usability and UX could be improved by adding keydown event listeners (e.g., allowing to close the modal by pressing the escape key, putting the cursor in the text field on opening the modal, and so on)

## Asynchronous LLM-generated answers

Uses the web worker implementation of deno

## Production configuration

### qa-ui

Because I am using server side rendering in Astro it would require an adapter (e.g., Deno) for a successful build. Since we did not go into this in the course I decided to leave it running in the development mode

### qa-api

The web worker requires the --allow-read flag

## Infinite Scroll

Taken from https://svelte.dev/repl/4863a658f3584b81bbe3d9f54eb67899?version=3.32.3

## Question and Answer Submission Modals

TODO Taken from Tailwind website

## nginx cache

No caching of UI in nginx because it is dynamic rather than static