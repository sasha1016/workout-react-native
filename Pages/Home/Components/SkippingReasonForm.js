import React from 'react'  ;

import Modal from '../../../Components/Modal' ; 

import CustomListItem from '../../../Components/ListItem2' ; 
import { FlatList } from 'react-native-gesture-handler';

const EXCUSES = [
    `Time Constraint`,
    `Exhausted`,
    `Unwell`,
    `Got High Today`,
    `Hungover`
]


export default function ReasonForSkipping({visible,toggler,aspect="",onSkipped}) {

    const [selectedExcuses,setSelectedExcuses] = React.useState([]); 

    const skip = () => {
        onSkipped(selectedExcuses) ; 
        toggler(!visible) ; 
    }

    const _renderItem = ({item}) => {
        let excuseSelected = selectedExcuses.includes(item);
        return(
            <CustomListItem 
                title={item}
                mode="NAV"
                icon={excuseSelected ? "check-square" : "square"}
                onIconPress={() => excuseSelected ? setSelectedExcuses(selectedExcuses.filter(e => e !== item)) : setSelectedExcuses([...selectedExcuses,item])}
                onPress={() => excuseSelected ? setSelectedExcuses(selectedExcuses.filter(e => e !== item)) : setSelectedExcuses([...selectedExcuses,item])}
            />
        )        
    }

    
    return (
        <Modal scrollable={false} title={`Skip ${aspect}`} visible={visible} toggler={toggler} buttons={[{text:`Skip`,onPress:() => skip()}]}>
            <FlatList 
                data={EXCUSES} 
                renderItem={_renderItem}
                keyExtractor={(_,index) => `key-${index}`}
                getItemLayout={(_,index) => ({length:46,offset:46 * index,index})}
            />
        </Modal>
    ) ; 
} 