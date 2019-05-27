import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const { Column } = Table;

const accountTable = ({ items, onEditAction, onDeleteAction, isLoading }) => {

  const buttonMargins = { margin: '0 2.5px' };

  const actionButtonStyles = { textAlign: 'right' };

  return (
    <Table dataSource={items} rowKey={item => item.id} pagination={false} loading={isLoading}>
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        key="actions"
        width={150}
        render={(t, item) => (
          <div style={actionButtonStyles}>
            <Button style={buttonMargins} type="default" icon="edit" onClick={() => onEditAction(item)} />
            <Button style={buttonMargins} type="danger" icon="delete" onClick={() => onDeleteAction(item)} />
          </div>
        )}
      />
    </Table>
  );
}

accountTable.propTypes = {
  onDeleteAction: PropTypes.func.isRequired,
  onEditAction: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

export default React.memo(accountTable);
