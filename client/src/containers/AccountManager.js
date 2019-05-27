import React, { Component } from 'react';
import { Button, Modal, Card } from 'antd';

import AccountTable from '../components/AccountTable';
import AccountModal from '../components/AccountModal';

import Api from '../api';

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

  async componentDidMount() {
    this.setState({ loadingAccounts: true })

    try {
      const response = await Api.getAccounts();
      this.setState({
        loadingAccounts: false,
        accounts: await response.json()
      });
    } catch (error) {
      console.log(error);
    }
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
  deleteAccount = async account => {
    const backUp = this.state.accounts.slice();

    this.setState(prevState => ({
      accounts: prevState.accounts.filter(acc => acc.id !== account.id)
    }));

    try {
      await Api.deleteAccount(account.id);
    } catch (error) {
      console.log(error);
      // if delete fails, restore the accounts to have it again and in the same order
      this.setState({
        accounts: backUp
      });
    }
  }

  updateAccount = async account => {
    this.setState({ requestInProgress: true });

    try {
      await Api.updateAccount(account);

      const idx = this.state.accounts.findIndex(a => a.id === account.id);
      const accounts = this.state.accounts.slice();

      accounts[idx].email = account.email;

      this.setState({
        requestInProgress: false,
        accounts,
        accountModalVisible: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ requestInProgress: false });
    }
  }

  createAccount = async account => {
    this.setState({ requestInProgress: true });

    try {
      const response = await Api.createAccount(account);
      const newAccount = await response.json();

      this.setState(prevState => ({
        requestInProgress: false,
        accounts: [
          ...prevState.accounts,
          newAccount
        ],
        accountModalVisible: false
      }));
    } catch (error) {
      console.log(error);
      this.setState({ requestInProgress: false });
    }
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
