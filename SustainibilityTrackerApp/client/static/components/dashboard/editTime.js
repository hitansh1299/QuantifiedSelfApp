const template = `
<div
v-show="openDate"
class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center"
>
   <div
   @click="openDate = false"
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
                                            v-on:click.prevent="changeDate()"
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
      <div class="flex items-center"  @dblclick='openDate = true'>
                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
        <div >
      {{ new Date(this.datetime).toLocaleString() }}
      </div>
      </div>
    </div>
      </div>
`

const dateEdit = new VueFlowForm.QuestionModel({
    id: 'date',
    title: 'Enter new Date/Time',
    type: VueFlowForm.QuestionType.Text,
    mask: '##/##/#### ##:##:##',
    placeholder: 'dd/mm/yyyy hh:mm:ss'
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
            dateEdit
          ],
          openDate: false
        }
    },
    props: {
        id: Number,
        datetime: {
            type: String,
            default: ''
        }
    },
    methods: {
        changeDate(){
            var date = this.questions[0].answer
            date = date.split(/[\s:/]+/)
            console.log(date)
            date = new Date(date[2], Number(date[1]) - 1, date[0], date[3], date[4], date[5]).toISOString()
            console.log(date)
            axios.post('/tracker/date',{
                'data': {
                    'id': this.id,
                    'date':date
                }
            },
            {
                headers: {
                    Authorization: 'JWT '+ $cookies.get("access_token")
                  }
            }
            )
            this.openDate=false
            this.$refs.flowform.reset()
            this.$router.go()
        }
    }
}