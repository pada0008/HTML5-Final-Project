import { I_CLICK, I_FETCHED, I_LIST, I_FETCHING} from "./actions";

export default function reducers(state, action) {
    let modifiedState = Object.assign({}, state);
    let business = [];
    // Switch statement for click events.
    switch(action.type) {
        case I_FETCHING:
            modifiedState.clickFetching = action.clickFetching;
            break;

        case I_FETCHED:
            let newBusinessData = modifiedState.data.map((i) => {
                return Object.assign({}, i);
            });
            for(let i = 0; i < action.data.businesses.length; i++){
                let business = {
                    id: action.data.businesses[i].id,
                    name: action.data.businesses[i].name,
                    phone: action.data.businesses[i].phone,
                    distance: action.data.businesses[i].distance,
                    rating: action.data.businesses[i].rating,
                    price: action.data.businesses[i].price,
                    image_url: action.data.businesses[i].image_url
                };
                newBusinessData.push(business);
            }
            modifiedState.data = newBusinessData;
            console.log("modifiedState.data");
            console.log(modifiedState.data);
            break;

        case I_CLICK:
            business = action.business;
            modifiedState.clickBack = false;
            modifiedState.clickItem = business;
            break;

        case I_LIST:
            modifiedState.clickBack = action.clickBack;
            break;

        default:
            return modifiedState;
    }

    return modifiedState;
}