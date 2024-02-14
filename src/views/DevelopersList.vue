<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <input type="text" v-model="search" placeholder="Buscar desenvolvedor"
                    class="form-control search-input mb-3">
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center mb-3">
                            <div class="col-md-4 cursor-pointer text-left" @click="sortBy('login')"><strong
                                    class="card-title">Avatar</strong></div>
                            <div class="col-md-4 cursor-pointer text-left" @click="sortBy('created_at')"><strong
                                    class="card-title">Usuário</strong></div>
                            <div class="col-md-4 cursor-pointer text-right" @click="sortBy('public_repos')"><strong
                                    class="card-title">Repositórios</strong></div>
                        </div>
                        <hr>
                        <div v-for="developer in filteredDevelopers" :key="developer.id" @click="showDetails(developer)"
                            class="card mb-3 cursor-pointer">
                            <div class="card-body">
                                <div class="row align-items-center">
                                    <div class="col-md-4 text-left">
                                        <img class="user-avatar me-2" :src="developer.avatar_url" alt="Avatar" style="max-width: 50px;">
                                    </div>
                                    <div class="col-md-4 text-left">
                                        <strong class="card-title">{{ developer.login }}</strong>
                                        <div class="small-text">Usuário desde {{ formatDate(developer.created_at) }}</div>
                                    </div>
                                    <div class="col-md-4 text-right">{{ developer.public_repos }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div></template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            developers: [],
            search: '',
            usernames: ['wallysonn', 'diego3g', 'filipedeschamps', 'rmanguinho'],
            sortKey: null,
            sortOrder: 'asc'
        };
    },
    computed: {
        filteredDevelopers() {
            const filtered = this.developers.filter(developer =>
                developer.login.toLowerCase().includes(this.search.toLowerCase()) &&
                this.usernames.includes(developer.login)
            );

            if (filtered.length === 0) {
                console.warn('Nenhum desenvolvedor foi encontrado com os nomes especificados.');
            }

            if (this.sortKey) {
                return filtered.sort((a, b) => {
                    const valueA = this.getValue(a, this.sortKey);
                    const valueB = this.getValue(b, this.sortKey);
                    if (this.sortOrder === 'asc') {
                        return valueA - valueB;
                    } else {
                        return valueB - valueA;
                    }
                });
            }

            return filtered;
        }
    },
    methods: {
        async fetchDevelopers() {
            try {
                const requests = this.usernames.map(username => axios.get(`https://api.github.com/users/${username}`));
                const responses = await Promise.all(requests);
                this.developers = responses.map(response => response.data);

                // Ordenar os desenvolvedores por data de registro (do mais novo para o mais velho)
                this.developers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } catch (error) {
                console.error('Erro ao buscar os desenvolvedores:', error);
            }
        },
        showDetails(developer) {
            this.$router.push(`/developers/${developer.login}`);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        sortBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        },
        getValue(obj, key) {
            if (!obj || !key) return null;
            return key.split('.').reduce((acc, val) => acc[val], obj);
        }
    },
    mounted() {
        this.fetchDevelopers();
    }
};
</script>
