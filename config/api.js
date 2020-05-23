export const API = {
    V1:"http://192.168.0.105:3000/", 
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
        ADD:"user/add",
        DELETE:"user/delete",
    }, 
    PROGRAMS:{
        GET:"programs/get/", 
        ADD:"programs/add/"
    },
    REVIEWS:{
        ADD:`reviews/add`
    },
}

export const TEST = {
    USER:"5ec654c39de8f4189047bcfb"
}

