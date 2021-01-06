import React ,{Component} from 'react';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import './App.css';
import Popup from "reactjs-popup";
import Myformulair from './component/Myformulair';
import Myrecette from './component/Myrecette';
import { FcDeleteDatabase } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";



class App extends Component {
 state ={
   displayadd : 'true',
   displayedit : 'true',
    message:'rien',
   recipeedit : '',
   indexedit : '',
   recipes: [
    {name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"]},
    {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]},
    {name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"]}
  ]
 }
 sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms)); }
 componentDidMount() {//load the local storage data after the component renders
  var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
    {name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"]},
    {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]},
    {name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"]}
  ];
  this.setState({recipes: recipes});
}
 showframadd = () =>{
   this.setState({
     displayadd : !this.state.displayadd
   })
 }
 showframedit = () =>{
  this.setState({
   displayedit : !this.state.displayedit,
    

  })
}
 Ajouer = (recipe,display) =>{
  let recipes = this.state.recipes;
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
  this.setState({recipes: recipes});
  this.setState({displayadd:display})
  this.setState({message:'oui'})
  this.sleep(4000).then(() => { this.setState({ message: "rien" }) });
 }
 avantModifier = (index)=>{
    let recipes=this.state.recipes;

    this.setState({
      indexedit: index,
      recipeedit : recipes[index]
    });
    this.showframedit();
 }
 Modifier = (index,recipename,racipeingr)=>{
  let recipes = this.state.recipes;

  recipes[index] = {name: recipename, ingredients: racipeingr};
  localStorage.setItem('recipes', JSON.stringify(recipes));
  this.setState({message:'ouii'})
  this.setState({recipes: recipes,displayedit:!this.state.displayedit})
  this.sleep(4000).then(() => { this.setState({ message: "rien" }) });
}
Supprime = (index)=>{
  
  if (window.confirm("vous voulez vraiment supprimer cette recette ?")) {
    
  
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, indexedit: 0});
 } 
}
changeframs = ()=>{
  this.setState({
    displayedit:'true'
  })
}
 
  render(){
   
    var showcomadd=<Myformulair isedit={false}  pass={this.Ajouer}/>
    
    
    const recipes = this.state.recipes;
    return (
      <div className="App" >
        
        <div id="bg"></div>
        <div className="N"> {this.state.message === "oui" ?
               <div className="alert alert-success" role="alert">
                Votre Recette a été bien Ajouté
               </div> :
               null}</div>
        <Button bsStyle="btn btn-warning" size="lg" block onClick={this.showframadd}> <RiAddCircleFill/>  Ajouter une Recette</Button>
        {!this.state.displayadd ? showcomadd:null}
        
        <PanelGroup accordion id="recipes">
          {recipes.map((recipe, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" onClick={this.changeframs} toggle>{recipe.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
              <p className="N"> {this.state.message === "ouii" ?
               <div className="alert alert-success" role="alert">
                Votre Recette a été bien Modifié
               </div> :
               null}</p>
                {this.state.displayedit ? (<div>
              <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="btn btn-light" onClick={()=>{this.avantModifier(index)}}> <AiFillEdit/>   Modifier</Button>
                  <Button bsStyle="btn btn-light" onClick={()=>{this.Supprime(index)}}> <FcDeleteDatabase />  Supprimer</Button>
                 
    

                </ButtonToolbar>
                </div>):(<Myformulair isedit={true} index={index} recipeeditname={recipe.name} recipeeditingr={recipe.ingredients} pass={this.Modifier}/>)}
               
              </Panel.Body>
            </Panel>
          ))}
        </PanelGroup>
       
  
         
        
    </div>
  )
  }
  
  
}

export default App;
