import Sidebar from "./Sidebar.js";
import Header from "./Header.js";
import Dashboard from "./Dashboard.js";
const template = `
  <div className="flex h-screen bg-gray-200 font-roboto">
    <Sidebar />

    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <Dashboard/>
        </div>
      </main>
    </div>
  </div>
`

export default{
  template: template,
  components: {
    Sidebar: Sidebar,
    Header: Header,
    Dashboard: Dashboard
  }
}



