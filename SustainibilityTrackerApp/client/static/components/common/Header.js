const template = `
  <header
    class="flex items-center justify-between px-6 py-4 bg-slate-400 border-b-4 border-emerald-600"
  >
    <div class="flex items-center">
      <button
        @click="isOpen = true"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        </button>
    </div>
    <div class="text-4xl font-semibold text-emerald-600 ">
        Quantified Self 
      </div>
    <div class="flex items-center">
      
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
        >
        <img src="https://www.flaticon.com/free-icon/user_456212?term=avatar&page=1&position=7&page=1&position=7&related_id=456212&origin=tag"/>

        </button>

        <div
          v-show="dropdownOpen"
          @click="dropdownOpen = false"
          class="fixed inset-0 z-10 w-full h-full"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
            <router-link
              to="/"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
              >Log out</router-link
            >
          </div>
        </transition>
      </div>
    </div>
  </header>
`

import { useSidebar } from "../dashboard/useSidebar.js";

const dropdownOpen = Vue.ref(false);
const { isOpen } = useSidebar();

export default{
  template: template,

  data(){
    return {
      dropdownOpen : dropdownOpen,
      isOpen : isOpen
    }
  }
}

