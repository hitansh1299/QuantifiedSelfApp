import Sidebar from "../common/Sidebar.js";
import Header from "../common/Header.js";
const template = `
<div className="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-600">
        <div class="container mx-auto px-6 py-8">
            <h3 class="text-3xl font-semibold text-white">Create a new Tracker</h3>
        
            <div class="mt-4">
                <div class="mt-4">
                    <div class="p-6 bg-gray-800 rounded-md shadow-md">
                    <h3 class="text-3xl font-semibold text-gray-700">Card</h3>
                    <div class="mt-4 mb-3">
                      <h4 class="text-gray-700">Stacked</h4>
                
                      <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
                        <img
                          class="w-full"
                          src="https://picsum.photos/id/1016/384/234"
                          alt="Sunset in the mountains"
                        />
                        <div class="px-6 py-4">
                          <div class="mb-2 text-xl font-bold text-gray-900">The Coldest Sunset</div>
                          <p class="text-base text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Voluptatibus quia, nulla! Maiores et perferendis eaque,
                            exercitationem praesentium nihil.
                          </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                          <span
                            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
                            >#photography</span
                          >
                          <span
                            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
                            >#travel</span
                          >
                          <span
                            class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
                            >#winter</span
                          >
                        </div>
                      </div>
                    </div>  
                    </div>
                </div>
            </div>
            
        </div>
      </main>
    </div>
</div>
`

export default{
    template: template,
    components: {
        Sidebar: Sidebar,
        Header: Header
    }
}