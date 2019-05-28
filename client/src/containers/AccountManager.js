import React, { Component } from 'react';
import { Button, Modal, Card, notification } from 'antd';

import AccountTable from '../components/AccountTable';
import AccountModal from '../components/AccountModal';

import Api from '../api';

class App extends Component {
  state = {
    accounts: [],
    modalItem: {
      email: '',
    },
    loadingAccounts: false,
    requestInProgress: false,
    accountModalVisible: false,
  };

  async componentDidMount() {
    this.setState({ loadingAccounts: true });

    try {
      const response = await Api.getAccounts();
      this.setState({
        loadingAccounts: false,
        accounts: response.data,
      });
    } catch (error) {
      this.setState({ loadingAccounts: false });
    }
  }

  deleteHandler = (account) => {
    Modal.warning({
      title: 'Are you sure?',
      content: `${account.email} will be deleted.`,
      onOk: () => this.deleteAccount(account),
    });
  };

  editHandler = (account) => {
    this.setState({
      modalItem: { ...account },
      accountModalVisible: true,
    });
  };

  createHandler = () => {
    this.setState({
      modalItem: { email: '', id: null },
      accountModalVisible: true,
    });
  };

  persistHandler = (account) => {
    if (!!account.id) this.updateAccount(account);
    else this.createAccount(account);
  };

  // http calls
  deleteAccount = async (account) => {
    const backUp = this.state.accounts.slice();

    this.setState((prevState) => ({
      accounts: prevState.accounts.filter((acc) => acc.id !== account.id),
    }));

    try {
      await Api.deleteAccount(account.id);
    } catch (error) {
      const { data } = error.response;
      notification.error({
        message: 'Error',
        description: data.message,
      });
      // if delete fails, restore the accounts to have it again and in the same order
      this.setState({
        accounts: backUp,
      });
    }
  };

  updateAccount = async (account) => {
    this.setState({ requestInProgress: true });

    try {
      await Api.updateAccount(account);

      const idx = this.state.accounts.findIndex((a) => a.id === account.id);
      const accounts = this.state.accounts.slice();

      accounts[idx].email = account.email;

      notification.success({
        message: 'Account updated',
        description: `${account.email} successfully saved.`,
      });

      this.setState({
        requestInProgress: false,
        accounts,
        accountModalVisible: false,
      });
    } catch (error) {
      const { data } = error.response;
      notification.error({
        message: 'Error',
        description: data.message,
      });
      this.setState({ requestInProgress: false });
    }
  };

  createAccount = async (account) => {
    this.setState({ requestInProgress: true });

    try {
      const response = await Api.createAccount(account);
      const newAccount = response.data;

      notification.success({
        message: 'Account created',
        description: `${newAccount.email} successfully saved.`,
      });

      this.setState((prevState) => ({
        requestInProgress: false,
        accounts: [...prevState.accounts, newAccount],
        accountModalVisible: false,
      }));
    } catch (error) {
      const { data } = error.response;
      notification.error({
        message: 'Error',
        description: data.message,
      });
      this.setState({ requestInProgress: false });
    }
  };

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
          <Button type='primary' icon='plus' onClick={this.createHandler}>
            Add account
          </Button>
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
