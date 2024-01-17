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
          <input type="date" id="start" name="start" v-model="deadlin"

          min="2023-01-01" max="2030-12-31">
          </div>
          
      </div>
      <p>Время дедлайна</p>
      <input type="submit" @click.prevent="CreateCard" value="Создать карточку"> 
      </form>  
    <ul>
        <li v-for="card in column1">
            <card @deletethis="Delete" @moveright="MoveR" :column=1 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Задачи в работе</h3>
    <ul>
        <li v-for="card in column2">
            <card @deletethis="Delete" @moveleft="MoveL" @moveright="MoveR" :column=2 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Тестирование</h3> 
    <ul>
        <li v-for="card in column3">
            <card @deletethis="Delete" @moveleft="MoveL" @moveright="MoveR" :column=3 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul> 
</li>

<li class="column">
    <h3>Выполненные задачи</h3>  
    <ul>
        <li v-for="card in column4">
            <card @deletethis="Delete" :column=4 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
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

            id:0,
            title:null,
            desc:null,

            year:null,
            month:null,
            day:null,
            deadlin:null,
            deadline:[],

        }
    },
    methods: {
        CreateCard(){
            if(this.title&&this.desc&&this.deadlin){
                this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                this.month = this.deadlin[5] + this.deadlin[6]
                this.day= this.deadlin[8] + this.deadlin[9]
                
                this.deadline.push({day:this.day, month:this.month, year:this.year})
                let createtime = new Date()
                info ={
                    id:this.id,
                    title:this.title,
                    desc:this.desc,
                    deadline:this.deadline,
                    createtime:String(createtime),
                    edit:false,
                }
                this.id+=1
                this.column1.push(info)
            }
        },
        Delete(id){
            for(let i = 0; i < this.column1.length; i++){
                if(this.column1[i].id==id){
                      this.column1.splice(i, 1)
            }}
            for(let i = 0; i < this.column2.length; i++){
                if(this.column2[i].id==id){
                      this.column2.splice(i, 1)
            }}
            for(let i = 0; i < this.column3.length; i++){
                if(this.column3[i].id==id){
                    this.column3.splice(i, 1)
            }}
            for(let i = 0; i < this.column4.length; i++){
                if(this.column4[i].id==id){
                    this.column4.splice(i, 1)
            }}
        },
        MoveL(id,col){
            if(col==2){
                for(let i = 0; i < this.column2.length; i++){
                    if(this.column2[i].id==id){
                        console.log(this.column2[i])
                        this.column1.push(this.column2[i])
                        this.column2.splice(i, 1)
                }}
            }
            else if(col==3){
                for(let i = 0; i < this.column3.length; i++){
                    if(this.column3[i].id==id){
                        this.column2.push(this.column3[i])
                        this.column3.splice(i, 1)
                }}
            }
        },
        MoveR(id,col){
            if(col==1){
                for(let i = 0; i < this.column1.length; i++){
                    if(this.column1[i].id==id){
                        console.log(this.column1[i])
                        this.column2.push(this.column1[i])
                        this.column1.splice(i, 1)
                }}
            }
            else if(col==2){
                for(let i = 0; i < this.column2.length; i++){
                    if(this.column2[i].id==id){
                        this.column3.push(this.column2[i])
                        this.column2.splice(i, 1)
                }}
            }
            else if(col==3){
                for(let i = 0; i < this.column3.length; i++){
                    if(this.column3[i].id==id){
                        this.column4.push(this.column3[i])
                        this.column3.splice(i, 1)
                }}
            }
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
<p>{{this.id}}</p>
<p>{{this.title}}</p>
<p>{{this.desc}}</p>
<p>{{this.deadline}}</p>
<p>{{this.createtime}}</p>
<div>
<button v-on:click="deletethis">Удалить карточку</button>
<button v-if="column==2||column==3" v-on:click="moveleft">Переместить назад</button>
<button v-if="column==1||column==2||column==3" v-on:click="moveright">Переместить дальше</button>

</div>
</div>
    `,
    data() {
        return{
        }
    },
    methods: {
        deletethis(){
            this.$emit("deletethis",this.id);
        },
        moveleft(){
            this.$emit("moveleft",this.id,this.column);
        },
        moveright(){
            this.$emit("moveright",this.id,this.column);
        },
    },
    mounted() {
    },
    props:{ 
        column:{
            type:Number
        },
        id:{
            type:Number
        },
        title:{
            type:String
        },
        desc:{
            type:String
        },
        deadline:{
            type:Array
        },
        createtime:{
            type:String
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