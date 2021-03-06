import axios from 'axios'
import React, { Component } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import LoaderGif from '../images/loader.gif'
import { Redirect } from 'react-router'

const Authorised = (OrignalComponent) => {
    class NewComponent extends Component {
        static contextType = AuthContext
        state = {
            isAllowed: '',
            isLoading: true
        }

        componentDidMount() {
            const { authToken } = this.context
            axios
                .post('https://workstreet.herokuapp.com/auth', {
                    auth_token: authToken
                })
                .then((res) => {
                    this.setState({
                        isAllowed: res.data,
                        isLoading: false
                    })
                })
                .catch(() => {
                    this.setState({
                        isAllowed: 'No',
                        isLoading: false
                    })
                })
        }

        render() {
            if (this.state.isLoading) {
                return (
                    <div
                        style={{
                            position: 'relative',
                            height: '70vh',
                            zIndex: '-100'
                        }}
                    >
                        <img
                            src={LoaderGif}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)'
                            }}
                            alt="Loader"
                        />
                    </div>
                )
            }
            if (this.state.isAllowed === 'No') {
                return <Redirect to="/login" />
            }
            return <OrignalComponent />
        }
    }
    return NewComponent
}

export default Authorised
