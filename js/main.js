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
            <card @deletethis="Delete" @moveright="MoveR" @edit="EditCard" :last_red="card.last_red" :column=1 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Задачи в работе</h3>
    <ul>
        <li v-for="card in column2">
            <card @deletethis="Delete" @moveright="MoveR" @edit="EditCard" :reason="card.reason"  :last_red="card.last_red" :column=2 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul>
</li>

<li class="column">
    <h3>Тестирование</h3> 
    <ul>
        <li v-for="card in column3">
            <card @deletethis="Delete" @moveleft="MoveL" @edit="EditCard" :reason="card.reason" :last_red="card.last_red" @moveright="MoveR" :column=3 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
        </li>
    </ul> 
</li>

<li class="column">
    <h3>Выполненные задачи</h3>  
    <ul>
        <li v-for="card in column4">
            <card @deletethis="Delete" :last_red="card.last_red" :column=4 :id="card.id" :title="card.title" :desc="card.desc" :deadline="card.deadline" :createtime="card.createtime"></card>
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

            reason:null,
            last_red:null,

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
                    last_red:"",
                    reason:"",
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
        MoveL(id,col,reason){
            if(col==3){
                for(let i = 0; i < this.column3.length; i++){
                    if(this.column3[i].id==id){
                        this.column3[i].reason = reason
                        console.log(this.column3[i].reason)
                        this.column2.push(this.column3[i])
                        this.column3.splice(i, 1)
                }}
            }
        },
        MoveR(id,col){
            if(col==1){
                for(let i = 0; i < this.column1.length; i++){
                    if(this.column1[i].id==id){
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
        EditCard(id,titlenew,descnew,deadlinenew){
            for(let i = 0; i < this.column1.length; i++){
                if(this.column1[i].id==id){
                    this.deadlin = deadlinenew
                    this.year = this.deadlin[0] + this.deadlin[1] + this.deadlin[2] + this.deadlin[3]
                    this.month = this.deadlin[5] + this.deadlin[6]
                    this.day= this.deadlin[8] + this.deadlin[9]
                    this.deadline = []
                    this.deadline.push({day:this.day, month:this.month, year:this.year})
                    let last_red = new Date()

                    this.column1[i].title=titlenew,
                    this.column1[i].desc=descnew,
                    this.column1[i].deadline=this.deadline
                    this.column1[i].last_red=String(last_red)
            }}
            for(let i = 0; i < this.column2.length; i++){
                if(this.column2[i].id==id){
                        this.column2.splice(i, 1)
            }}
            for(let i = 0; i < this.column3.length; i++){
                if(this.column3[i].id==id){
                    this.column3.splice(i, 1)
            }}
        }
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
<h4>{{this.title}}</h4>
<p>Описание: {{this.desc}}</p>
<p>Дедлайн: {{this.deadline[0].day}}.{{this.deadline[0].month}}.{{this.deadline[0].year}}</p>
<p>Дата создания:{{this.createtime}}</p>
<p v-if="last_red">Последнее редактирование: {{this.last_red}}</p>
<p>Причина возврата: {{this.reason}}</p>

<div>
<button v-on:click="deletethis">Удалить карточку</button>
<button v-if="column==1||column==2||column==3" v-on:click="editable">Редактировать</button>

<div v-if="column==3" class="sendback">
<button :disabled="!reason" v-on:click="moveleft">Переместить назад</button>
<p>Название карточки:</p>
<input type="text" placeholder="Причина возврата" v-model="reason" maxlength="40">
</div>

<button v-if="column==1||column==2||column==3" v-on:click="moveright">Переместить дальше</button>
<form v-if="edit">
<div id="redact">

<div>
    <p>Название карточки:</p>
    <input type="text" placeholder="Название" v-model="titlenew" maxlength="15">
</div>

<div>
<p>Описание задачи:</p>
<input type="text" placeholder="Описание" v-model="descnew" maxlength="60">
</div>

<div>
<input type="date" id="start" name="start" v-model="deadlinenew"

min="2023-01-01" max="2030-12-31">
<input type="submit" @click.prevent="RedCard" value="Редактировать карточку"> 
</div>
</div>
</form>
</div>
</div>
    `,
    data() {
        return{
            edit:false,
            titlenew:null,
            descnew:null,
            deadlinenew:null,
        }
    },
    methods: {
        deletethis(){
            this.$emit("deletethis",this.id);
        },
        moveleft(){
            this.$emit("moveleft",this.id,this.column, this.reason);
        },
        moveright(){
            this.$emit("moveright",this.id,this.column);
        },
        editable(){
            this.edit=!this.edit
        },
        RedCard(){
            if(this.titlenew&&this.descnew&&this.deadlinenew){
                this.edit=false               
                this.$emit("edit",this.id,this.titlenew,this.descnew,this.deadlinenew); 
            }  
        }
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
        },
        last_red:{
            type:String,
        },
        reason:{
            type:String,
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