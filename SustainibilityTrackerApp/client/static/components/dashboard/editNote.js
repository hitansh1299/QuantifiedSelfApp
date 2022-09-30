const template = `
<div
v-show="openNote"
class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center"
>
   <div
   @click="openNote = false"
   class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
   ></div>

      <div
      class="z-50 w-11/12 mx-auto overflow-y-auto shadow-white modal-container md:max-w-fit"
      >
      <!-- Add margin if you want to see some of the overlay behind the modal-->
         <div class="px-6 py-4 text-left modal-content">
            <!--Title-->

            <!--Body-->
            <div>
               <div class="container px-6 py-8">
                  <h3 class="text-3xl font-semibold text-white">Edit Timestamp</h3>
            
                  <div class="mt-4">
                     <div class="mt-4">
                        <div class="p-4 bg-gray-800 rounded-md shadow-lg shadow-slate-800">
                                 <flow-form v-bind:progressbar="false" v-bind:standalone="true" ref='flowform' v-bind:questions='questions'>
                                    <template v-slot:complete class="w-full">
                                      <p>
                                        <span class="fh2">Confirm?</span>
                                        <span v-if="!submitted" class="f-section-text">
                                        </span>
                                      </p>
                                    </template>

                                      <template v-slot:completeButton>
                                       <div class="f-submit w-fit" v-if="!submitted">
                                          <button
                                            class="o-btn-action"
                                            ref="button"
                                            type="submit"
                                            href="#"
                                            v-on:click.prevent="changeNote()"
                                            aria-label="Press to submit">
                                            <span>Change</span>
                                          </button>
                                       </div>
                                      </template>
                                 </flow-form>   
                              </div>
                        </div>
                     </div>
                  </div>
                  
               </div>
            </div>

            <!--Footer-->
         </div>
      </div>
        <div @dblclick='openNote = true' class='flex item-center'>
            {{ this.note || "-" }}
        </div>
`

const noteEdit = new VueFlowForm.QuestionModel({
    id: 'note',
    title: 'Edit Note',
    type: VueFlowForm.QuestionType.Text,
  });

export default{
    template: template,
    components: {
        question: VueFlowForm.Question,
        FlowForm: VueFlowForm.FlowForm
    },
    data(){
        return{
          submitted:false,
          questions:[
            noteEdit
          ],
          openNote: false
        }
    },
    props: {
        id: Number,
        note: {
            type: String,
            default: ''
        }
    },
    methods: {
        changeNote(){
            var note = this.questions[0].answer
            console.log('note'+note)
            axios.post('/tracker/note',{
                'data': {
                    'id': this.id,
                    'note': note
                }
            },
            {
                headers: {
                    Authorization: 'JWT '+ $cookies.get("access_token")
                  }
            }
            )
            this.openNote=false
            this.$refs.flowform.reset()
            this.$router.go()
        }
    }
}