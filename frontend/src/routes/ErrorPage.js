import React from 'react'
import { Link } from 'react-router-dom'
import "../componets/Login.css";


import '../../src/App'

export default function ErrorPage() {
    return (
        <div className="text-center m-5-auto">
            <h2>404 Error</h2>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
