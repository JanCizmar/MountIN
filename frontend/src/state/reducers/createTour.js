export default function reducer(state = {
    toursInput: {
        name: "",
        description:"",
        difficulty: 0,
        guideType: "",
        price: 0,
        route:[],
        activityType: 0,
        date:"",
        changedInput: []
    },

}, action) {
    switch (action.type) {
        case ('CREATE_TOURS'):{
            return {...state, toursInput: action.payload}
        }
        case ('CREATE_TOURS_INPUTS_CHANGED'):{
            return {...state, toursInput: action.payload}
        }
    }

    return {...state};
};