import React from 'react'
import axios from '../lib/axios'
import { Select, Button, Icon, Label, Menu, Table, Grid, Input } from 'semantic-ui-react'

class TableGet extends React.Component {
    state = {
        modeGet: 'all',
        apiRoute: '/users',
        tableData: [],
        title: 'All',
        inputValue: '',
        inputValue2: '',
        apiParams: ''
    }

    apiRouteOptions = {
        'all': '/users',
        'gender': '/gender',
        'age': '/age',
        'age(range)': '/ages'
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
        const { modeGet, title, tableData } = this.state
        const options = [
            {
                key: 'all',
                text: 'All',
                value: 'all',
                icon: 'search'
            },
            {
                key: 'gender',
                text: 'Gender',
                value: 'gender',
                icon: 'search'
            },
            {
                key: 'age',
                text: 'Age',
                value: 'age',
                icon: 'search'
            },
            {
                key: 'age(range)',
                text: 'Age(range)',
                value: 'age(range)',
                icon: 'search'
            }
        ]

        return (
            <Grid>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={14}>
                    <div className='panel'>
                        <Select
                        className='my_dropdown'
                            defaultValue={modeGet}
                            fluid
                            selection
                            options={options}
                            style={{ maxWidth: '200px' }}
                            onChange={
                                (e, { value }) => {
                                    this.setState(
                                        (prevState) => {
                                            return {
                                                modeGet: value,
                                                apiRoute: this.apiRouteOptions[value]
                                            }
                                        }
                                    )
                                }
                            }
                        />

                        {
                            modeGet === 'gender' ?
                                <Select
                                className='my_dropdown'
                                    placeholder='Gender'
                                    fluid
                                    selection
                                    options={[
                                        {
                                            key: 'male',
                                            text: 'Male',
                                            value: 'male'
                                        },
                                        {
                                            key: 'female',
                                            text: 'Female',
                                            value: 'female'
                                        }
                                    ]}
                                    style={{ maxWidth: '200px' }}
                                    onChange={
                                        (e, { value }) => {
                                            this.setState({ inputValue: value })
                                        }
                                    }
                                /> :
                                modeGet === 'age' ?
                                    <Input type='text' onChange={
                                        e => {
                                            this.setState({ inputValue: e.target.value })
                                        }
                                    } /> :
                                    modeGet === 'age(range)' ?
                                        <div>
                                            <Input type='text' onChange={
                                                e => {
                                                    this.setState({ inputValue: e.target.value })
                                                }
                                            } />
                                            <Input type='text' onChange={
                                                e => {
                                                    this.setState({ inputValue2: e.target.value })
                                                }
                                            } />
                                        </div> :
                                        null
                        }

                        <Button
                            animated
                            onClick={
                                async () => {
                                    try {
                                        let apiParams = modeGet === 'age(range)' ?
                                            `/${this.state.inputValue}/${this.state.inputValue2}` :
                                            `/${this.state.inputValue}`
                                        const response = await axios.get(this.state.apiRoute + (modeGet === 'all' ? '' : apiParams))
                                        
                                        this.setState({
                                            tableData: response.data,
                                            title: `${modeGet[0].toUpperCase()}${modeGet.substring(1)}`
                                        })
                                    } catch (err) {
                                        console.error(err)
                                    }
                                }
                            }
                        >
                            <Button.Content visible>Search</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    </div>

                    <div>
                        <h2>{title}</h2>
                    </div>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Firstname</Table.HeaderCell>
                                <Table.HeaderCell>Lastname</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                <Table.HeaderCell>Age</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                !tableData ?
                                    <Table.Row>
                                        <Table.Cell>Loading...</Table.Cell>
                                    </Table.Row> :
                                    tableData.map(
                                        (record, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    <Label ribbon>{record.id}</Label>
                                                </Table.Cell>
                                                <Table.Cell>{record.first_name}</Table.Cell>
                                                <Table.Cell>{record.last_name}</Table.Cell>
                                                <Table.Cell>{record.email}</Table.Cell>
                                                <Table.Cell>{record.gender}</Table.Cell>
                                                <Table.Cell>{record.age}</Table.Cell>
                                            </Table.Row>
                                        )
                                    )
                            }
                        </Table.Body>

                        <Table.Footer>
                            
                        </Table.Footer>
                    </Table>
                </Grid.Column>
            </Grid>
        )
    }
}

export default TableGet