
// ეეს არის ჩვეულებრივად ფუნქციურით 

// const Todonetasks = ({key,id,task,action,action2}) => {
//     return(
//         <div>
//             <div className='do-one-task' key={key}>
//                   <h2>TASK:{task}</h2>
//                   <h2>ID:{id}</h2>
//                   <button onClick={() => action(id)}>BACK TO DO</button>
//                   <button onClick={() => action2(id)}>REMOVE</button>
//             </div>
//         </div>
//     )
// }

// export default Todonetasks

///////////////////////////////////////////////////////////////////////////////////////////


// ეს არის კლასობრივი აქ ეს PureComponent არის იგივე shouldcomponentsupdate ოღონდ შვილზე ეს თვითონვე ამოწმებს 
// შეიცვალა თუარა პროპსები და დაარენდეროს თუ არა


import { PureComponent } from "react"



class Todonetasks extends PureComponent {
    
    resize = () => {
        console.log('user' + this.props.id)
    }

    componentDidMount(){
        window.addEventListener('resize',this.resize)
    }

   componentWillUnmount(){
    
    window.removeEventListener('resize',this.resize)
   }


    render(){
        const {key,id,task,action,action2} = this.props
        return(
            <div>
                <div className='do-one-task' key={key}>
                      <h2>TASK:{task}</h2>
                      <h2>ID:{id}</h2>
                      <button onClick={() => action(id)}>BACK TO DO</button>
                      <button onClick={() => action2(id)}>REMOVE</button>
                </div>
            </div>
        )

    }
}

export default Todonetasks