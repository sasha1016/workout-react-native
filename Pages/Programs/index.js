import React,{ useState } from 'react' ; 
import { View, ScrollView, Alert } from 'react-native' ; 

import { globals,colorCodes } from '../../Styles/globals' ; 
import { capitalize } from '../../Utilities' ; 
import { List} from 'native-base' ; 
import { IconButton } from 'react-native-paper';
import RenderUserPrograms  from './Components/RenderUserPrograms'
import UserProgram from '../../Classes/UserProgram';
import { UserContext } from '../../Layout/Contexts';
import ActionBar from './Components/ActionBar'


export default function Programs({navigation}) {

    var [programs,setPrograms] = useState([]);
    var [intentToEnd,setintentToEnd] = useState(false) ; 
    const user = React.useContext(UserContext) ; 

    function viewUserProgram(userProgram) {
        navigation.push('UserProgramInformation',{userProgram}) ; 
    }

    function viewPrograms(filterBy,filterByValue,exclude) {
        navigation.push('ViewPrograms',{filterBy,filterByValue,exclude}) ;
    }

    function getPrograms() {
        let userProgram = new UserProgram(user.data.uid) ;
        userProgram.getAll()
        .then((programs) => {
            setPrograms(programs) ; 
        }) 
        .catch((error) => {
            console.warn(error.message) ; 
        })
    }

    function endProgram(userProgram) {

        Alert.alert(
            `Warning`,
            `Are you sure you want to end your ${capitalize(userProgram.program.name)} for ${capitalize(userProgram.program.muscleGroup || userProgram.program.liftName)} prematurely? All progress will be lost.`,
            [
                {text:"Cancel",style:"cancel"},
                {text:"End",onPress:() => {_endProgram(userProgram._id)} }
            ]
        )

        function _endProgram(id) {
            let userProgram = new UserProgram(user.data.uid) ; 
            userProgram.end(id)
            .then(() => {
                setintentToEnd(false)
                getPrograms() ; 
            }) 
            .catch((message) => {
                console.warn(message) ; 
            })
        }

    }


    function setHeaderButton() {
        navigation.setOptions({
            headerRight:() => <IconButton icon="plus" color={colorCodes.secondary} onPress={ () => navigation.push('AddProgram')}/>
        }) ;
    }

    React.useLayoutEffect(() => {
        getPrograms() ; 
        setHeaderButton() ; 
    },[])

    return (
        <View style={[{flex:1}]}>
            <ScrollView>
                <View style={[{flex:1,marginTop:10},globals.rootContainer]}>
                    <List itemDivider={false}>
                        <RenderUserPrograms 
                            userPrograms={programs} 
                            viewUserProgramInformation={viewUserProgram} 
                            onStartNewProgramIntent={viewPrograms}
                            intentToEnd={intentToEnd}
                            onEndProgram={endProgram}
                        />
                    </List>
                </View>
            </ScrollView>
            <ActionBar onDelete={() => {setintentToEnd(!intentToEnd)}}/>
        </View>
    ) ; 
 

}
