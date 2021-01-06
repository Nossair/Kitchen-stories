import React ,{Component} from 'react';
import {Button,Panel,Form} from 'react-bootstrap';
class Myformulair extends Component{
    
    constructor(props) {
        super(props);
        this.state={
            message:'rien',
        }
        
     

        
    }
   
    sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms)); }
    updateparam = () =>{
      
        const regExp = /\s*,\s*/;
        var newname=document.getElementById("nom"+this.props.index).value;
        var sansredouble=document.getElementById("ingr"+this.props.index).value.replace(/,,+/g, ',');
        var newingr=sansredouble.split(regExp);
      
        if(newingr==0||newname==""){
                this.setState({
                    message:"non"
                })
            }else{

                this.setState({
                    message:"oui"
                })
        var newrecipes={name : newname,ingredients:newingr};
        if (this.props.isedit) {
            this.props.pass(this.props.index,newrecipes.name,newrecipes.ingredients)

        }else{
            document.getElementById("nom"+this.props.index).value='';
        document.getElementById("ingr"+this.props.index).value='';
        this.props.pass(newrecipes,true);
        }
    }
        this.sleep(4000).then(() => { this.setState({ message: "rien" }) });
    }
    
    test = () =>{
        if(this.props.isedit){
            var name=document.getElementById("nom"+this.props.index).value;
        var ingr=document.getElementById("ingr"+this.props.index).value;
        if (name==""&&ingr=="") {
         document.getElementById("nom"+this.props.index).value=this.props.recipeeditname;
        document.getElementById("ingr"+this.props.index).value=this.props.recipeeditingr;
        }
        }
        
        
    }
    
    
    render(){
        

        return(
           
         <div onMouseMove={()=>{this.test()}}> 
            <p className="N"> {this.state.message === "non" ?
              <div className="alert alert-danger" role="alert">
                vous devez entrer tous les informations
               </div> : null}</p>
                <label>Titre de la recette</label><br/>
               
        <input class="form-control form-control-lg" type="text" id={"nom"+this.props.index}  placeholder="Entrer le titre de la recette" ></input>
                
                <label>Ingredients</label><br/>
                <input class="form-control form-control-lg" type="text" id={"ingr"+this.props.index} placeholder="Entrer les ingridient" ></input>
                
               
                
                <Button bsStyle="success" size="sm" onClick={this.updateparam}>   {this.props.isedit? "Modifier":"Ajouter"}    </Button>
               
                </div> 
        
           )
    
    }
}
export default Myformulair