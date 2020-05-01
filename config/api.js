export const API = {
    V1:"http://192.168.0.102:3000/", 
}

// exp://192.168.43.85:19000

export const V1 = {
    USER:{
        PROGRAMS:{
            GET:"user/programs/get/",
            ADD:"user/programs/add/",
            SWITCH:"user/programs/switch/"
        },
        ROUTINES:{
            GET:"user/routines/get",
            ADD:"user/routines/add",
            UPDATE:"user/routines/update",
            DELETE:"user/routines/delete", 
            DAY:{
                GET:"user/routines/day/"
            }
        },
        REVIEWS:{
            SET:{
                ADD:"user/reviews/set/add",
            }
        }
    }, 
    PROGRAMS:{
        GET:"programs/get/", 
        ADD:"programs/add/"
    },
}

export const TEST = {
    USER:"5e97f7e4ed90401a58eca3ea"
}

