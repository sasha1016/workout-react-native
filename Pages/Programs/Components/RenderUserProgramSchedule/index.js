import React from 'react' ; 
import CustomListItem from '../../../../Components/ListItem2' ;
import Divider from '../../../../Components/Divider' ;
import RenderDay from './Components/RenderDay';

export default function RenderProgramSchedule({duration,preferredDays,days,userProgram = false, oneRepMaxes={}}) {

    const [toggledDay,setToggledDay] = React.useState(null) ; 

    const dayToggler = (day) => {
        setToggledDay((day === false ? null : day)) ; 
    }

    return (
        <React.Fragment>
            {
                toggledDay !== null ? 
                    <RenderDay 
                        visible={true}
                        toggler={dayToggler}
                        day={toggledDay.name}
                        week={toggledDay.week}
                        days={days}
                        userProgram={userProgram}
                        oneRepMaxes={oneRepMaxes}
                    />
                : 
                    null
            }
            {
                [...Array(duration).keys()].map((_,index) => {
                        return(
                            <React.Fragment>
                                <Divider title={`Week ${index+1}`} key={`divider-${index}`}/>
                                {
                                    preferredDays.map((day) => {
                                        return (
                                            <CustomListItem 
                                                title={day}
                                                desc={[`View Lifts`]}
                                                mode="NAV"
                                                key={`${day}`}
                                                onPress={() => dayToggler({name:day,week:index})}
                                            />
                                        )
                                    })
                                }
                            </React.Fragment>
                        )
                })
            }
        </React.Fragment>
    )
}