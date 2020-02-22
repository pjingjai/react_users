import React from 'react'
import axios from '../lib/axios'
import { Grid } from 'semantic-ui-react'
import TableGet from '../components/TableGet'
import CardGet from '../components/CardGet'

class UserPage extends React.Component {
    state = {
        modeGet: 'all',
        apiRoute: '/users',
        tableData: [],
        title: 'All',
        inputValue: '',
        inputValue2: '',
        apiParams: ''
    }

    async componentDidMount() {
        try {
            const response = await axios.get(this.state.apiRoute)
            this.setState({
                tableData: response.data
            })
        } catch (err) {
            console.error(err)
        }
    }

    render() {
        const { } = this.state

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <CardGet />
                    </Grid.Row>
                    <Grid.Row>
                        <TableGet />
                    </Grid.Row>
                </Grid>
            </div>

        )
    }
}

export default UserPage