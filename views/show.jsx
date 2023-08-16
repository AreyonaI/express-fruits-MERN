const React = require('react');

class Show extends React.Component{
    render (){
        const fruits= this.props.fruits
        return(
            <div>
                <h1>Show Fruit Page</h1>
                The {fruits.name} is {fruits.color}<br/> 
                {fruits.readyToEat? 'It is good to eat':'Nope, not ready'}
            </div>
            
        )
    }
}

module.exports = Show;