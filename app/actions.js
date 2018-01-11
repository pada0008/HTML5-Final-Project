import axios from "axios";

export const I_CLICK = "ITEM_CLICKED";
export const I_FETCHED = "ITEM_FETCHED_SUCCESS";
export const I_FETCHING = "ITEM_FETCHING";
export const I_LIST = "ITEM_LIST";

export function itemClicked(business){
    return {
        type: I_CLICK,
        business: business
    };
}

export function fetchSuccess(data) {
    return {
        type: I_FETCHED,
        data: data
    };
}

export function fetchProcessing(isFetching){
    return {
        type: I_FETCHING,
        clickFetching: isFetching
    };
}

export function actionBack(isGoingBack){
    return{
        type: I_LIST,
        clickBack: isGoingBack
    };
}


// ----------------------------------------------------------

export function backToMasterList(){
    return (dispatch)=>  {
        dispatch(actionBack(true));
    };
}

export function fetchData() {
    return (dispatch)=> {

        dispatch(fetchProcessing(true));

        navigator.geolocation.getCurrentPosition(
            (position) => {

                console.log("in getGeo..");

                dispatch(YelpApi(position.coords.latitude, position.coords.longitude));

                console.log("coords: " + position.coords.latitude + position.coords.longitude);
            },
            (error) => {
                console.log("Error", error);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    };
}

export function YelpApi(lat, long) {
    return (dispatch) => {

        // yelp data featching..

        let key = "YOS1eabyxwNoU7T7huTlbBsa4ywNeLxc63kUDQAGZYcm5LprIlV7akaOEuDzV-DQ4C_jL30bQek6XfH1NXL5_XBO2PYz3MRqMaQgyJQwCBcdfFqwPadPWhjtGmBXWnYx";
        let url = "https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + long;

        let options = {
            headers: {
                "Authorization": "Bearer " + key
            }
        };

        axios.get(url, options).then((response) => {
            console.log(response);
            return response.data;
        }).then((data) => {
            dispatch(fetchProcessing(false));
            dispatch(fetchSuccess(data));
        }).catch(function (error) {
            console.log('error: ' + error.message);
            throw error;
        });
    };
}

// ----------------------------------------------------------
