import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Spinner, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import * as counterActions from "../actions";

class BusinessListItem extends Component {

    render() {

        let distance = Math.round((this.props.distance / 1000) * 100) / 100;
        return (
            <ListItem button onPress={this.props.businessClicked}>
                <Thumbnail source={{uri: this.props.image_url}} />
                <Body>
                    <Text>{this.props.name}</Text>
                    <Text note> {distance} km</Text>
                </Body>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        businessClicked: state.businessClicked
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        businessClicked: () => {
            return dispatch(counterActions.itemClicked(ownProps));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListItem);