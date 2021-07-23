<template>
    <div>
         
                <form>
                <label for="Foto">Foto</label>
                <input type="file" class="form-control">
                <input type="text" :value="this.DataIdEmpleado">
            </form>
   
    </div>
</template>
<script>
    export default {
        name: 'FrmAgregarFotoEmpleado',
         props: ["DataIdEmpleado"], 
         data(){
             return{
                 Id: this.DataIdEmpleado
             }
         }
        
    }
</script>