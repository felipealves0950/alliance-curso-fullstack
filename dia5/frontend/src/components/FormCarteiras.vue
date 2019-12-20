<template>
    <b-form>
        <b-form-group
        id="input-codigo_ativo"
        label="Código"
        label-for="txtCodigo_ativo"
        description="Informe o código único do Ativo"
        :disabled="!content.isNew"
        >
            <b-form-input
                id="txtCodigo_ativo"
                v-model="content.codigo_ativo"
                type="text"
                required
                placeholder="Código do Ativo"
                @input="handleInput"
                :disabled="!content.isNew"
            />
        </b-form-group>

        <b-form-group
        id="input-quantidade"
        label="Quantidade"
        label-for="txtquantidade"
        description="De ao Ativo uma Quantidade"
        :disabled="!content.isNew"
        >
            <b-form-input
                id="txtquantidade"
                v-model="content.quantidade"
                type="numeric"
                required
                placeholder="Quantidade do Ativo"
                @input="handleInput"
            />
        </b-form-group>
    </b-form>
</template>

<script>
export default {
    props: ['value'],
    data (){
        return {
            content:{
                codigo_ativo: this.value.codigo_ativo,
                quantidade: this.value.quantidade,
                isNew: this.value.isNew
            }
        }
    },
    methods: {
        handleInput() {
            let retorno = {
                codigo_ativo: this.content.codigo_ativo,
                quantidade: this.content.quantidade,
                isNew: this.content.isNew
            };
            this.$emit('input', retorno)
        }
    }
}
</script>