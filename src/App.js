import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
  
  onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    console.log("Dragged from", source, "to", destination);
    
  };

  renderShippingRequests() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Board />
      </DragDropContext>
    );
  }

  renderNavigation() {
    return (<Navigation
      onClick={(tabName) => this.changeTab(tabName)}
      selectedTab={this.state.selectedTab}
      />);
  }

  renderTabContent() {
    switch(this.state.selectedTab) {
      case 'home':
      default:
        return <HomeTab />;
      case 'shipping-requests':
        return this.renderShippingRequests();
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderNavigation()}

        <div className="App-body">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;
