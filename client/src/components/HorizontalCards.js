import React, { Component } from 'react'

export class HorizontalCards extends Component {

    state = {
        fullArray: [],
        displayArray: [],
        pageCount: 1,
        totalPages: 1
    }


    // total number of pages
    // numberOfPages = Math.ceil(this.state.fullArray.length/4)
    
    componentDidMount(){

        if(this.props.inputArray){
        this.setState({
            fullArray: this.props.inputArray
        })
    }
        // console.log('numberOfPages', Math.ceil(this.state.fullArray.length/4))
        console.log('inputArray', this.props.inputArray)

    }

// console.log(this.state.fullArray.slice(0,4))
    render() {
       

        return (
            <div>
                
            </div>
        )
    }
}

export default HorizontalCards
