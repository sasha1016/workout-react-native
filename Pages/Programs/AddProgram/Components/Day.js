import React from 'react' ; 
import Header from '../../../../Components/ListHeader' ; 
import CustomListItem from '../../../../Components/ListItem2' ;
import Modal from '../../../../Components/Modal';
import {View,Alert,Text} from 'react-native' ; 
import AddLiftDialog from './AddLiftDialog';
import {COMPOUNDS,globals,colors,colorCodes} from '../../../../Styles/globals' ; 
import {Item,Label,Input} from 'native-base' ;

const SetInput = ({handleBlur = () => {},label,handleChange,value,noBorder = false}) => {
    return(
        <Item 
            fixedLabel 
            style={[
                {height:40,width:"100%",borderColor:('transparent')}
            ]}
        >
            <Label 
                style={[
                    globals.h5,
                    colors.colorPrimaryLighter,
                    {paddingLeft:5,textAlign:"right"}
                ]}
            >
                {`${label}  `}
            </Label>
            <Input 
                keyboardType="numeric" 
                style={[
                    globals.h5,
                    colors.colorPrimary,
                    {height:"100%",borderBottomWidth:1,borderBottomColor:colorCodes.grey}
                ]} 
                value={value} 
                onChangeText={(value) => handleChange(value)}
                onBlur={() => {handleBlur()}}
            />
        </Item>
    )
}

const AddSetForm = ({onSubmit,percentage = true,lift}) => {

    const INITIAL_STATE_SET = {reps:null,percentage:null} ;

    const [set,setSet] = React.useState(INITIAL_STATE_SET);

    function handleBlur() {
        if(set.reps !== null && (set.percentage !== null || set.increment)) {
            onSubmit(set,lift) ;
            setSet(INITIAL_STATE_SET) ; 
        } 
    }

    return (
        <View style={{borderTopWidth:1,borderTopColor:colorCodes.grey}}>
            <SetInput 
                label="Reps"
                noBorder={true}
                handleChange={(reps) => setSet({...set,reps})}
                value={set.reps}
            />

            {
                percentage ? 
                    <SetInput 
                        label="Percentage"
                        handleChange={(percentage) => setSet({...set,percentage}) }
                        value={set.percentage}
                        handleBlur={handleBlur}
                    />
                :
                    <SetInput 
                        label="Increment"
                        handleChange={(increment) => setSet({...set,increment})}
                        value={set.increment}
                        handleBlur={handleBlur}
                    />
            }
            
        </View>
    )
}


export default function Day({visible,toggler,nameOfTheDay,program,addLiftsToDay}) {

    const [toComplete,setToComplete] = React.useState([]); 
    const [lifts,setLifts] = React.useState([]) ; // unique lifts in the day 
    const [addLiftDialog,setAddLiftDialog] = React.useState(false) ; 
    const [updated,setUpdated] = React.useState(1); 

    React.useLayoutEffect(() => {
        if(visible) {
            let day = (program.days.filter((d) => { return d.name === nameOfTheDay})) ; 
            let dayHasLifts = day.length !== 0 ? true : false ; 

            dayHasLifts ? setToComplete(day[0].toComplete) : false ;
        }
    },[visible]) ; 

    function _onClose() {
        addLiftsToDay(toComplete,nameOfTheDay) ; 
    }

    function _reRender() {
        setUpdated(updated + 1) ; 
    }

    const toggleAddLiftDialog = () => {
        setAddLiftDialog(!addLiftDialog)
    }

    const addLift = (name) => {

        let liftAlreadyAdded = lifts.includes(name) ; 
        if(liftAlreadyAdded) {
            Alert.alert(`Warning` ,`You cannot add a lift that already exists`) ; 
        } else {
            setToComplete([...toComplete,{name,sets:[]}]);
            setLifts([...lifts,name]) ; 
            toggleAddLiftDialog() ; 
        }
        
    }
    function _deleteLift(lift) {
        let liftRemovedArray = toComplete.filter((l) => {return lift.name !== l.name}) ; 
        setToComplete(liftRemovedArray); 
    }

    function _addSet(set,lift) {
        let toCompleteCopy = toComplete ; 

        toCompleteCopy.map((l,index) => {
            l.name === lift.name ? toCompleteCopy[index] = {...l,sets:[...l.sets,set]} : false 
        }) ; 

        setToComplete(toCompleteCopy) ; 
        _reRender() ; 
    }
    function _deleteSet(set,lift) {
        let toCompleteCopy = toComplete ; 
        toCompleteCopy.map((l,index) => {
            if (lift.name === l.name) {
                let newSets = l.sets.filter((s) => {return s !== set}) ;
                toCompleteCopy[index] = {...l,sets:newSets} ; 
            }
        }) ; 
        setToComplete(toCompleteCopy) ; 
        _reRender() ; 
    }



    function _renderSets(sets,lift) {
        return(
                sets.length === 0 ? 
                    <Text style={[...COMPOUNDS.tidbit]}>It's empty. Add a Set below.</Text>
                :
                    sets.map((set,index) => {
                        return (<CustomListItem
                            title={`Set ${index +1}`}
                            desc={[`${set.reps} Reps`]}
                            icon="trash-2"
                            mode="NAV"
                            onIconPress={() => _deleteSet(set,lift)}
                            key={`${index}-lift`}
                        />)
                    })   
        ) ;  

    }
    function _renderLift(lift) {
        return (
            <View style={{marginBottom:20}}>
                <Header title={lift.name || ""} icon="trash-2" onIconPress={() => _deleteLift(lift)}/>
                {
                   _renderSets(lift.sets,lift)  
                }
                <AddSetForm  onSubmit={_addSet} percentage={program.weightFactor === "percentage" ? true : false} lift={lift}/>

            </View>
        )
    }


    const buttons = [
        {
            text:`Add Lift`,
            onPress:toggleAddLiftDialog, 
        },
        {
            text:`Submit`,
            onPress:() => {_onClose();toggler(!visible)},
        }
    ] ; 


    return (
        <React.Fragment>
            <Modal title={nameOfTheDay} buttons={buttons} visible={visible} toggler={toggler} onClose={_onClose}>
                <View>
                    {
                        toComplete.length === 0 ? 
                            <Text style={[...COMPOUNDS.tidbit,{paddingTop:0}]}>It's empty. Add a Lift</Text>
                        :
                            toComplete.map((lift) => _renderLift(lift))
                    }
                </View>
            </Modal>
            <AddLiftDialog visible={addLiftDialog} handleClose={toggleAddLiftDialog} handleAddLift={addLift}/>
        </React.Fragment>
    )

}