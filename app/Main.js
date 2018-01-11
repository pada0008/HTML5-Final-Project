import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Card, CardItem, Spinner, Thumbnail } from 'native-base';
import { connect } from "react-redux";
import * as actions from "./actions";
import MasterList from "./drawing/MasterList";
import { Image } from "react-native";

class Main extends Component {

    render() {
        let mainContent = {};
        let backButton = [];

        // click conditions

        if(this.props.clickBack){
            mainContent = <MasterList/>;
        }
        else if(this.props.clickItem){

            let distance = Math.round((this.props.clickItem.distance / 1000) * 100) / 100;

            backButton =
                <Left>
                    <Button transparent onPress={this.props.backToList}>
                        <Icon name='arrow-back' />
                        <Text>Back</Text>
                    </Button>
                </Left>;

            mainContent =
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text>{this.props.clickItem.name}</Text>
                            <Text note>{distance}km</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{uri: this.props.clickItem.image_url}} style={{height: 250, width: 100, flex: 1 }}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>Rating: {this.props.clickItem.rating}</Text>
                            <Text>Price: {this.props.clickItem.price}</Text>
                            <Text>{this.props.clickItem.phone}</Text>
                        </Body>
                    </CardItem>
                </Card>;

        }
        else if(this.props.clickFetching){
            mainContent = <Spinner/>;
        }
        else if(!this.props.data[0]) {
            mainContent = <Button full light onPress={this.props.fetchData}><Text>Find Restaurants Nearby..</Text></Button>;
        }
        else{
            mainContent = <MasterList/>;
        }

        return (
            <Container>
                <Header>
                    {backButton}
                    <Body>
                    <Title> Restaurants Finder </Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {mainContent}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>(c)Janki Padaliya</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        clickItem: state.clickItem,
        clickFetching: state.clickFetching,
        clickBack: state.clickBack,
        backToList: state.backToList,
        fetchData: state.fetchData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(actions.fetchData()),
        backToList: () => dispatch(actions.backToMasterList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);