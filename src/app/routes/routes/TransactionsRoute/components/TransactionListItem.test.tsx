import { act, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import TransactionListItem from './TransactionListItem';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../store';

describe('TransactionListItem component', () => {

  const transaction = {} as Transaction

	it('renders', async() => {
    const {getAllById} = render(<TransactionListItem i={1} transaction={transaction}  />) 
		await waitFor(() => {
			expect(getAllById('TransactionListItem').length).toEqual(1);
		})
	});

})