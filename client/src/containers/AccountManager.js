import React, { Component } from 'react';
import { Button, Modal, Card } from 'antd';

import AccountTable from '../components/AccountTable';
import AccountModal from '../components/AccountModal';

class App extends Component {
  state = {
    accounts: [],
    modalItem: {
      email: ''
    },
    loadingAccounts: false,
    requestInProgress: false,
    accountModalVisible: false,
    confirmDeleteModalVisible: false
  }

  componentDidMount() {
    this.setState({ loadingAccounts: true })
    setTimeout(() => {
      this.setState({
        loadingAccounts: false,
        accounts: [
          { id: 1, email: 'lisandrolucatti@gmail.com' },
          { id: 2, email: 'doblel@test.com' },
          { id: 3, email: 'apolo@cats.com' }
        ]
      });
    }, 3000);
  }

  deleteHandler = account => {
    Modal.warning({
      title: 'Are you sure?',
      content: `${account.email} will be deleted.`,
      onOk: () => this.deleteAccount(account),
    })
  }

  editHandler = account => {
    this.setState({
      modalItem: { ...account },
      accountModalVisible: true
    });
  }

  createHandler = () => {
    this.setState({
      modalItem: { email: '', id: null },
      accountModalVisible: true
    });
  }

  persistHandler = account => {
    if (!!account.id)
      this.updateAccount(account);
    else
      this.createAccount(account);
  }

  // http calls
  deleteAccount = account => {
    const accounts = this.state.accounts.slice();

    this.setState({
      accounts: accounts.filter(acc => acc.id !== account.id)
    });
  }

  updateAccount = account => {
    this.setState({ requestInProgress: true });

    setTimeout(() => {
      const idx = this.state.accounts.findIndex(a => a.id === account.id);
      const accounts = this.state.accounts.slice();

      accounts[idx].email = account.email;

      this.setState({
        requestInProgress: false,
        accounts,
        accountModalVisible: false
      });
    }, 1500)
  }

  createAccount = account => {
    this.setState({ requestInProgress: true });

    setTimeout(() => {
      this.setState(prevState => ({
        requestInProgress: false,
        accounts: [
          ...prevState.accounts,
          {
            id: prevState.accounts.length + 1,
            email: account.email
          }
        ],
        accountModalVisible: false
      }));
    }, 1500)
  }

  render() {
    const headerStyles = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    };
    return (
      <Card>
        <div style={headerStyles}>
          <h2>Accounts</h2>
          <Button type="primary" icon="plus" onClick={this.createHandler}>Add account</Button>
        </div>
        <AccountTable
          isLoading={this.state.loadingAccounts}
          items={this.state.accounts}
          onDeleteAction={this.deleteHandler}
          onEditAction={this.editHandler}
        />
        {this.state.accountModalVisible && (
          <AccountModal
            item={this.state.modalItem}
            loading={this.state.requestInProgress}
            onSave={this.persistHandler}
            onCancel={() => this.setState({ accountModalVisible: false })}
          />
        )}
      </Card>
    );
  }
}

export default App;
