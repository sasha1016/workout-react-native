imort React from 'react' ; 

export const Context = React.createContext() ; 

export class SetReviewContext extends React.Component {
    state = {
            completedAsPlanned:true,
            setBreakdown:null,
            technique:0,
            rating:0
    }

    reducers = {
        setBreakdown: (val) => this.setState({setBreakdown:val}), 
        technique: (val) => this.setState({technique:val}),
        rating: (val) => this.setState({rating:val}),
        completedAsPlanned: () => this.setState({completedAsPlanned:!this.state.completedAsPlanned})
    }

    

    render() {
        return (
            <Context.Provider value={{...this.state,...this.reducers}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}