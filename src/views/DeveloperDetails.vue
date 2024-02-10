<template>
    <div class="container mt-4">
        <h2 class="mb-4">Detalhes do Usuário</h2>
        <div v-if="loading" class="text-center">Carregando...</div>
        <div v-else>
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <!-- Coluna para o avatar -->
                        <div class="col-md-4 mb-3 text-center">
                            <img :src="user.avatar_url" class="rounded-circle img-fluid" alt="Avatar">
                        </div>
                        <!-- Coluna para os detalhes do usuário -->
                        <div class="col-md-5 mb-3">
                            <h3 class="card-title">{{ user.login }}</h3>
                            <p class="card-text">Data de Registro: {{ formatDate(user.created_at) }}</p>
                            <p class="card-text">Repositórios: {{ user.public_repos }}</p>
                        </div>
                        <!-- Coluna para a lista de repositórios -->
                        <div class="col-md-3">
                            <h4 class="card-title">Repositórios:</h4>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" v-for="repo in repos" :key="repo.id">
                                    <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <router-link to="/" class="btn btn-secondary my-3 mx-3">Voltar</router-link>
            <button @click="saveLocally" class="btn btn-primary my-3">Salvar Localmente</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import api from '../api';
import router from '@/router';

export default {
    data() {
        return {
            user: {},
            repos: [],
            loading: true
        };
    },
    methods: {
        async fetchUser() {
            try {
                const response = await axios.get(`https://api.github.com/users/${this.$route.params.login}`);
                this.user = response.data;
                this.fetchRepos();
            } catch (error) {
                console.error('Erro ao buscar o usuário:', error);
            }
        },
        async fetchRepos() {
            try {
                const response = await axios.get(`https://api.github.com/users/${this.$route.params.login}/repos`);
                this.repos = response.data;
                this.loading = false;
            } catch (error) {
                console.error('Erro ao buscar os repositórios do usuário:', error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        async saveLocally() {
            try {
                const login = this.user.login;
                const response = await api.post('/salvar-local', { login }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                    }
                });
                if (response.status === 200) {
                    this.$toast.success('Dados do usuário salvos localmente com sucesso');
                    router.push('/');
                } else {
                    this.$toast.error('Erro ao salvar os dados do usuário localmente');
                }
            } catch (error) {
                console.error('Erro ao salvar os dados do usuário localmente:', error);
            }
        }
    },
    mounted() {
        this.fetchUser();
    }
};
</script>
