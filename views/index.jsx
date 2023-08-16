const React = require ('react')


class Index extends React.Component{
    render(){
        //map our fruits data to where we want it to go
        const{fruits}= this.props;
        return(
            <div>
                <nav>
                <a href="/fruits/new">Create a New Fruit</a>
                </nav>
                <h1>Fruits Index Page</h1>
                <ul>
                    {fruits.map((fruit,index)=>{
                       return(
                        <li>
                            The
                            {''}{/*blank space */}
                            <a href={`/fruits/${index} key=${index}`}>
                                {fruit.name}
                            </a>
                            {''}
                            is {fruit.color}<br/>
                            {fruit.readyToEat? `It is good to eat`:`Nope, not ready`}
                            <br/>
                        </li>
                       ) 
                    })}
                </ul>
            </div>
        )
    }
}

module.exports = Index;