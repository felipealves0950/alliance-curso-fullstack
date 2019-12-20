<template>
    <div class="carteiras">
        <h1>Carteira</h1>
        <hr />
            <b-button v-b-modal.criaCarteira>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="carteiras" :fields="fields">
    <template slot="cell(actionEdit)" slot-scope="{ item }">
        <b-button v-on:click="beforeEditacarteira(item)">
            <font-awesome-icon icon="pen"/>
        </b-button>
    </template>
    </b-table>
        <b-modal id="criaCarteira"
        title="Novo carteira"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovocarteira"
        @ok="saveNovocarteira">
        <Formcarteiras v-model="carteiraAtual"/>
    </b-modal>
        <b-modal id="editacarteira"
        :title="'Alterar o carteira - ' + carteiraAtual.codigo_ativo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editacarteira">
        <Formcarteiras v-model="carteiraAtual"/>
    </b-modal>

   </div>
</template>

<script>
import Formcarteiras from '../components/FormCarteiras';
import axios from 'axios'
export default {
    components: {Formcarteiras},
    data: () => {
        return {
            carteiraAtual: {
                codigo_ativo: '',
                quantidade: '',
                preco_medio = ''
                isNew: true
            },
            carteiras: [],
            fields: [
                {
                    key: 'codigo_ativo',
                    label: 'Código'
                },
                {
                    key: 'quantidade',
                    label: 'Quantidade'
                },
                {
                    key: 'preco_medio',
                    label: 'Preço médio'
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
        async excluirCarteira() {
            let payload = {
                codigo_ativo: this.carteiraAtual.codigo_ativo,
                quantidade: this.carteiraAtual.quantidade,
                preco_medio: this.carteiraAtual.preco_medio = ''

            };
            try{
                await axios.delete(`http://localhost:3000/carteiras/${this.carteiraAtual.codigo_ativo}`, payload);
                await this.carregaCarteira();
            } catch(err){
                alert('erro ao deletar carteira');
            }
        },
        beforeEditaCarteira(carteira) {
            this.carteiraAtual = {
                codigo_ativo: carteira.codigo_ativo,
                quantidade: carteira.quantidade,
                preco_medio: this.carteiraAtual.preco_medio = '',
                isNew: false
            }
            this.$root.$emit('bv::show::modal', 'editacarteira');
        },
        async editaCarteira(){
            let payload = {
                quantidade: this.carteiraAtual.quantidade,
                preco_medio: this.carteiraAtual.preco_medio = ''
            };
            try{
                await axios.put(`http://localhost:3000/carteiras/${this.carteiraAtual.codigo_ativo}`, payload);
                await this.carregaCarteira();
            } catch(err){
                alert('erro ao atualizar carteira');
            }

          },
          async carregaCarteira(){
              this.carteiras.splice(0, this.carteiras.lenght);
              let dados = await axios.get('http://localhost:3000/carteiras/');
              this.carteiras.push(...dados.data);
          },
          beforeNovocarteira(){
              this.carteiraAtual.codigo_ativo = '';
              this.carteiraAtual.quantidade = '';
              this.carteiraAtual.preco_medio = '';
              this.carteiraAtual.isNew = true;
          },
          async saveNovoCarteira(){
              let payload = {
                  codigo_ativo: this.carteiraAtual.codigo_ativo,
                  quantidade: this.carteiraAtual.quantidade,
                  preco_medio: this.carteiraAtual.preco_medio = ''
              };
                          try {
                await axios.post('http://localhost:3000/carteiras/', payload);
                await this.carregaCarteira();
            } catch(err) {
                alert('erro ao inserir carteira');
          }
        },
        async mounted() {
            await this.carregaCarteira();
        }
    }
}
</script>