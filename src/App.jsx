
import './App.css';
import { Component } from 'react';
import Todotasks from './Components/Todotask';
import Todonetasks from './Components/Todonetask';

class App extends Component {

    state = {
      show:true,
      todotasks : [],
      todonetasks : [{task:'cringe',id:'11'},{task:'koba',id:'22'}],
      inputtask : '',
      users:[],
      error:null,
      todoid:1
    }

    getDerivedStateFromError(error){
      return{
        error:error.message
      }
    }

  
    static getDerivedStateFromProps(props,state){
        console.log('derived log')
        return {
          name:'koba'
        }
    }

    componentDidMount(){
    //   fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({
    //       users:data
    //     })
    //   })
    //   .catch(err => console.log(err))
    // }
    fetch(`https://jsonplaceholder.typicode.com/todos/${this.state.todoid}`)
    .then(data => data.json())
    .then(res => console.log(res))
    }

    componentDidUpdate(prevState,prevProps,snapshot){
      if(this.state.todoid !== prevState.todoid){
        fetch(`https://jsonplaceholder.typicode.com/todos/${this.state.todoid}`)
        .then(data => data.json())
        .then(res => console.log(res))
      }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   return (
    //     this.state.show !== nextState.show ||
    //     this.state.inputtask !== nextState.inputtask ||
    //     this.state.todotasks !== nextState.todotasks ||
    //     this.state.todonetasks !== nextState.todonetasks
    //   );
    // }
    
  
    onchange =(event) => {
      const value = event.target.value
      this.setState({
        inputtask : value
      })  
    }

    addtask = (event) => {
      event.preventDefault()

      if(this.state.inputtask === ''){
        alert('type task')
        return
        
      }
      

     const newtask = {
      task:this.state.inputtask,
      id:this.state.todotasks.length + 1
     }

     this.setState({
      todotasks:[...this.state.todotasks,newtask],
      inputtask:''
     })
    }

    alreadydone = (id) => {
        const donetask = this.state.todotasks.find((e) => e.id === id)
        const donetaskuser = {
          task:donetask.task,
          id:this.state.todonetasks.length + 1
        }

        // this.setState({
        //   todotasks:this.state.todotasks.filter((e) => e.id !== id),
        //   todonetasks:[...this.state.todonetasks,donetaskuser]
        // })

        this.setState((prevstate) => ({
            todotasks:prevstate.todotasks.filter((e) => e.id !== id),
            todonetasks:[...prevstate.todonetasks,donetaskuser]
        }))
    }

    backtodo = (id) => {
        const tobacktask = this.state.todonetasks.find((e) => e.id === id)
        const tobacktask2 = {
          task:tobacktask.task,
          id:this.state.todotasks.length + 1
        }

        this.setState((prevstate) =>({
          todonetasks: prevstate.todonetasks.filter((e) => e.id !== id),
          todotasks:[...prevstate.todotasks,tobacktask2]
        }))
    }

    removetask = (id) => {
      this.setState({
        todonetasks:this.state.todonetasks.filter((e) => e.id !== id)
      })
    }

    close = () => {
      this.setState((prevstate) => {
        return {
          show: !prevstate.show
        }
      })
    }

    open = () => {
      this.setState({
        show : true
      })
    }

    nexttodo = () => {
      this.setState((prevstate) => {
        return {
          todoid:prevstate.todoid + 1
        }
      })
    }


  render(){
    console.log('render log',this.state)
    return (
      <div className="App">
        <div className='main'>

        {/* {this.state.users.map((user) => 
          <div key={user.id}>
            <h1>{user.username}</h1>
          </div>
        )} */}
  

          <div className='forinput'>
            <h1>TYPE NEW TASK</h1>
            <input type="text" placeholder='new task' onChange={this.onchange} value={this.state.inputtask}/>
            <button className='btn' onClick={this.addtask} >click</button>
            <p>{this.state.name}</p>
          </div>

          <button onClick={this.close}>close</button>
          <button onClick={this.open}>open</button>
          <button onClick={this.nexttodo}>to do id</button>

          <div className='boxes'>

           {this.state.show  && (
            <div className='todobox box'>
            <h1>TO DO LIST</h1>
            {this.state.todotasks.map(e => 
              <Todotasks key={e.id} task={e.task} id={e.id} action={this.alreadydone}/>
            )}
          </div> 
           )}

            <div className='donebox box'>
              <h1>DONE LIST</h1>
              {this.state.todonetasks.map(e => 
                <Todonetasks key={e.id} task={e.task} id={e.id} action={this.backtodo} action2={this.removetask}/>
              )}
            </div>


          </div>


        </div>
      </div>
    );

  }
}

export default App;
