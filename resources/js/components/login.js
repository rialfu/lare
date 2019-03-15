import React,{Component} from 'react'
import Axios from 'axios'
export class Login extends Component{
    constructor(){
        super()
        this.onSubmit.bind(this);
        this.state = {
            email:'',
            pasword:''
        }
    }
    onSubmit(e){
        e.preventDefault()
        if(this.login.email=='' && this.login.password==''){
            return console.log('kosong') 
          }
          const postData={
            grant_type:'password',
            client_id:'2',
            client_secret:'VLyMXivmMxSJAMY60VJb9pNoT1co1vdikKe7EgAk',
            username:this.state.email,
            password:this.state.password,
            scope:''
               
          }
          const authUser={}
          axios.post('http://localhost:8000/oauth/token', postData).then(
            res=>{
              if(res.status===200){
                // console.log(res.data)
                authUser.access_token=res.data.access_token
                authUser.refresh_token=res.data.refresh_token
                window.localStorage.setItem('authUser',JSON.stringify(authUser))
                const header ={
                    'Accept':'application/json',
                    'Authorization':'Bearer '+ res.data.access_token
                }
                axios.get('http://localhost:8000/api/user', {headers:header()})
                .then(res=>{
                  // console.log('user',res)
                  authUser.email=res.data.email
                  authUser.name=res.data.name
                  window.localStorage.setItem('authUser', JSON.stringify(authUser))
                  
                  
                })
                .catch(err=>console.log('error'))
              }
              if(res.status===401){
                console.log('gk diizinkan')
              }
            }
          ).catch(err=>{
            if(err.response.status===401){
              this.alert=true
              this.message='Your email or password is wrong'
            }
            if(err.response.status===500){
              this.alert=true
              this.message='server has been problem'
            }
            console.log(err.response.status)
    
          })
        
    }
    render(){
        return(
            <div class="text-center">
            <hr/>
            <form onSubmit={this.onSubmit}>
            <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input name="email" type="email" id="inputEmail" value={this.state.email}class="form-control" placeholder="Email address"/>
                <label for="inputPassword" class="sr-only" >Password</label>
                <input name="password" type="password" id="inputPassword" value={this.state.password} class="form-control" placeholder="Password"  required/>
                
                

                <button class="btn btn-lg btn-primary btn-block" type="submit" >Login</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2018</p>
            </form>
            
            </div>
        )
    }
}