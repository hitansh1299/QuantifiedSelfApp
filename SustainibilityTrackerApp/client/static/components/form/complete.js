const template1 = `
    <template v-slot:complete>
        <p>
            <span class="fh2">You did it!</span>
            <span v-if="!submitted" class="f-section-text">
                Review your answers or press Calculate score to see your result.
            </span>
        </p>
    </template>
`

const template2 = `
    <div class="f-submit" v-if="!submitted">
        <button
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onQuizSubmit()"
            aria-label="Press to submit">
            <span>Calculate score</span>
        </button>
        <a 
        class="f-enter-desc"
        href="#"
        v-on:click.prevent="onQuizSubmit()">
        </a>
    </div>
    <p class="text-success" >Tracker Created<p>
`

export const complete={
    template: template1,
    name: 'complete',
    data(){
        return{
            submitted:false
        }
    },
    
}