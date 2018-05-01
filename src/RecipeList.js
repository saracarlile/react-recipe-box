import React from 'react';

import { Panel, PanelGroup, Button, ButtonToolbar, ButtonGroup, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class RecipeList extends React.Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.saveInfo = this.saveInfo.bind(this);


        this.state = {
            show: false,
            currentRecipe: {id: 0, title: '', content: '' }, 
            title: '',
            ingredients: ''
        };
    }

    handleClick = (recipe, e) => {
        this.props.handleDelete(recipe); 
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(recipe, e) {
        this.setState({ show: true });
        this.setState({ currentRecipe: recipe });
    }

    handleAddShow() {
        this.setState({ show: true });
        if(this.props.recipes != undefined){
            let ids = this.props.recipes.map(a => a.id);
            let largestID =  Math.max.apply(Math, ids);
            this.setState({ currentRecipe: {id: largestID + 1, title: '', content: '' } });
        }
        if(this.props.recipes == undefined){
            this.setState({ currentRecipe: {id: 1, title: '', content: '' } });
        }
       
    }

    handleChangeTitle(currentRecipe, event) {
        this.setState({ title: event.target.value });
        this.state.currentRecipe.title = event.target.value;  
    }

    handleChangeIngredients(currentRecipe, event) {
        this.setState({ ingredients: event.target.value });
        this.state.currentRecipe.content = event.target.value;
    }

    saveInfo() {
        if(this.state.currentRecipe.content == '' || this.state.currentRecipe.title == ''){
            return;
        }
        this.props.handleSave(this.state.currentRecipe);  //communicates with top-level App.js parent
    }


    currentContent() {

        if (this.props.recipes.length > 0) {
            const recipeList = this.props.recipes.map((recipe) =>
                <Panel key={recipe.id.toString()} eventKey={recipe.id.toString()} data-id={recipe.id}>
                    <Panel.Heading>
                        <Panel.Title toggle>Recipe: {recipe.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        Ingredients: {recipe.content}
                        <div className="flex-btn-row">
                            <ButtonToolbar>
                                <Button bsSize="small" onClick={this.handleShow.bind(this, recipe)}>Edit</Button>
                                <Button className="margin-left" bsSize="small"  onClick={this.handleClick.bind(this, recipe)}>Delete</Button>
                            </ButtonToolbar>
                        </div>
                    </Panel.Body>
                </Panel>
            );
            return <div>
                <PanelGroup accordion id="accordion-example">
                    {recipeList}
                </PanelGroup>

                <h4>Add More Recipes</h4>
                <ButtonGroup>
                    <Button onClick={this.handleAddShow.bind(this, this.state.currentRecipe)}>Add Recipe</Button>
                </ButtonGroup>
            </div>;
        }

        return <div>
            <h4>You have no recipes yet! Add one!</h4>
            <ButtonGroup>
                <Button onClick={this.handleShow.bind(this, this.state.currentRecipe)}>Add Recipe</Button>
            </ButtonGroup>
        </div>;

    }


    render() {



        return (
            <div>
                
                {this.currentContent()}
                

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Add/Edit Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Recipe Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    defaultValue={this.state.currentRecipe.title}
                                    placeholder="Enter recipe title"
                                    onChange = {this.handleChangeTitle.bind(this, this.state.currentRecipe)}
                                />
                                <ControlLabel id="label-for-ingredients">Recipe Ingredients</ControlLabel>
                                 <FormControl
                                    type="text"
                                    defaultValue={this.state.currentRecipe.content}
                                    placeholder="Enter recipe ingredients"
                                    onChange = {this.handleChangeIngredients.bind(this, this.state.currentRecipe)}
                                />
                            </FormGroup>

                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonToolbar>
                            <Button onClick={this.saveInfo}>Save</Button> 
                            <Button onClick={this.handleClose}>Close</Button>
                        </ButtonToolbar>
                    </Modal.Footer>
                </Modal>
            </div>

            
        );
    }
}


export default RecipeList;