let eventBus = new Vue()

Vue.component("board", {
    template: `
<div class="board">
<ul class="columns">

<li class="column">
    <h3>Запланированные задачи</h3>  
    <ul>
        <li v-for="card in column1">
            <card :column=1></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Задачи в работе</h3>
    <ul>
        <li v-for="card in column2">
            <card :column=2></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Тестирование</h3> 
    <ul>
        <li v-for="card in column3">
            <card :column=3></card>
        </li>
    </ul> 
</li>

<li class="column">
    <h3>Выполненные задачи</h3>  
    <ul>
        <li v-for="card in column4">
            <card :column=4></card>
        </li>
    </ul>
</li>

</ul>
</div>
    `,
    data() {
        return{
            column1:[],
            column2:[],
            column3:[],
            column4:[],

            allcolumns:[],

        }
    },
    methods: {
    },
    mounted() {
    },
    props:{  
    },
    computed: {
    }
});

Vue.component("card", {
    template: `
<div class="card">
</div>
    `,
    data() {
        return{
        }
    },
    methods: {
    },
    mounted() {
    },
    props:{ 
        column:{
            type:Boolean
        } 
    },
    computed: {
    }
});


let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});