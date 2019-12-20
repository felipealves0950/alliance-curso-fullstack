<template>
    <div class="ativos">
        <h1>Ativos</h1>
        <hr />
            <b-button v-b-modal.criaAtivo>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="ativos" :fields="fields">
        <template slot="cell(actionDelete)" slot-scope="{ item: { item }}">
            <b-button v-on:click="excluirAtivo(item)">
                <font-awesome-icon icon="trash"/>
            </b-button>
        </template>
    <template slot="cell(actionEdit)" slot-scope="{ item }">
        <b-button v-on:click="beforeEditaAtivo(item)">
            <font-awesome-icon icon="pen"/>
        </b-button>
    </template>
    </b-table>
        <b-modal id="criaAtivo"
        title="Novo Ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovoAtivo"
        @ok="saveNovoAtivo">
        <FormAtivos v-model="ativoAtual"/>
    </b-modal>
        <b-modal id="editaAtivo"
        :title="'Alterar o Ativo - ' + ativoAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editaAtivo">
        <FormAtivos v-model="ativoAtual"/>
    </b-modal>

   </div>
</template>

<script>
import FormAtivos from '../components/FormAtivos';
import axios from 'axios'
export default {
    components: {FormAtivos},
    data: () => {
        return {
            ativoAtual: {
                codigo: '',
                descricao: '',
                isNew: true
            },
            ativos: [],
            fields: [
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'descricao',
                    label: 'Descrição'
                },
                {
                    key: 'actionDelete',
                    label: ''
                },
                {
                    key: 'actionEdit',
                    label: ''
                }
            ]
        }
    },
    methods: {
        async excluirAtivo() {
            let payload = {
                codigo: this.ativoAtual.codigo,
                descricao: this.ativoAtual.descricao
            };
            try{
                await axios.delete(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
                await this.carregaAtivo();
            } catch(err){
                alert('erro ao deletar Ativo');
            }
        },
        beforeEditaAtivo(ativo) {
            this.ativoAtual = {
                codigo: ativo.codigo,
                descricao: ativo.descricao,
                isNew: false
            }
            this.$root.$emit('bv::show::modal', 'editaAtivo');
        },
        async editaAtivo(){
            let payload = {
                descricao: this.ativoAtual.descricao
            };
            try{
                await axios.put(`http://localhost:3000/ativos/${this.ativoAtual.codigo}`, payload);
                await this.carregaAtivo();
            } catch(err){
                alert('erro ao atualizar Ativo');
            }

          },
          async carregaAtivo(){
              this.ativos.splice(0, this.ativos.lenght);
              let dados = await axios.get('http://localhost:3000/ativos/');
              this.ativos.push(...dados.data);
          },
          beforeNovoAtivo(){
              this.ativoAtual.codigo = '';
              this.ativoAtual.descricao = '';
              this.ativoAtual.isNew = true;
          },
          async saveNovoAtivo(){
              let payload = {
                  codigo: this.ativoAtual.codigo,
                  descricao: this.ativoAtual.descricao
              };
                          try {
                await axios.post('http://localhost:3000/ativos/', payload);
                await this.carregaAtivo();
            } catch(err) {
                alert('erro ao inserir ativo');
          }
        },
        async mounted() {
            await this.carregaAtivo();
        }
    }
}
</script>