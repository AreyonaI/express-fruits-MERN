const React = require ('react')


class Delete extends React.Component{
  
    
  
    render(){
      // const Fruit= this.props.deletedFruit;
      return(
        <p>You have deleted the {this.props.fruit.name}.</p>
      )
};
}
module.exports = Delete;