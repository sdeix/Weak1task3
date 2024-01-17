let eventBus = new Vue()

Vue.component("board", {
    template: `
<div class="board">
<ul class="columns">

<li class="column">
    <h3>Запланированные задачи</h3>
         <form>
           <div id="createcard">

          <div>
              <p>Название карточки:</p>
              <input type="text" placeholder="Название" v-model="title" maxlength="15">
          </div>

          <div>
          <p>Описание задачи:</p>
          <input type="text" placeholder="Описание" v-model="desc" maxlength="60">
          </div>

          <div>
          <input type="date" id="start" name="start" v-model="deadline"

          min="2023-01-01" max="2030-12-31">
          </div>
          
      </div>
      <p>Время дедлайна</p>
      <input type="submit" @click.prevent="CreateCard" value="Создать карточку"> 
      </form>  
    <ul>
        <li v-for="card in column1">
            <card :column=1 :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
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

            title:null,
            desc:null,
            deadline:null,

        }
    },
    methods: {
        CreateCard(){
            let createtime = new Date()
            info ={
                title:this.title,
                desc:this.desc,
                deadline:this.deadline,
                createtime:createtime,
            }
            this.column1.push(info)
        },
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
<p>{{this.title}}</p>
<p>{{this.desc}}</p>
<p>{{this.deadline}}</p>
<p>{{this.createtime}}</p>
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
            type:Number
        },
        title:{
            type:String
        },
        desc:{
            type:String
        },
        deadline:{
            type:String
        },
        createtime:{
            type:Date
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