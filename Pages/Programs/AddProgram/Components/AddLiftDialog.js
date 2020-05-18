import React from 'react' ; 
import Dialog from 'react-native-dialog' ;
import {globals,colorCodes,colors,text} from '../../../../Styles/globals' ; 

export default function AddLiftDialog(props) {
    const [name,setName] = React.useState(null) ; 
    return (
        <Dialog.Container visible={props.visible}>
            <Dialog.Title style={[text.h3,colors.colorPrimary,text.capitalize,text.bold]}>
                Add a Lift
            </Dialog.Title>
            <Dialog.Description style={[text.h4,colors.colorNeutral]}>
                Enter the name of the lift you'd like to add
            </Dialog.Description>
            <Dialog.Input 
                onChangeText={(value) => setName(value)}
                placeholder={`Lift Name`}
                style={{borderBottomWidth:1,borderColor:colorCodes.primaryLighter,marginLeft:5,paddingLeft:0,color:colorCodes.primary}}
            ></Dialog.Input>
            <Dialog.Button label="Cancel " onPress={() => props.handleClose()} style={[colors.colorPrimary,text.bold]}/>
            <Dialog.Button label=" Add " onPress={() => props.handleAddLift(name)} style={[colors.colorPrimary,text.bold]}/>
        </Dialog.Container>
    )
}