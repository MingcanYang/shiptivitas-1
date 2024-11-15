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
    const clients = this.getClients();
    this.state = {
      selectedTab: 'home',
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status === 'in-progress'),
        complete: clients.filter(client => client.status === 'complete')
      }
    };
  }

  getClients() {
    return [
      { id: '1', name: 'Stark, White and Abbott', description: 'Cloned Optimal Architecture', status: 'in-progress' },
      { id: '2', name: 'Wiza LLC', description: 'Exclusive Bandwidth-Monitored Implementation', status: 'complete' },
      { id: '3', name: 'Nolan LLC', description: 'Vision-Oriented 4Thgeneration Graphicaluserinterface', status: 'backlog' },
      // 更多客户端数据...
    ];
  }

  onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const sourceList = [...this.state.clients[source.droppableId]];
    const destList = [...this.state.clients[destination.droppableId]];

    const [movedItem] = sourceList.splice(source.index, 1);
    movedItem.status = destination.droppableId;
    destList.splice(destination.index, 0, movedItem);

    this.setState({
      clients: {
        ...this.state.clients,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList
      }
    });
  };

  renderShippingRequests() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Board clients={this.state.clients} />
      </DragDropContext>
    );
  }

  renderNavigation() {
    return (
      <Navigation
        onClick={(tabName) => this.changeTab(tabName)}
        selectedTab={this.state.selectedTab}
      />
    );
  }

  renderTabContent() {
    switch (this.state.selectedTab) {
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
