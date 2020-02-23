import React from 'react'
import axios from '../lib/axios'
import { Select, Button, Icon, GridColumn } from 'semantic-ui-react'
import _ from 'lodash'
import { Search, Grid } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '', inputValue: '' }

let source

export class CustomSearch extends React.Component {
    state = initialState

    async componentDidMount() {
        try {
            const response = await axios.get('/users')
            source = response.data.map(
                (element) => {
                    let id = element.id
                    let first_name = element.first_name
                    let last_name = element.last_name
                    let email = element.email
                    let gender = element.gender
                    let age = element.age
                    return {
                        id: id,
                        title: `${first_name} ${last_name}`,
                        description: `id: ${id} ${email}`,
                        image: gender === 'female' ? '/female.png' : '/male.png',
                        price: `${gender}  ${age}`,
                        first_name,
                        last_name,
                        email,
                        gender,
                        age
                    }

                }
            )
        } catch (err) {
            console.error(err)
        }
    }




    handleResultSelect = async (e, { result }) => {
        await this.setState({ value: String(result[this.props.keyword]) })
        this.props.func(this.state.value)
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
        this.props.func(value)

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result[this.props.keyword])

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state
        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={
                    _.debounce(this.handleSearchChange, 500, {
                        leading: true,
                    })
                }
                results={results}
                value={value}
                onChange={
                    (e, { v }) => {
                        this.props.func(v)
                    }
                }
                {...this.props}
            />
        )
    }
}

class CustomCard extends React.Component {
    state = {
        cardData: this.props.cardData
    }

    componentWillReceiveProps({ cardData }) {
        this.setState({ ...this.state, cardData })
    }

    render() {
        const { cardData } = this.state

        return (
            Object.keys(cardData).length !== 0 ?
                <Card
                    image={cardData.gender === 'male' ? '/male.png' : '/female.png'}
                    header={`${cardData.first_name || "Elliot"} ${cardData.last_name || "Baker"}`}
                    meta={`ID: ${cardData.id}`}
                    description={cardData.email}
                    extra={`Age: ${cardData.age}`}
                /> : <Card image='/blank.jpg' />
        )
    }
}

class CardGet extends React.Component {
    state = {
        modeGet: 'id',
        apiRoute: '/user',
        cardData: {},
        title: 'All',
        inputValue: ''
    }

    apiRouteOptions = {
        'id': '/user',
        'first_name': '/first_name',
        'last_name': '/last_name',
        'email': '/email'
    }

    updateInputValue = async (newValue) => {
        await this.setState({ inputValue: newValue })
    }

    render() {
        const { modeGet, cardData } = this.state
        const options = [
            {
                key: 'id',
                text: 'ID',
                value: 'id',
                icon: 'search'
            },
            {
                key: 'first_name',
                text: 'Firstname',
                value: 'first_name',
                icon: 'search'
            },
            {
                key: 'last_name',
                text: 'Lastname',
                value: 'last_name',
                icon: 'search'
            },
            {
                key: 'email',
                text: 'Email',
                value: 'email',
                icon: 'search'
            }
        ]

        return (

            <Grid>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={14}>
                    <div className='panel'>
                        <div>
                            <Select
                                className='my_dropdown'
                                defaultValue={modeGet}
                                fluid
                                selection
                                options={options}
                                style={{ maxWidth: '200px' }}
                                onChange={
                                    async (e, { value }) => {
                                        await this.setState(
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

                            <CustomSearch keyword={modeGet} func={this.updateInputValue} />
                        </div>

                        <div>
                            <Button
                                animated
                                onClick={
                                    async () => {
                                        try {
                                            let apiParams = `/${this.state.inputValue}`
                                            const response = await axios.get(this.state.apiRoute + apiParams)
                                            
                                            await this.setState({
                                                cardData: response.data,
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

                    </div>

                    <div className='content'>
                        <CustomCard
                            cardData={cardData}
                        />
                    </div>
                </Grid.Column>
            </Grid>

        )
    }
}

export default CardGet