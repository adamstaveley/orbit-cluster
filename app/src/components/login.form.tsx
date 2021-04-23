import React, { useState } from 'react'
import { JsonPeerId, UseIdentityReturnType } from '../hooks/useIdentity'

type LoginFormProps = {
    identity: UseIdentityReturnType
    onSubmit: (key: JsonPeerId) => void
    onError: (reason: string) => void
}

export const LoginForm = ({ identity, onSubmit, onError }: LoginFormProps) => {
    const [email, setEmail] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()

    const handleSubmit = async () => {
        if (email && password) {
            try {
                const key = await identity.getEd25519Key(email, password)
                onSubmit(key)
            } catch (err) {
                onError(err.message)
            }
        } else {
            onError('Email and password required.')
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <label>Email:</label>
                <input onChange={(e) => setEmail(e.target.value)} type="text"></input>

                <label>Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} type="text"></input>

                <button type="submit">Go</button>
            </form>
        </div>
    )

}
