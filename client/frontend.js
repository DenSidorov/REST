import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
        <div style="display: flex;justify-content: center;align-items: center">
            <div class="text-center">
                <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                name: '',
                value: ''
            },
            affairs: []
        }        
    },
    computed: {
        canCreate() {
            return this.form.value.trim() && this.form.name.trim()
        }
    },
    methods: {
        async createAffairs() {
            const {...affairs} = this.form;
            const newAffairs = await request('/api/affairs', 'POST', affairs);
            this.affairs.push(newAffairs);

            this.form.name = this.form.value = '';
        },
        async markAffairs(id) {
            const affairs = this.affairs.find(af => af.id === id)
            const updated = await request(`api/affairs/${id}`, 'PUT', {
                ...affairs,
                marked: true
            })
            affairs.marked = updated.marked
        },
        async removeAffairs(id) {
            await request(`api/affairs/${id}`, 'DELETE')
            this.affairs = this.affairs.filter(af => af.id !== id)
        }
    },
    async mounted() {
        this.loading = true
        this.affairs = await request('/api/affairs')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
      const headers = {}
      let body
  
      if (data) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(data)
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body
      })
      return await response.json()
    } catch (e) {
      console.warn('Error:', e.message)
    }
  }