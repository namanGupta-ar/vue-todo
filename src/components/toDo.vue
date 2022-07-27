<template>
  
  <div class="container">

     <h1>ToDo List App</h1>
    <div id="input-box">
        <div id="input-box-inner">
            <input type="text" id="input-data" v-model="todoItem.content" required>
            <label for="input-data">Enter Your Task</label>
            <div class="underline"></div>
        </div>
        <div id="add-task"><button @click="handleToDoItem">{{editMode ? "Save" : "Add"}}</button>
                  <button v-if="editMode" @click="handleCancel">Cancel</button>
        </div>
    </div>

    <!-- Show Tasks -->
        <div id="task">

          <!-- Incomplete Tasks -->
            <div id="incomplete">
                <p id="headline">TODO</p>
                <div class="item" v-for="(item,i) in todoList" :key="i">
                    <p>{{item.content}}</p>
                    <div class="icons">
                        <i class="fa-solid fa-pen-to-square" @click="handleEdit(item.id)"></i>
                        <i class="fa-solid fa-trash-can"  @click="handleDelete(item.id)"></i>
                        <i class="fa-solid fa-check" @click="handleComplete(item.id)"></i>
                    </div>
                </div>
            </div>

          <!-- Complete Tasks -->
            <div id="complete"> 
              <p id="headline">Completed</p>
                <div class="item" v-for="(item,i) in completed" :key="i">
                    <p>{{item.content}}</p>
                    <div class="icons">
                        <i class="fa-solid fa-trash-can" @click="handleDelete(item.id)"></i>
                        <i class="fa-solid fa-xmark" @click="handleComplete(item.id)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
const todoUrl = 'http://localhost:3500/todo';

export default {
  data(){
    return {
      todoList : [],
      todoItem : {},
      completed : [],
      editMode : false,
      initialize(){
        Axios.get(todoUrl).then((response)=> {
        this.todoList = response.data.filter((item) => {
            if(!item.completed) return true;
        });

        this.completed = response.data.filter((item) => {
            return item.completed;
        });
        });
      }
    }
  },
  methods : {
    handleEdit(id){ // clicked on edit icon
      this.editMode = true;
      this.todoItem = {...this.todoList.find((item) => item.id == id)};
    },
    handleCancel(){
      this.editMode = false;
      this.todoItem = {};
    },
    async handleToDoItem(){
      if(this.editMode){
        const id = this.todoItem.id;
        await Axios.put(`${todoUrl}/${id}`, this.todoItem);
        this.editMode = false;
      }else{
        await Axios.post(todoUrl,this.todoItem);
      }
        this.todoItem = {};
        this.initialize();
    },

    async handleComplete(id){
      this.editMode = false;
      var complete = await Axios.get(todoUrl).then((response)=> {
        return response.data.filter((item) => {
          return item.id == id;
        })[0]
      });
      complete.completed = !complete.completed;
      await Axios.put(`${todoUrl}/${id}`, complete);
      this.initialize();
    },
    async handleDelete(id){
      await Axios.delete(`${todoUrl}/${id}`);
      this.initialize();
    }
  },
 
  created(){
      this.initialize();
  },
}
</script>


<style>

@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
}

body{
    background-color: rgb(27, 19, 19);
}

h1{
    margin-top: 3vh;
    text-align: center;
    font-size: 4.5rem;
    color: rgb(255, 255, 255);
}
#input-box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 5.8vh;
}

#edit-task,#add-task{
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    width: 20vw;
}
#input-box button{
    height: 5rem;
    width: 10rem;
    border: none;
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    font-size: 2rem;
    transition: all 0.3s ease;

}

#input-box button:hover{
    transform: scale(1.2,1.2);
    box-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa
}

#headline{
  color : white;
  font-size: 3rem;
}

#task{
    display: flex;
    margin-top: 7vh;
}

#incomplete,#complete{
    width: 50vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.item{
    width: 40vw;
    background-color: 		#FB4D46;
    margin: 5px 0;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    border-radius: 2rem;
    align-items: center;
    padding: 2rem;
}
.item p{
    font-size: 2rem;
}

.icons i{
    font-size: 2rem;
    margin-left: 2rem;
    transition: all 0.3s ease;
}

.icons i:hover{
    transform: scale(1.2,1.2);
    color: rgb(39, 37, 37);
}

#complete .item{
    background: 	#02A4D3;
}



#input-box-inner{
    position: relative;
}

input[type="text"]{
    width: 40vw;
    height: 5vh;
    font-size: 2rem;
    border: none;
    border-bottom: 2px solid rgba(214, 212, 212, 0.735) ;
    background-color: transparent;
    color: 	#CCFF00;
}
 input:focus ~ label,
 input:valid ~ label{
  transform: translateY(-20px);
  font-size: 15px;
  /* color: #4158d0; */
  color: white;
}

.underline{
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: 0;
}
.underline:before{
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    /* background: #4158d0; */
    background: white;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
}
input:focus ~ .underline:before,
input:valid ~ .underline:before{
  transform: scaleX(1);
}

label{
    position: absolute;     
    bottom: 10px;
    left: 0;
    color: grey;
    pointer-events: none;
    transition: all 0.3s ease;
    font-size: 2rem;
  }


</style>
